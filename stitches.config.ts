import { createStyled } from "@stitches/react";

const theme = {
  colors: {
    $hiContrast: "hsl(206,10%,5%)",
    $loContrast: "white",

    $gray100: "hsl(206,22%,99%)",
    $gray200: "hsl(206,12%,97%)",
    $gray300: "hsl(206,11%,92%)",
    $gray400: "hsl(206,10%,84%)",
    $gray500: "hsl(206,10%,76%)",
    $gray600: "hsl(206,10%,44%)",

    $purple100: "hsl(252,100%,99%)",
    $purple200: "hsl(252,100%,98%)",
    $purple300: "hsl(252,100%,94%)",
    $purple400: "hsl(252,75%,84%)",
    $purple500: "hsl(252,78%,60%)",
    $purple600: "hsl(252,80%,53%)",
  },
  space: {
    $1: "0.25rem",
    $2: "0.5rem",
    $3: "0.75rem",
    $4: "1rem",
    $5: "1.25rem",
    $6: "1.5rem",
    $7: "1.75rem",
    $8: "2rem",
  },
  sizes: {
    $1: "0.25rem",
    $2: "0.5rem",
    $3: "0.75rem",
    $4: "1rem",
    $5: "1.25rem",
    $6: "1.5rem",
  },
  fontSizes: {
    $1: "0.75rem",
    $2: "0.875rem",
    $3: "1rem",
    $4: "1.25rem",
    $5: "1.5rem",
    $6: "1.75rem",
  },
  fonts: {
    $system: "system-ui",
  },
};

export const { styled, css } = createStyled({
  tokens: theme,
  utils: {
    marginX: (config) => (
      value: keyof typeof theme["space"] | (string & {})
    ) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (config) => (
      value: keyof typeof theme["space"] | (string & {})
    ) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (config) => (
      value: keyof typeof theme["space"] | (string & {})
    ) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (config) => (
      value: keyof typeof theme["space"] | (string & {})
    ) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
  breakpoints: {
    md: (rule) => `@media (min-width: 520px) { ${rule} }`,
    lg: (rule) => `@media (min-width: 900px) { ${rule} }`,
  },
});

export const darkTheme = css.theme({
  $hiContrast: "hsl(206,2%,93%)",
  $loContrast: "hsl(206,8%,8%)",

  $gray100: "hsl(206,8%,12%)",
  $gray200: "hsl(206,7%,14%)",
  $gray300: "hsl(206,7%,15%)",
  $gray400: "hsl(206,7%,24%)",
  $gray500: "hsl(206,7%,30%)",
  $gray600: "hsl(206,5%,53%)",
});
