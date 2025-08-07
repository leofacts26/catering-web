"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";




const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1120px'
        },
        // maxWidthMd: {
        //     maxWidth: '1040px!important',
        // },
        maxWidthLg: {
          maxWidth: '1120px!important',
        },
        maxWidthXl: {
          maxWidth: '1120px!important',
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              {children}
              <Toaster />
            </ThemeProvider>
          </PersistGate>
        </Provider>

        {/* <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBf22eHEMxKk_9x0XWag-oCFTXkdClnPw8&libraries=places`}></script> */}




      </body>
    </html>
  );
}

