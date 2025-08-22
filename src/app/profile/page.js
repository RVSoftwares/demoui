"use client";
import { useState } from "react";
import styles from "./profile.module.css";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@shop.com",
        role: "Administrator",
        phone: "+91 9876543210",
        address: "123 Market Street, Bhubaneswar, Odisha",
        shopName: "Smart RO Sales & Service",
        gstNumber: "29ABCDE1234F1Z5",
        joinDate: "01-Jan-2024",
        profilePic:
            "https://res.cloudinary.com/dmclyzbck/image/upload/v1754969872/profilepics/689a0155d35691dbbc04792a-1754969870516.jpg",
    });

    return (
        <div className={styles.container}>
            {/* Header with avatar */}
            <div className={styles.header}>
                <div className={styles.cover}></div>
                <div className={styles.avatarWrapper}>
                    <img src={profile.profilePic} alt="Profile" className={styles.avatar} />
                    <button className={styles.editAvatar}>✏️</button>
                </div>
                <h2 className={styles.name}>{profile.name}</h2>
                <p className={styles.role}>{profile.role}</p>
            </div>

            {/* Info Sections */}
            <div className={styles.sections}>
                <div className={styles.section}>
                    <h3>👤 Personal Info</h3>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <button className={styles.editBtn}>Edit</button>
                </div>

                <div className={styles.section}>
                    <h3>🏪 Business Info</h3>
                    <p><strong>Shop Name:</strong> {profile.shopName}</p>
                    <p><strong>GST No:</strong> {profile.gstNumber}</p>
                    <p><strong>Member Since:</strong> {profile.joinDate}</p>
                    <button className={styles.editBtn}>Edit</button>
                </div>

                <div className={styles.section}>
                    <h3>⚙️ Account Settings</h3>
                    <button className={styles.btn}>Change Password</button>
                    <button className={styles.btn}>Update Email</button>
                    <button className={styles.btn}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
