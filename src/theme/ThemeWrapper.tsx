
import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

interface Props {
  children: React.ReactNode;
  direction: "ltr" | "rtl";
}

const ThemeWrapper: React.FC<Props> = ({ children, direction }) => {
  // 👇 Create RTL or LTR emotion cache based on direction
  const cacheRtl = useMemo(() => {
    return createCache({
      key: direction === "rtl" ? "mui-rtl" : "mui",
      stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
    });
  }, [direction]);

  const theme = useMemo(
    () =>
      createTheme({
        direction,
        typography: {
          fontFamily: direction === "rtl" ? "Cairo, sans-serif" : "Roboto, sans-serif",
        },
      }),
    [direction]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir={direction}>{children}</div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeWrapper;
