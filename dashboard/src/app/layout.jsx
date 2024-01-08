import { Inter } from "next/font/google";
import "@/styles/app.scss";
import "@/assets/fa-6.2.1/css/all.min.css";
import "@/assets/fa-6.2.1/css/fontawesome.min.css";

import AppContextProvider from "@/context/AppContext.jsx";
import FormContextProvider from "@/context/FormContext.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Isharat | إشارات",
  description: "Isharat description",
  icon: "icon.png"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>

      <AppContextProvider>
        <FormContextProvider>
          <body className={inter.className}>{children}</body>
        </FormContextProvider>
      </AppContextProvider>
    </html>
  );
}
