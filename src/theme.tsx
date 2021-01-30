import { extendTheme, ThemeOverride, theme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const config: ThemeOverride["config"] = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const themeObj = {
  ...theme,
  config,
  colors: {
    ...theme.colors,
    black: "#222f3e",
  },
  fonts,
  breakpoints,
};

const customTheme = extendTheme(themeObj);

export default customTheme;
