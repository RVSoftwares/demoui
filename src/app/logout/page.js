"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../context/contextapi.js";
import styles from "./logout.module.css";

export default function Logout() {
    const { setauthtoken } = useContext(AppContext);
    const router = useRouter();

    const handlelogout = () => {
        setauthtoken("");
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Are you sure you want to logout?</h2>
            <button className={styles.logoutBtn} onClick={handlelogout}>
                Logout
            </button>
        </div>
    );
}
