
import React from "react";
import SPScript from "spscript";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import {
  useSiteData,
  Loading,
  InvalidSitePlaceholder,
  validateListExists
} from "../../../ui-toolkit/hooks/useSiteData";
import PortalsThemeProvider from "../../../ui-toolkit/components/PortalsThemeProvider/PortalsThemeProvider";

function Example(props: ExampleProps) {
  let { data, isLoading, validation } = useSiteData<DemoData>({
    dataKey: props.webpart.webUrl + props.webpart.title,
    getData: siteUrl => getListItemCount(siteUrl, "Site Pages"),
    siteUrl: props.webpart.webUrl,
    // Optional - if not passed it will validate the site exists.
    validate: siteUrl => validateListExists(siteUrl, "Site Pages"),
  });

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (!validation.isValid)
      return <InvalidSitePlaceholder message="Sorry couldn't find that list on that site" />;
    return (
      <div>
        <h4>Site Pages Count</h4>
        <div>{data.count}</div>
      </div>
    );
  };

  return (
    <PortalsThemeProvider theme={props.webpart.theme}>
      <WebPartTitle
        {...props.webpart}
        updateProperty={val => props.webpart.updateProperty("title", val)}
      />
      {renderContent()}
    </PortalsThemeProvider>
  );
}
export default React.memo(Example);

export interface ExampleProps {
    webpart: {
        title: string,
        displayMode: DisplayMode,
        updateProperty: (key:string, value:string) => void,
        webUrl: string,
        theme: IReadonlyTheme;
    },
}

// TODO: Delete this. You'll have your own async Data Access function
const getListItemCount = async (siteUrl, listTitle): Promise<DemoData> => {
  let ctx = SPScript.createContext(siteUrl);
  let items = await ctx.lists(listTitle).getItems("$select=Id");
  return { count: items.length };
};

interface DemoData {
  count: number;
}