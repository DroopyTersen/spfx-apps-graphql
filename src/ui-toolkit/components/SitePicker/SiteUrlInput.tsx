import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import styled from "styled-components";

import * as SPScript from "spscript";
import { debounce } from "../../core/utils/utils";
import { getThemeValue } from "../PortalsThemeProvider/PortalsThemeProvider";
import { useState, useReducer } from "react";
import useDebounce from "../../hooks/useDebounce";

function reducer(state, action) {
  switch (action.type) {
    case "value:change":
      return {
        ...state,
        isValid: null,
        value: action.value,
      };
    case "validate:start":
      return {
        ...state,
        isValid: null,
        isLoading: true,
      };
    case "validate:complete":
      return {
        ...state,
        isValid: action.isValid,
        isLoading: false,
      };

    default:
      throw new Error("Invalid action");
  }
}

const getInitialState = (url) => {
  return {
    isValid: null,
    isLoading: false,
    value: getSitePath(url) || "",
  };
};
export default function SiteUrlInput(props: SiteUrlInputProps) {
  const [state, dispatch] = useReducer(reducer, getInitialState(props.url));

  // Validate the site after waiting for user to finish typing
  // Debounced effect for the text box changing
  let debouncedValue = useDebounce(state.value, 600);
  React.useEffect(() => {
    let isMounted = true;
    let doAsync = async () => {
      dispatch({ type: "validate:start" });
      let url = debouncedValue ? processUrl(debouncedValue) : "";
      let isValid = await validateUrl(url);
      if (!isMounted) return;
      dispatch({ type: "validate:complete", isValid });
    };
    doAsync();
    return () => (isMounted = false);
  }, [debouncedValue]);

  // If it's done loading, trigger the parent change event
  React.useEffect(() => {
    if (!props.disabled && state.isValid && !state.isLoading && debouncedValue && props.onChange) {
      console.log("INPUT", state.isValid, debouncedValue);
      return props.onChange(processUrl(debouncedValue), state.isValid);
    }
  }, [state.isValid, debouncedValue, state.isLoading, props.disabled]);

  const renderMessage = () => {
    if (state.isLoading) return "Loading...";
    if (state.isValid) return "Succesfully Connected";
    if (!state.isValid) return "Unable to connect to site";
  };

  let inputClass = [
    "inputContainer",
    state.isValid === null ? "loading" : state.isValid ? "success" : "error",
  ]
    .filter((c) => c)
    .join(" ");

  return (
    <StyledContainer>
      {props.label && <div className="label">{props.label}</div>}

      <div className={inputClass}>
        <TextField
          disabled={props.disabled}
          value={state.value}
          onChange={(e, value) => dispatch({ type: "value:change", value })}
          placeholder="/sites/yoursite"
        />
        {state.value && <div className="message">{renderMessage()}</div>}
      </div>
    </StyledContainer>
  );
}

export interface SiteUrlInputState {
  value: string;
  isLoading: boolean;
  isValid: boolean | null;
}

export interface SiteUrlInputProps {
  url?: string;
  onChange?: (url, isValid) => void;
  label?: string;
  disabled: boolean;
}

const StyledContainer = styled.div`
  .label {
    font-size: 14px;
  }

  .inputContainer {
    margin-top: 5px;
    &.success .message {
      color: ${(props) => getThemeValue("palette.teal", "#008080", props.theme)};
    }
    &.error .message {
      color: ${(props) => getThemeValue("palette.redDark", "#8A0002", props.theme)};
    }
    &.loading .message {
      color: #888;
    }

    label {
      margin-right: 2px !important;
    }
  }

  .siteInput {
    padding: 5px;
    overflow-x: scroll;
  }

  .message {
    font-size: 12px;
    // text-align: center;
  }
`;

const getSitePath = (absoluteUrl: string) => {
  if (!absoluteUrl) return null;
  let siteUrlIndex = absoluteUrl.toLowerCase().search(/\/sites\/|\/teams\//i);
  if (siteUrlIndex < 0) return null;
  return absoluteUrl.substring(siteUrlIndex);
};

const validateUrl = async function(url) {
  if (!url) return false;
  try {
    let ctx = SPScript.createContext(url);
    let data = await ctx.get("/web");
    return true;
  } catch (err) {
    return false;
  }
};

const processUrl = (value) => {
  // remove the leading slash if it is there
  // if (value[value.length - 1] === "/") value = value.substr(0, value.length - 1);
  return getUrlPrefix() + value;
};

const getUrlPrefix = function() {
  return `https://${window.location.host}`;
};
