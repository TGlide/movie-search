import Head from "next/head";
import { darkTheme, styled } from "../stitches.config";
import StitchesLogo from "../components/StitchesLogo";
import { useDarkMode } from "../hooks/useDarkMode";

const Body = styled("div", {
  backgroundColor: "$loContrast",
  color: "$hiContrast",

  height: "100%",
  minHeight: "100vh",
  margin: 0,
});

const Text = styled("p", {
  fontFamily: "$system",
  variants: {
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },
});

const Link = styled("a", {
  fontFamily: "$system",
  textDecoration: "none",
  color: "$purple600",
});

const Container = styled("div", {
  marginX: "auto",
  paddingX: "$3",

  variants: {
    size: {
      "1": {
        maxWidth: "300px",
      },
      "2": {
        maxWidth: "585px",
      },
      "3": {
        maxWidth: "865px",
      },
    },
  },
});

export default function Home() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <Body className={darkMode ? darkTheme : ""}>
      <Head>
        <title>Movie Search</title>
      </Head>
      <Container size={{ initial: "1", md: "2", lg: "3" }}>
        <Text as="h1" align="center" css={{ marginTop: 0, paddingTop: "$8" }}>
          Movie Search
        </Text>
        <Text>
          For full documentation, visit{" "}
          <Link href="https://stitches.dev">stitches.dev</Link>.
        </Text>
        <button onClick={toggleDarkMode}>Toggle dark mode</button>
      </Container>
    </Body>
  );
}
