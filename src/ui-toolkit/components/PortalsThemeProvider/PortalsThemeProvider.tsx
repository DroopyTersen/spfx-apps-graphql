import React from "react";
import { ThemeProvider } from "styled-components";
import { getValue } from "../../core/utils/utils";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

declare global {
  interface Window {
    _portalsTheme: any;
    __themeState__: any;
  }
}

const PortalsThemeProvider: React.FC<PortalsThemeProviderProps> = ({ children, theme }) => {
  window._portalsTheme = {
    ...theme,
    global: (window as any).__themeState__.theme || {
      ...theme.semanticColors,
      ...theme.palette,
    },
    getValue: function(path: string, fallback = "#f00") {
      return getValue(this, path) || fallback;
    },
  };
  return <ThemeProvider theme={window._portalsTheme}>{children}</ThemeProvider>;
};

export default PortalsThemeProvider;

export interface PortalsThemeProviderProps {
  theme: IReadonlyTheme;
}

function getGlobalTheme() {
  return window.__themeState__ && window.__themeState__.theme ? window.__themeState__.theme : {};
}

export function getPortalsTheme() {
  let theme = window._portalsTheme;
  if (!theme) {
    theme = window._portalsTheme = {
      theme: getGlobalTheme(),
      global: {},
    };
  }
  return theme;
}

export function getThemeValue(path: string, fallback: string, theme?: any) {
  theme = theme || getPortalsTheme();
  return getValue(theme, path) || fallback;
}
