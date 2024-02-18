import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import "./globals.css";
import { FiltersProvider } from "@/context/filters";
import { ShipsProvider } from "@/context/shipsToBuild";
import { FitItemsProvider } from "@/context/fitItems";
import { ItemsProvider } from "@/context/items";
import { FitsProvider } from "@/context/fits";
import { StationFitsProvider } from "@/context/stationFits";

const quantico = Quantico({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quantico.className} overflow-hidden`}>
        <FiltersProvider>
          <ShipsProvider>
            <FitItemsProvider>
              <ItemsProvider>
                <FitsProvider>
                  <StationFitsProvider>
                    {children}
                  </StationFitsProvider>
                </FitsProvider>
              </ItemsProvider>
            </FitItemsProvider>
          </ShipsProvider>
        </FiltersProvider>
      </body>
    </html>
  );
}
