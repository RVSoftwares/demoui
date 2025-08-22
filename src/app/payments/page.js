"use client";
import { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./payment.module.css";

export default function DuesPage() {
    const [dues, setDues] = useState([
        { id: 1, customer: "Ramesh Kumar", amount: 1200, dueDate: "2025-08-25", status: "Pending" },
        { id: 2, customer: "Sita Devi", amount: 800, dueDate: "2025-08-10", status: "Overdue" },
        { id: 3, customer: "Amit Sharma", amount: 1500, dueDate: "2025-08-30", status: "Pending" },
        { id: 4, customer: "Priya Verma", amount: 500, dueDate: "2025-08-15", status: "Paid" },
        { id: 5, customer: "Arjun Singh", amount: 2000, dueDate: "2025-08-05", status: "Overdue" },
        { id: 6, customer: "Neha Gupta", amount: 1000, dueDate: "2025-08-20", status: "Paid" },
        { id: 7, customer: "Vikram Yadav", amount: 750, dueDate: "2025-08-22", status: "Pending" },
        { id: 8, customer: "Anjali Mehta", amount: 2200, dueDate: "2025-08-18", status: "Overdue" },
        { id: 9, customer: "Ravi Chauhan", amount: 950, dueDate: "2025-08-28", status: "Pending" },
        { id: 10, customer: "Kiran Patel", amount: 1700, dueDate: "2025-08-12", status: "Paid" },
    ]);

    // Stats
    const total = dues.reduce((sum, d) => sum + d.amount, 0);
    const paid = dues.filter(d => d.status === "Paid").reduce((s, d) => s + d.amount, 0);
    const pending = dues.filter(d => d.status === "Pending").reduce((s, d) => s + d.amount, 0);
    const overdue = dues.filter(d => d.status === "Overdue").reduce((s, d) => s + d.amount, 0);

    // Chart Data
    const chartData = [
        { name: "Paid", value: paid },
        { name: "Pending", value: pending },
        { name: "Overdue", value: overdue },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dues Management</h1>

            {/* Cards */}
            <div className={styles.cards}>
                <div className={styles.card}><h3>Total Dues</h3><p>₹{total}</p></div>
                <div className={styles.card}><h3>Paid</h3><p>₹{paid}</p></div>
                <div className={styles.card}><h3>Pending</h3><p>₹{pending}</p></div>
                <div className={styles.card}><h3>Overdue</h3><p>₹{overdue}</p></div>
            </div>

            {/* Chart */}
            <div className={styles.graphContainer}>
                <h2>Dues Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#7c3aed" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <h2>Customer Dues</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dues.map(due => (
                            <tr key={due.id}>
                                <td>{due.customer}</td>
                                <td>₹{due.amount}</td>
                                <td>{due.dueDate}</td>
                                <td className={styles[due.status.toLowerCase()]}>{due.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
