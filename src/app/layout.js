import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon App",
  description: "List of Pokemons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-7xl h-auto mx-auto">
          <nav>
            <div className="border border-current bg-white my-5 p-5">
              <h1 className="text-2xl font-bold">
                Header (Put anything you want in here)
              </h1>
            </div>
          </nav>
          <main>
            {children}
          </main>          
          <footer>
            <div className="border border-current bg-white my-5 mt-10 p-5">
              <h1 className="text-2xl font-bold">
                Footer (Put anything you want in here)
              </h1>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
