'use client';
import { FaNodeJs } from "react-icons/fa"
import HomePage from "./HomePage"
import { ref, get } from "firebase/database"
import { database } from "@/firebase"
import { useEffect, useState } from "react"
import { data } from "@/types/main"

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(database));
        if (snapshot.exists()) {
          setPortfolioData(snapshot.val());
        } else {
          console.error("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

if (loading) {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center gap-5 text-violet-600 fixed z-30 bg-gray-100 dark:bg-grey-900'>
      <div className='text-6xl font-bold animate-pulse'>YR</div>
      <p className='animate-pulse text-xl'>Loading...</p>
    </div>
  );
}

  return portfolioData ? <HomePage data={portfolioData} /> : null;
}