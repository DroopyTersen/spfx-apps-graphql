import React from "react";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import SPScript from "spscript";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { getSiteUrl } from "../core/utils/sharepointUtils";
import useDebounce from "./useDebounce";

export interface SiteDataParams<T> {
  dataKey: string;
  siteUrl: string;
  getData: (siteUrl: string) => Promise<T>;
  validate?: (siteUrl) => Promise<boolean>;
  debounceDelay?: number;
}

export interface SiteDataValidation {
  result: SiteValidationResult;
  isValid?: boolean;
}

export enum SiteValidationResult {
  Valid = "valid",
  NoExists = "no-exists",
  MissingDependencies = "missing-dependencies",
  Other = "other",
}

export interface SiteDataState<T> {
  validation: SiteDataValidation;
  isLoading: boolean;
  data: T;
  error: string;
}

function siteDataReducer<T>(state: SiteDataState<T>, action) {
  switch (action.type) {
    case "start-validation":
      return {
        ...state,
        data: null,
        validation: { result: null, isValid: null },
        isLoading: true,
        error: "",
      };
    case "update-validation":
      return {
        ...state,
        validation: action.validation,
        error: "",
        // If it's not valid, we are done loading because we won't call get data
        isLoading: action.validation.isValid,
      };
    case "update-data":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: "",
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error,
      };
  }
}
const initialState: SiteDataState<any> = {
  isLoading: true,
  data: null,
  validation: { result: null, isValid: null },
  error: "",
};

export function useSiteData<T>(params: SiteDataParams<T>) {
  let [state, dispatch] = React.useReducer(siteDataReducer, initialState);
  let debouncedDataKey = useDebounce(
    `${params.dataKey}${params.siteUrl}`,
    params.debounceDelay || 250
  );

  React.useEffect(() => {
    const asyncWork = async () => {
      try {
        dispatch({ type: "start-validation" });
        // First check the site exists
        let checkIsValid = params.validate || validateSiteExists;
        let isValid = await checkIsValid(params.siteUrl);

        // TODO: send proper validation result message
        let validationResult = isValid ? SiteValidationResult.Valid : SiteValidationResult.NoExists;
        dispatch({
          type: "update-validation",
          validation: {
            isValid,
            result: validationResult,
          },
        });
        if (isValid) {
          let data = await params.getData(params.siteUrl);
          dispatch({ type: "update-data", data });
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: "error", error: "Unable to retrieve data." });
      }
    };

    asyncWork();
  }, [debouncedDataKey]);

  return {
    isLoading: state.isLoading,
    validation: state.validation,
    data: state.data as T,
    error: state.error,
  } as SiteDataState<T>;
}

export const InvalidSitePlaceholder = React.memo(function(props: { message: string }) {
  let message = props.message || "Please connect to a valid site";
  return <Placeholder iconName="Warning" iconText="Invalid Site" description={message} />;
});

export const Loading = React.memo(() => {
  return (
    <div>
      <Spinner />
    </div>
  );
});

export const validateListExists = async (siteUrl, listTitle) => {
  try {
    let ctx = SPScript.createContext(siteUrl);
    await ctx.lists(listTitle).getInfo();
    return true;
  } catch (err) {
    return false;
  }
};
export const validateSiteExists = async function(siteUrl: string): Promise<boolean> {
  // If the siteUrl matches the current site the user is on, no point checking it exists
  if (getSiteUrl() === siteUrl) return true;

  let ctx = SPScript.createContext(siteUrl);
  if (!siteUrl) return false;
  try {
    await ctx.web.getInfo();
    return true;
  } catch (err) {
    return false;
  }
};
