"use client";
import { useRouter } from "next/navigation";
import styles from "./loggedout.module.css";
import { AppContext } from "../context/contextapi.js";
import { useContext } from "react";
export default function LoggedOut() {
    const router = useRouter();
    const { isDarkMode, authtoken, loading, setloading } = useContext(AppContext);
    return (
        <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
            <img
                src="/RO Service.png" // put your image in /public
                alt="RO Service"
                className={styles.logo}
            />
            <h1 className={styles.title}>
                Welcome to <span className={styles.highlight}>Goyal Sales RO</span>
            </h1>
            <p className={styles.subtitle}>
                Manage your sales, stock, and services with ease.
            </p>
            {!authtoken &&
                <div className={styles.buttons}>
                    <button onClick={() => router.push("/login")}
                        className={`${styles.btn} ${styles.btnPrimary}`}>
                        Login
                    </button>
                    <button onClick={() => router.push("/signup")}
                        className={`${styles.btn} ${styles.btnSecondary}`}>
                        Sign Up
                    </button>
                </div>}

            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Goyal Sales RO. All rights reserved.
            </footer>
        </div>
    );
}
