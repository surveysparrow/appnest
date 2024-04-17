import React, { useState, useEffect } from 'react';
import Main from './components/main';
import { ThemeProvider, Toastr } from '@sparrowengg/twigs-react';

const App = () => {


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
       <Main />
      </ThemeProvider>
    </>
  )
}

export default App;
