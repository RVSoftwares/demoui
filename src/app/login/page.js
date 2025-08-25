"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context/contextapi.js";
const LoginPage = () => {
    const { loading, setloading, setauthtoken } = useContext(AppContext);
    const [error, setError] = useState("");
    const [logintxt, setlogintxt] = useState("Log in");
    const [formData, setformData] = useState({
        username: "",
        password: "",
    })
    const router = useRouter()
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlesubmit = async (e) => {
        setError("");
        setloading(true);
        setlogintxt("Logging in...");
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch("https://demobackend-memw.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Login  failed");
                setlogintxt("Log in");
                setloading(false);
                return;
            }
            if (data) {
                console.log(data);
                localStorage.setItem('token', data.token);
                setauthtoken(data.token);
                setloading(false);
                router.push('/dashboard');
            }
        } catch (error) {
            setError(error.message || "Something went wrong");
            console.log(error);
            setlogintxt("Log in");
            setloading(false);
        }
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handlesubmit} className={styles.form}>
                <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} value={formData.username} className={styles.input} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} className={styles.input} required />

                <div className={styles.options}>
                    <Link href="/forgot-password" className={styles.forgot}>
                        Forgot password?
                    </Link>
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
                <button type="submit" className={styles.button} disabled={loading}>
                    {logintxt}
                </button>
                <p className={styles.link}>
                    Don’t have an account? <Link href="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
