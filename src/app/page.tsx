'use client'

import { HomeFitting } from "@/components/HomeFitting/HomeFitting";
import { Corporation } from "@/types/Corporation";
import { Item } from "@/types/Item";
import { RewardItem } from "@/types/RewardTableItem";
import { Station } from "@/types/Station";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

export default function Home() {

  const [addReward, setAddReward] = useState<boolean>(false)
  const [corporation, setCorporation] = useState<Corporation | null>(null)
  const [itemToAddPrice, setItemToAddPrice] = useState<Item | undefined>(undefined)
  const [rewards, setRewards] = useState<RewardItem[]>([])
  const [station, setStation] = useState<Station | null>(null)

  const getHomeData = useCallback(async (): Promise<boolean> => {
    try {
      if (corporation && station) {
        const data = await fetch(`${process.env.REACT_APP_SERVER_URL}home?corporation=${corporation.id}&station=${station.id}`);

        const dataParsed = await data.json();

        if (typeof dataParsed.data.action !== "undefined") { // Il faut rajouter le prix d'un objet
          setItemToAddPrice(dataParsed.data.item);

          navigator.clipboard.writeText(dataParsed.data.item.name);
        } else { // On a reçu la liste des rewards
          setRewards(dataParsed.data.rewards);
          setItemToAddPrice(undefined);
        }

        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error("getHomeData");
      console.error(error);
      return false;
    }
  }, [corporation, station])

  useEffect(() => {
    getHomeData();
  }, [addReward, getHomeData])

  const closeAddRewardModal = (e: any) => {
    setAddReward(false);
  }

  const showAddRewardModal = (e: any) => {
    setAddReward(true);
  }

  return (
      <div className="App w-screen h-screen bg-home-background bg-cover bg-center overflow-hidden">
        <HomeFitting />
      </div>
  );
}
