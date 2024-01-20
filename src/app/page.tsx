'use client'

import AddingShipModal from "@/components/AddingShipModal";
import { HomeFitting } from "@/components/HomeFitting/HomeFitting";
import { useFiltersContext } from "@/context/filters";

export default function Home() {
  const { addingShip } = useFiltersContext();

  return (
    <div className="App w-screen h-screen bg-home-background bg-cover bg-center overflow-hidden">
      <HomeFitting />
      {addingShip && <AddingShipModal />}
    </div>
  );
}
