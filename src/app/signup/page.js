"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        userId: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case "fullName":
                if (!value.trim()) return "Full name is required";
                break;
            case "username":
                if (!value.trim()) return "Username is required";
                if (value.length < 3) return "Username must be at least 3 characters";
                break;
            case "userId":
                if (!value.trim()) return "User ID is required";
                break;
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Enter a valid email";
                break;
            case "mobile":
                if (!value.trim()) return "Mobile number is required";
                if (!/^\d{10}$/.test(value))
                    return "Mobile number must be 10 digits";
                break;
            case "password":
                if (!value.trim()) return "Password is required";
                if (value.length < 6) return "Password must be at least 6 characters";
                break;
            case "confirmPassword":
                if (!value.trim()) return "Please confirm your password";
                if (value !== formData.password) return "Passwords do not match";
                break;
            default:
                return "";
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Live validation for the changed field
        setErrors({
            ...errors,
            [name]: validateField(name, value),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate all fields
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        // If no errors, proceed
        if (Object.keys(newErrors).length === 0) {
            console.log("Form data submitted:", formData);
            // send to backend here
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h2 className={styles.signupTitle}>Create Your Account</h2>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                {[
                    { name: "fullName", type: "text", placeholder: "Full Name" },
                    { name: "username", type: "text", placeholder: "Username" },
                    { name: "userId", type: "text", placeholder: "User ID" },
                    { name: "email", type: "email", placeholder: "Email Address" },
                    { name: "mobile", type: "tel", placeholder: "Mobile Number" },
                    { name: "password", type: "password", placeholder: "Password" },
                    { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
                ].map((field) => (
                    <div key={field.name} className={styles.inputGroup}>
                        <input
                            name={field.name}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className={`${styles.signupInput} ${errors[field.name] ? styles.errorInput : ""
                                }`}
                            required
                        />
                        {errors[field.name] && (
                            <span className={styles.errorText}>{errors[field.name]}</span>
                        )}
                    </div>
                ))}

                <button className={styles.signupButton} type="submit">
                    Sign Up
                </button>
            </form>
            <p className={styles.signupNote}>
                Already have an account? <a href="/login">Log in</a>
            </p>
        </div>
    );
};

export default SignupPage;
