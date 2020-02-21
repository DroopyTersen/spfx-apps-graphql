import { makeExecutableSchema } from "graphql-tools";
import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { getSiteCollectionAppCatalogs, AppCatalog, User, fetchApps } from "../data/api";
import { uniqBy } from "@microsoft/sp-lodash-subset";

let _siteCollectionAppCatalogs: AppCatalog[] = null;

let getAppCatalogs = async (): Promise<AppCatalog[]> => {
  if (!_siteCollectionAppCatalogs) {
    _siteCollectionAppCatalogs = await getSiteCollectionAppCatalogs();
  }
  return _siteCollectionAppCatalogs;
};

const typeDefs = gql`
  type Query {
    appCatalogs: [AppCatalog]
    users: [User]
  }
  type User {
    name: String
    email: String
    catalogs: [AppCatalog]
  }
  type AppCatalog {
    url: String
    scope: String
    created: String
    createdBy: User
    appPackages: [AppPackage]
  }
  type AppPackage {
    AppCatalogVersion: String
    ContainsTenantWideExtension: Boolean
    Deployed: Boolean
    ID: ID!
    Title: String
  }
`;

const resolvers = {
  Query: {
    appCatalogs: async (root, args, context, info) => {
      return getAppCatalogs();
    },
    users: async () => {
      let catalogs = await getAppCatalogs();
      let users: User[] = uniqBy(
        catalogs.map((c) => c.createdBy),
        "email"
      );

      return users;
    },
  },
  AppCatalog: {
    appPackages: async (catalog: AppCatalog) => {
      let packages = await fetchApps(catalog.url);
      return packages;
    },
  },
  User: {
    catalogs: async (user) => {
      let catalogs = await getAppCatalogs();
      console.log("User.catalogs resolver", user, catalogs);
      return catalogs.filter((c) => c.createdBy?.email === user.email);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});
