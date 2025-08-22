"use client";
import { useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import styles from "./sales.module.css";

export default function SalesPage() {
    const [sales, setSales] = useState([
        { id: 1, item: "Water Bottle", quantity: 10, price: 20, date: "2025-08-01" },
        { id: 2, item: "RO Filter", quantity: 2, price: 2500, date: "2025-08-02" },
        { id: 3, item: "Purifier Candle", quantity: 5, price: 500, date: "2025-08-02" },
        { id: 4, item: "Pump Motor", quantity: 1, price: 1500, date: "2025-08-03" },
        { id: 5, item: "Service Kit", quantity: 3, price: 1200, date: "2025-08-04" },
        { id: 6, item: "RO Machine", quantity: 1, price: 9000, date: "2025-08-05" },
        { id: 7, item: "Pipe Fittings", quantity: 4, price: 300, date: "2025-08-06" },
        { id: 8, item: "Storage Tank", quantity: 1, price: 2000, date: "2025-08-07" },
        { id: 9, item: "UV Lamp", quantity: 2, price: 800, date: "2025-08-08" },
        { id: 10, item: "Membrane", quantity: 2, price: 3500, date: "2025-08-09" },
    ]);

    // Calculate totals
    const totalRevenue = sales.reduce((acc, s) => acc + s.price, 0);
    const todaySales = sales.filter(s => s.date === "2025-08-09").reduce((acc, s) => acc + s.price, 0);
    const monthlySales = sales.length;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Sales Management</h1>

            {/* Summary Cards */}
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Today’s Sales</h3>
                    <p>₹{todaySales}</p>
                </div>
                <div className={styles.card}>
                    <h3>This Month’s Sales</h3>
                    <p>{monthlySales} orders</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Revenue</h3>
                    <p>₹{totalRevenue}</p>
                </div>
            </div>

            {/* Graph */}
            <div className={styles.graphContainer}>
                <h2>Sales Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="price" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <h2>Sales Records</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.date}</td>
                                <td>{sale.item}</td>
                                <td>{sale.quantity}</td>
                                <td>₹{sale.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
