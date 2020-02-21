/*
let { data, isLoading, error} = useAsyncData<NewsPages[]>([], getNews, [siteUrl, maxItems]);
*/
import { useEffect, useReducer } from "react";

export interface AsyncDataState<T> {
  isLoading: boolean;
  data: T;
  error: string;
}

function reducer<T>(state: AsyncDataState<T>, action: any) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isLoading: true,
        data: action.data || state.data || null,
        error: "",
      };
    case "success":
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
        error: action.error,
      };
    case "replace":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: "",
      };
    default:
      return state;
  }
}

export default function useAsyncData<T>(initialValue: T, asyncFn, args: any[]) {
  let [state, dispatch] = useReducer(reducer, { isLoading: false, error: "", data: initialValue });

  useEffect(() => {
    let isUnmounted = false;
    let doAsync = async () => {
      try {
        dispatch({ type: "start", data: initialValue });
        let data = await asyncFn(...args);
        if (isUnmounted) return;
        dispatch({ type: "success", data });
      } catch (err) {
        dispatch({ type: "error", error: err });
      }
    };
    doAsync();
    return () => {
      isUnmounted = true;
    };
  }, args);

  return {
    ...(state as AsyncDataState<T>),
    replace: (data: T) => dispatch({ type: "replace", data }),
  };
}
