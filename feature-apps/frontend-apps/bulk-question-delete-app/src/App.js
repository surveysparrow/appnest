import React, { useEffect, useState } from "react";
import { Flex, ThemeProvider, Toastr } from "@sparrowengg/twigs-react";
import Main from "./components/main";

const App = () => {
  const [loaded, setLoaded] = useState(true);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const client = window.app.initialized();
    setClient(client);
    setLoaded(false);
  }, []);

  return (
    <>
      <Toastr
        duration={1000}
        position="top-center"
        css={{
          paddingTop: "$10",
        }}
      />{" "}
      <ThemeProvider
        theme={{
          colors: {
            bacground: "#f6f8fa",
          },
          fonts: {
            body: "Roboto, sans-serif",
          },
        }}
      >
        {loaded ? (
          <Flex
            alignItems="center"
            justifyContent="center"
            css={{ width: "100%", height: "100vh" }}
          >
            Loading....
          </Flex>
        ) : (
          <Main client={client} />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
