"use client";
import { useState } from "react";
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./reports.module.css";

export default function ReportPage() {
    // Dummy Data
    const [reportData] = useState({
        sales: 125000,
        purchases: 88000,
        dues: 22000,
        amc: 15,
        suppliers: 10,
        todaySales: 5000,
        todayPurchases: 3500,
        monthly: [
            { month: "Jan", sales: 10000, purchases: 8000 },
            { month: "Feb", sales: 15000, purchases: 12000 },
            { month: "Mar", sales: 20000, purchases: 14000 },
            { month: "Apr", sales: 18000, purchases: 16000 },
            { month: "May", sales: 22000, purchases: 17000 },
            { month: "Jun", sales: 25000, purchases: 19000 },
            { month: "Jul", sales: 20000, purchases: 13000 },
            { month: "Aug", sales: 25000, purchases: 20000 }, // current month
        ],
        detailed: [
            { id: 1, type: "Sale", name: "Customer A", amount: 5000, date: "2025-08-05", status: "Paid" },
            { id: 2, type: "Sale", name: "Customer B", amount: 3000, date: "2025-08-10", status: "Pending" },
            { id: 3, type: "Purchase", name: "Supplier X", amount: 7000, date: "2025-08-06", status: "Paid" },
            { id: 4, type: "Purchase", name: "Supplier Y", amount: 6000, date: "2025-08-12", status: "Pending" },
            { id: 5, type: "AMC", name: "Client A", amount: 4000, date: "2025-08-01", status: "Active" },
            { id: 6, type: "Dues", name: "Customer C", amount: 2500, date: "2025-08-15", status: "Pending" },
        ]
    });

    // Profit Calculations
    const todayProfit = reportData.todaySales - reportData.todayPurchases;

    const currentMonth = "Aug"; // Assume current month is August
    const monthlyData = reportData.monthly.find(m => m.month === currentMonth);
    const monthlyProfit = monthlyData ? monthlyData.sales - monthlyData.purchases : 0;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Business Report</h1>

            {/* Summary Cards */}
            <div className={styles.cards}>
                <div className={styles.card}><h3>Total Sales</h3><p>₹{reportData.sales}</p></div>
                <div className={styles.card}><h3>Total Purchases</h3><p>₹{reportData.purchases}</p></div>
                <div className={styles.card}><h3>Pending Dues</h3><p>₹{reportData.dues}</p></div>
                <div className={styles.card}><h3>Active AMC</h3><p>{reportData.amc}</p></div>
                <div className={styles.card}><h3>Suppliers</h3><p>{reportData.suppliers}</p></div>

                {/* Profit/Loss Cards */}
                <div className={`${styles.card} ${todayProfit >= 0 ? styles.profit : styles.loss}`}>
                    <h3>Daily Profit/Loss</h3>
                    <p>{todayProfit >= 0 ? `+₹${todayProfit}` : `-₹${Math.abs(todayProfit)}`}</p>
                </div>
                <div className={`${styles.card} ${monthlyProfit >= 0 ? styles.profit : styles.loss}`}>
                    <h3>Monthly Profit/Loss</h3>
                    <p>{monthlyProfit >= 0 ? `+₹${monthlyProfit}` : `-₹${Math.abs(monthlyProfit)}`}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className={styles.graphContainer}>
                <h2>Monthly Sales vs Purchases</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={reportData.monthly}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#22c55e" name="Sales" />
                        <Line type="monotone" dataKey="purchases" stroke="#3b82f6" name="Purchases" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className={styles.graphContainer}>
                <h2>Comparison (Bar)</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={reportData.monthly}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#22c55e" name="Sales" />
                        <Bar dataKey="purchases" fill="#3b82f6" name="Purchases" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Detailed Report Table */}
            <div className={styles.tableContainer}>
                <h2>Detailed Report</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.detailed.map(item => (
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td>{item.name}</td>
                                <td>₹{item.amount}</td>
                                <td>{item.date}</td>
                                <td style={{ color: item.status === "Pending" ? "#e11d48" : "#22c55e", fontWeight: "600" }}>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
