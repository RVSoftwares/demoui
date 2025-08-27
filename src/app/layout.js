import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar"; // your existing Navbar
import { AppProvider } from "./context/contextapi.js"; // import your context
import ClientLoadingBar from "./components/loadbar";
import { ToastContainer, toast } from 'react-toastify';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RO",
  description: "Here is a web for RO service",
};
export const viewport = {
  themeColor: "#4692dd",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} layout-body`}>
        <AppProvider>
          <div className="layout-container">
            <ClientLoadingBar />
            <Navbar />
            <main className="layout-main" >{children}</main>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
