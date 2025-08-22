"use client";
import { useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./service.module.css";

export default function ServiceRemindersPage() {
    const [reminders, setReminders] = useState([
        { id: 1, customer: "Ramesh Kumar", service: "RO Service", date: "2025-08-25", status: "Upcoming" },
        { id: 2, customer: "Sita Devi", service: "Filter Change", date: "2025-08-20", status: "Overdue" },
        { id: 3, customer: "Amit Sharma", service: "AMC Visit", date: "2025-09-02", status: "Upcoming" },
        { id: 4, customer: "Priya Verma", service: "UV Lamp Replace", date: "2025-08-18", status: "Completed" },
        { id: 5, customer: "Arjun Singh", service: "Pump Check", date: "2025-08-28", status: "Upcoming" },
        { id: 6, customer: "Neha Gupta", service: "Annual Maintenance", date: "2025-07-30", status: "Overdue" },
        { id: 7, customer: "Vikram Yadav", service: "Water Testing", date: "2025-08-29", status: "Upcoming" },
        { id: 8, customer: "Anjali Mehta", service: "Service Kit Change", date: "2025-08-19", status: "Completed" },
        { id: 9, customer: "Ravi Chauhan", service: "Tank Cleaning", date: "2025-08-23", status: "Upcoming" },
        { id: 10, customer: "Kiran Patel", service: "Membrane Check", date: "2025-08-15", status: "Overdue" },
    ]);

    // Calculations
    const upcoming = reminders.filter(r => r.status === "Upcoming").length;
    const overdue = reminders.filter(r => r.status === "Overdue").length;
    const completed = reminders.filter(r => r.status === "Completed").length;

    // Chart data
    const chartData = [
        { name: "Upcoming", value: upcoming },
        { name: "Overdue", value: overdue },
        { name: "Completed", value: completed },
    ];

    const COLORS = ["#2563eb", "#e11d48", "#22c55e"];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Service Reminders</h1>

            {/* Summary Cards */}
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Upcoming</h3>
                    <p>{upcoming}</p>
                </div>
                <div className={styles.card}>
                    <h3>Overdue</h3>
                    <p>{overdue}</p>
                </div>
                <div className={styles.card}>
                    <h3>Completed</h3>
                    <p>{completed}</p>
                </div>
            </div>

            {/* Chart */}
            <div className={styles.graphContainer}>
                <h2>Service Status</h2>
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
                <h2>Service Reminder List</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reminders.map((reminder) => (
                            <tr key={reminder.id}>
                                <td>{reminder.customer}</td>
                                <td>{reminder.service}</td>
                                <td>{reminder.date}</td>
                                <td className={styles[reminder.status.toLowerCase()]}>{reminder.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
