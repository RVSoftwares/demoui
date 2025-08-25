"use client";
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [authtoken, setauthtoken] = useState('')
    const [loading, setloading] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setauthtoken(token);
        setloading(false)
    }, [])
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(mediaQuery.matches);
        const handler = (e) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);
    return (
        <AppContext.Provider
            value={{ authtoken, setauthtoken, isDarkMode, setIsDarkMode, loading, setloading }}
        >
            {children}
        </AppContext.Provider>
    );
};
