// import App from 'next/app'

import { useState } from "react";
import { ThemeProvider } from "../context/ThemeProvider";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode(!darkMode)}
    >
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
