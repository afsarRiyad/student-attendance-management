import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import StoreProvider from "@/components/Store";
import { ThemeProvider } from "@/components/Theme";
import Shell from "@/components/Shell";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = { title: "EduTrack · Student Manager" };

const themeScript =
  'try{var t=localStorage.getItem("sm-theme");var d=t!=="light";' +
  'document.documentElement.classList.toggle("dark",d);' +
  'document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <StoreProvider>
            <Shell>{children}</Shell>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
