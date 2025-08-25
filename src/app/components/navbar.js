"use client";
import "./nav.css";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/contextapi.js";

const Navbar = () => {
    const { isDarkMode, authtoken, loading, setloading } = useContext(AppContext);
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [menuItems, setMenuItems] = useState([]);

    // Update menu items based on auth token
    useEffect(() => {
        if (authtoken) {
            setMenuItems([
                { label: "Home", path: "/" },
                { label: "Dashboard", path: "/dashboard" },
                { label: "Sales Management", path: "/sales" },
                { label: "Stock Management", path: "/stock" },
                { label: "Service Reminders", path: "/service" },
                { label: "AMC Management", path: "/amc" },
                { label: "Payment Dues", path: "/payments" },
                { label: "Supplier Management", path: "/suppliers" },
                { label: "Reports", path: "/reports" },
                { label: "Profile", path: "/profile" },
                { label: "Logout", path: "/logout" },
            ]);
        } else {
            setMenuItems([{ label: "Login", path: "/login" }]);
        }

        // Stop loading once menu items are set
        setloading(false);
    }, [authtoken, setloading]);

    return (
        <>
            {/* Hamburger button for mobile */}
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
                    <img src={isDarkMode ? "/white.png" : "/dark.png"} alt="logo" className="logo" />
                    <p className="navbar-title">Goyal RO Service</p>
                </div>
                {loading ? (
                    <div className="load-container">
                        <img
                            src={"/transparantload.svg"}
                            alt="Loading..."
                            className="spinner"
                            width={100}
                            height={100}
                        />
                    </div>
                ) : (
                    <nav>
                        {!authtoken && (
                            <p className="logout-text-navbar">
                                    <b>WELCOME TO GOYAL RO SERVICE</b> <br /> <u> LOGIN TO CONTINUE</u>
                            </p>
                        )}
                        <ul className="navbar-menu">
                            {menuItems.map((item) => (
                                <li
                                    key={item.path}
                                    className={`menu-item ${pathname === item.path ? "active" : ""}`}
                                    onClick={() => {
                                        router.push(item.path);
                                        setIsOpen(false);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
                <footer className="navbar-footer">
                    &copy; {new Date().getFullYear()} Goyal RO Service
                </footer>
            </aside>
        </>
    );
};

export default Navbar;
