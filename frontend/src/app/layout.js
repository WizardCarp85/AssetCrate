
import "./globals.css";

export const metadata = {
  title: "AssetCrate",
  description: "A place for all your game assets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
