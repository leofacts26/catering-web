"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
      <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
