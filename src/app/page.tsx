'use client'

import { HomeFitting } from "@/components/HomeFitting/HomeFitting";

export default function Home() {
  return (
      <div className="App w-screen h-screen bg-home-background bg-cover bg-center overflow-hidden">
        <HomeFitting />
      </div>
  );
}
