"use client";
import { useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./stock.module.css";

export default function StockPage() {
    const [stock, setStock] = useState([
        { id: 1, item: "Water Bottle", quantity: 50, price: 20 },
        { id: 2, item: "RO Filter", quantity: 5, price: 2500 },
        { id: 3, item: "Purifier Candle", quantity: 15, price: 500 },
        { id: 4, item: "Pump Motor", quantity: 2, price: 1500 },
        { id: 5, item: "Service Kit", quantity: 7, price: 1200 },
        { id: 6, item: "RO Machine", quantity: 3, price: 9000 },
        { id: 7, item: "Pipe Fittings", quantity: 20, price: 300 },
        { id: 8, item: "Storage Tank", quantity: 4, price: 2000 },
        { id: 9, item: "UV Lamp", quantity: 8, price: 800 },
        { id: 10, item: "Membrane", quantity: 6, price: 3500 },
    ]);

    // Calculations
    const totalItems = stock.reduce((acc, s) => acc + s.quantity, 0);
    const lowStock = stock.filter(s => s.quantity <= 5).length;
    const totalValue = stock.reduce((acc, s) => acc + (s.price * s.quantity), 0);

    // Chart data
    const chartData = stock.map(s => ({ name: s.item, value: s.quantity }));
    const COLORS = ["#2563eb", "#22c55e", "#f97316", "#e11d48", "#9333ea", "#0ea5e9", "#f59e0b", "#64748b", "#84cc16", "#14b8a6"];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Stock Management</h1>

            {/* Summary Cards */}
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Total Stock Items</h3>
                    <p>{totalItems}</p>
                </div>
                <div className={styles.card}>
                    <h3>Low Stock Alerts</h3>
                    <p>{lowStock}</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Stock Value</h3>
                    <p>₹{totalValue}</p>
                </div>
            </div>

            {/* Chart */}
            <div className={styles.graphContainer}>
                <h2>Stock Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <h2>Stock Records</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price (₹)</th>
                            <th>Total Value (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((item) => (
                            <tr key={item.id}>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price}</td>
                                <td>₹{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
