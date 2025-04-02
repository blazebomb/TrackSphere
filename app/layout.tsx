import "@radix-ui/themes/styles.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/provider";
import QueryClientProvider from "./QueryClientProvider";
import FooterBar from "./Footerbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="purple" grayColor="sand" panelBackground="solid" appearance="inherit">
              <NavBar />
              <main className="flex-1">
                {children}
              </main>
              <FooterBar />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}