"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context/contextapi";
const SignupPage = () => {
    const { loading, setloading } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [signtxt, setSigntxt] = useState("Sign up");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        setloading(true);
        setSigntxt("Signing up...");
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Signup failed");
                return;
            }
            router.replace(`/otp?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
            setError(err.message || "Something went wrong");
            console.error(err);
        } finally {
            setloading(false);
            setSigntxt("Sign up");
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h2 className={styles.signupTitle}>Create Your Account</h2>

            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={styles.signupInput} required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.signupInput}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.signupInput}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.signupInput}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.signupInput}
                    required
                />

                {error && <p className={styles.errorText}>{error}</p>}

                <button
                    type="submit"
                    className={styles.signupButton}
                    disabled={loading}
                >
                    {signtxt}
                </button>
            </form>

            <p className={styles.signupNote}>
                Already have an account? <Link href="/login">Log in</Link>
            </p>
        </div>
    );
};

export default SignupPage;
