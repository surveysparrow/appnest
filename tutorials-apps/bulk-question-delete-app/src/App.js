import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import { ThemeProvider, Toastr } from '@sparrowengg/twigs-react';

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const [child, setChild] = useState(<h3 style={{ "textAlign": "center", "marginTop": "100px" }}>App is loading...</h3>)

  useEffect(() => {
    setLoaded(true)
  }, []);

  useEffect(() => {
    if (!loaded) return
    const client = window.app.initialized()
    setChild((<Main client={client} />))
  }, [loaded])

  return (
    <>
      <Toastr duration={1000} position="top-center" css={{
        paddingTop: "$10"
      }} />
      <ThemeProvider theme={{
        colors: {
          bacground: '#f6f8fa',
        },
        fonts: {
          body: "Roboto, sans-serif",
        }
      }}>
        {child}
      </ThemeProvider>
    </>
  )
}

export default App;
