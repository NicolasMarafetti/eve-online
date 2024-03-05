'use client'

import AddingShipModal from "@/components/AddingShipModal/AddingShipModal";
import { HomeFitting } from "@/components/HomeFitting/HomeFitting";
import { useFiltersContext } from "@/context/filters";
import Link from "next/link";

export default function Home() {
  const { addingShip } = useFiltersContext();

  return (
    <div className="App w-screen h-screen bg-home-background bg-cover bg-center overflow-hidden">
      <nav className="absolute left-1 top-1 z-10">
        <Link href="/commerce">Commerce</Link>
      </nav>
      <HomeFitting />
      {addingShip && <AddingShipModal />}
    </div>
  );
}
