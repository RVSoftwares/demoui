"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import LoggedOut from "./loggedout/loggedout";
export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <LoggedOut />
    </div>
  );
}
