"use client";
import { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./supplier.module.css";

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: "Om Electronics", contact: "9876543210", purchased: 12000, paid: 10000, lastDate: "2025-08-15" },
        { id: 2, name: "Sharma Traders", contact: "9876512345", purchased: 8000, paid: 8000, lastDate: "2025-08-10" },
        { id: 3, name: "Gupta Hardware", contact: "9812345678", purchased: 15000, paid: 12000, lastDate: "2025-08-18" },
        { id: 4, name: "Verma Agencies", contact: "9898989898", purchased: 5000, paid: 3000, lastDate: "2025-08-12" },
        { id: 5, name: "Singh Supplies", contact: "9123456789", purchased: 20000, paid: 15000, lastDate: "2025-08-05" },
        { id: 6, name: "Mehta Distributors", contact: "9000000000", purchased: 10000, paid: 10000, lastDate: "2025-08-20" },
        { id: 7, name: "Patel Stationery", contact: "9876001234", purchased: 7500, paid: 5000, lastDate: "2025-08-14" },
        { id: 8, name: "Yadav Textiles", contact: "9876123450", purchased: 22000, paid: 18000, lastDate: "2025-08-16" },
        { id: 9, name: "Chauhan Plastics", contact: "9911223344", purchased: 9500, paid: 9500, lastDate: "2025-08-09" },
        { id: 10, name: "Kiran Metals", contact: "9899001122", purchased: 17000, paid: 16000, lastDate: "2025-08-08" },
    ]);

    // Stats
    const totalSuppliers = suppliers.length;
    const totalPurchased = suppliers.reduce((s, sup) => s + sup.purchased, 0);
    const totalPaid = suppliers.reduce((s, sup) => s + sup.paid, 0);
    const totalPending = totalPurchased - totalPaid;

    // Chart Data
    const chartData = suppliers.map(sup => ({
        name: sup.name,
        purchased: sup.purchased,
        pending: sup.purchased - sup.paid,
    }));

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Supplier Management</h1>

            {/* Cards */}
            <div className={styles.cards}>
                <div className={styles.card}><h3>Total Suppliers</h3><p>{totalSuppliers}</p></div>
                <div className={styles.card}><h3>Total Purchased</h3><p>₹{totalPurchased}</p></div>
                <div className={styles.card}><h3>Total Paid</h3><p>₹{totalPaid}</p></div>
                <div className={styles.card}><h3>Pending Balance</h3><p>₹{totalPending}</p></div>
            </div>

            {/* Chart */}
            <div className={styles.graphContainer}>
                <h2>Supplier Purchases</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="purchased" fill="#6366f1" name="Purchased" />
                        <Bar dataKey="pending" fill="#f43f5e" name="Pending" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <h2>Supplier Details</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Supplier</th>
                            <th>Contact</th>
                            <th>Purchased</th>
                            <th>Paid</th>
                            <th>Pending</th>
                            <th>Last Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(sup => (
                            <tr key={sup.id}>
                                <td>{sup.name}</td>
                                <td>{sup.contact}</td>
                                <td>₹{sup.purchased}</td>
                                <td>₹{sup.paid}</td>
                                <td style={{ color: sup.purchased - sup.paid > 0 ? "#e11d48" : "#22c55e", fontWeight: "600" }}>
                                    ₹{sup.purchased - sup.paid}
                                </td>
                                <td>{sup.lastDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
