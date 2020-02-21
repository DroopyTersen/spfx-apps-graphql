import SPScript from "spscript";
import { cachify } from "../ui-toolkit/core/utils/cache";

let LIST_TITLE = "Site Collection App Catalogs";

export async function getSiteCollectionAppCatalogs(tenantCatalogUrl = "/sites/apps") {
  return fetchSiteCollectionAppCatalogs(tenantCatalogUrl);
}

export async function fetchApps(siteUrl: string): Promise<any[]> {
  try {
    let ctx = SPScript.createContext(siteUrl);
    let items = await ctx
      .get("/web/sitecollectionappcatalog/AvailableApps")
      .then(SPScript.utils.parseOData);
    console.log("Apps", items, siteUrl);
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
}
async function fetchSiteCollectionAppCatalogs(tenantCatalogUrl: string) {
  let ctx = SPScript.createContext(tenantCatalogUrl);
  let odata = {
    $select: "Id,Created,SiteCollectionUrl,Author/Title,Author/EMail",
    $expand: "Author",
  };
  let items = await ctx.lists(LIST_TITLE).getItems(SPScript.utils.qs.fromObj(odata));
  return items.map(toAppCatalog);
}

export interface User {
  name: string;
  email: string;
}

export interface AppCatalog {
  url: string;
  scope: "Site" | "Tenant";
  createdBy: User;
  created: Date;
}

function toAppCatalog(rawItem): AppCatalog {
  return {
    url: rawItem.SiteCollectionUrl,
    created: rawItem.Created,
    createdBy: {
      name: rawItem?.Author?.Title,
      email: rawItem?.Author?.EMail,
    },
    scope: "Site",
  };
}
