"use client";
import "./nav.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect system theme
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(mediaQuery.matches);

        const handler = (e) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener("change", handler);

        return () => mediaQuery.removeEventListener("change", handler);
    }, []);
    const menuItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Sales Management", path: "/sales" },
        { label: "Stock Management", path: "/stock" },
        { label: "Service Reminders", path: "/service" },
        { label: "AMC Management", path: "/amc" },
        { label: "Payment Dues", path: "/payments" },
        { label: "Supplier Management", path: "/suppliers" },
        { label: "Reports", path: "/reports" },
        { label: "Profile", path: "/profile" },
        { label: "Login", path: "/login" },
    ];

    return (
        <>
            {/* Hamburger button */}
            <div className="mobileview">
                <button
                    className={`hamburger ${isOpen ? "open" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <p className="navbar-title">Goyal RO Service</p>
            </div>

            {/* Sidebar */}
            <aside className={`navbar ${isOpen ? "open" : ""}`}>
                <div className="navbar-header">
                    <img
                        src={isDarkMode ? "/white.png" : "/dark.png"}
                        alt="logo"
                        className="logo"
                    />
                    <p className="navbar-title">Goyal RO Service</p>
                </div>
                <nav>
                    <ul className="navbar-menu">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`menu-link-wrapper ${pathname === item.path ? "active" : ""}`}
                            >
                                <li>
                                    {item.label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
                <footer className="navbar-footer">
                    &copy; {new Date().getFullYear()} Goyal RO Service
                </footer>
            </aside>
        </>
    );
};

export default Navbar;
