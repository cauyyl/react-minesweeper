"use client";

import Image from "next/image";
import styles from "./page.module.css";
import DefTheme from "@/app/components/DefTheme";
import React from "react";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Link from "next/link";
import { useRouter } from "next/navigation";
import Minesweeper from "@/app/Minesweeper";

function Home() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <Minesweeper />
    </main>
  );
}
export default Home;
