import React from "react";
import styles from "./login.module.css";

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Login</h2>

            <form className={styles.form}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                />

                <div className={styles.options}>
                    <label className={styles.checkbox}>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="/forgot-password" className={styles.forgot}>
                        Forgot password?
                    </a>
                </div>

                <button type="submit" className={styles.button}>
                    Login
                </button>

                <p className={styles.link}>
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
