"use client";
import React, { useState, useRef } from "react";
import styles from "./otp.module.css";
import { useRouter, useSearchParams } from "next/navigation";

import { useContext } from "react";
import { AppContext } from "../context/contextapi";
const OtpPage = () => {
    const { authtoken, setauthtoken } = useContext(AppContext);
    const [otpp, setOtpp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const router = useRouter();
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
        if (!value) return;

        const newOtp = [...otpp];
        newOtp[index] = value;
        setOtpp(newOtp);

        // Move to next box
        if (index < otpp.length - 1 && value) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const otp = otpp.join("");
    const formData = {
        otp, email
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otpp.join("");
        if (otpValue.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }
        console.log("OTP Submitted:", otpValue);
        console.log("OTP:", formData);
        try {

            const response = await fetch("http://localhost:3000/api/auth/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data) {
                console.log(data);
                localStorage.setItem("token", data.token);
                const token = localStorage.getItem("token", data.token);
                setauthtoken(token)
                router.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.otpContainer}>
            <h2 className={styles.otpTitle}>Verify Your OTP</h2>
            <p className={styles.otpSubtitle}>
                Enter the 6-digit code we sent to your email.
            </p>
            <form onSubmit={handleSubmit} className={styles.otpForm}>
                <div className={styles.otpInputs}>
                    {otpp.map((digit, index) => (
                        <input key={index} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} ref={(el) => (inputRefs.current[index] = el)} className={styles.otpInput}
                        />
                    ))}
                </div>
                <button type="submit" className={styles.otpButton}>
                    Verify OTP
                </button>
            </form>
            <p className={styles.otpNote}>
                Didn’t receive the code? <a href="#">Resend OTP</a>
            </p>
        </div>
    );
};

export default OtpPage;
