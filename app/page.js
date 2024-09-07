"use client"
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import { useRouter } from "next/navigation";

export default function Home() {
   return <div>
      <Header />
      <HomePage />
   </div>;
}
