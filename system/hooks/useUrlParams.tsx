import { useState, useEffect } from "react";

export function useURLParam(key: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!window?.location) {
      return;
    }

    const handleURLChange = () => {
      setUrl(window.location.href);
    };

    // Listen to popstate event
    window.addEventListener("popstate", handleURLChange);

    // Poll for changes in the URL
    const interval = setInterval(() => {
      if (window.location.href !== url) {
        handleURLChange();
      }
    }, 100);

    return () => {
      window.removeEventListener("popstate", handleURLChange);
      clearInterval(interval);
    };
  }, [url]);

  const value = () => {
    if (!url) return null;

    const split = url.split("?")[1];
    if (!split) return null;

    const params = split.split("&");
    const itemParams = params.find((param) => param.split("=")[0] === key);

    const value = itemParams?.split("=")[1];
    if (!value) return null;

    return value;
  };

  const updateURLParams = (key?: string, value?: string) => {
    // Get the current URL and create a URL object
    const currentURL = new URL(window.location.href);

    // If no key is provided, remove all params
    if (!key || !value) {
      currentURL.search = "";
      window.history.replaceState({}, "", currentURL);
      return;
    }

    // Update the URL params
    currentURL.searchParams.set(key, value);
    window.history.replaceState({}, "", currentURL);
  };

  return {
    url,
    value: value(),
    updateURLParams,
  };
}
