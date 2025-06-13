"use client";

import Image from "next/image";
import styles from "./page.module.css";
import TestDemo from "@/app/components/testDemo";
import DefTheme from "@/app/components/DefTheme";
import React from "react";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Link from "next/link";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      {/*<DefTheme>*/}
      {/*<div*/}
      {/*  onClick={() => {*/}
      {/*    router.push("/form");*/}
      {/*  }}*/}
      {/*>*/}
      {/*  here*/}
      {/*</div>*/}
      <TestDemo />

      {/*</DefTheme>*/}
    </main>
  );
}
export default Home;
