"use client";
import { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./amc.module.css";

export default function AMCPage() {
    const [amcs, setAmcs] = useState([
        { id: 1, customer: "Ramesh Kumar", plan: "Gold", start: "2024-09-01", end: "2025-09-01", status: "Active" },
        { id: 2, customer: "Sita Devi", plan: "Silver", start: "2023-08-15", end: "2024-08-15", status: "Expired" },
        { id: 3, customer: "Amit Sharma", plan: "Platinum", start: "2024-10-10", end: "2025-10-10", status: "Active" },
        { id: 4, customer: "Priya Verma", plan: "Gold", start: "2024-08-20", end: "2025-08-20", status: "Expiring Soon" },
        { id: 5, customer: "Arjun Singh", plan: "Silver", start: "2024-09-05", end: "2025-09-05", status: "Active" },
        { id: 6, customer: "Neha Gupta", plan: "Platinum", start: "2023-07-25", end: "2024-07-25", status: "Expired" },
        { id: 7, customer: "Vikram Yadav", plan: "Gold", start: "2024-09-15", end: "2025-09-15", status: "Active" },
        { id: 8, customer: "Anjali Mehta", plan: "Silver", start: "2024-08-01", end: "2025-08-01", status: "Expiring Soon" },
        { id: 9, customer: "Ravi Chauhan", plan: "Gold", start: "2024-09-20", end: "2025-09-20", status: "Active" },
        { id: 10, customer: "Kiran Patel", plan: "Platinum", start: "2023-09-01", end: "2024-09-01", status: "Expired" },
    ]);

    // Stats
    const total = amcs.length;
    const active = amcs.filter(a => a.status === "Active").length;
    const expired = amcs.filter(a => a.status === "Expired").length;
    const expiringSoon = amcs.filter(a => a.status === "Expiring Soon").length;

    // Chart Data
    const chartData = [
        { name: "Active", value: active },
        { name: "Expired", value: expired },
        { name: "Expiring Soon", value: expiringSoon },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AMC Management</h1>

            {/* Cards */}
            <div className={styles.cards}>
                <div className={styles.card}><h3>Total Contracts</h3><p>{total}</p></div>
                <div className={styles.card}><h3>Active</h3><p>{active}</p></div>
                <div className={styles.card}><h3>Expired</h3><p>{expired}</p></div>
                <div className={styles.card}><h3>Expiring Soon</h3><p>{expiringSoon}</p></div>
            </div>

            {/* Chart */}
            <div className={styles.graphContainer}>
                <h2>AMC Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <h2>AMC Contracts List</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Plan</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {amcs.map(amc => (
                            <tr key={amc.id}>
                                <td>{amc.customer}</td>
                                <td>{amc.plan}</td>
                                <td>{amc.start}</td>
                                <td>{amc.end}</td>
                                <td className={styles[amc.status.replace(" ", "").toLowerCase()]}>{amc.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
