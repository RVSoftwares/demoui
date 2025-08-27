"use client";
import { useMemo } from "react";
import { toast } from 'react-toastify'
import { useState } from "react";
import Quickaccess from "../components/quickaccess"
import Dashboard from "./Dashboard";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
export default function DashboardPage() {
    const data = {
        dailySales: [ /* ... */],
        monthlyProfit: [ /* ... */],
        receivables: [ /* ... */],
        payables: [ /* ... */],
        serviceReminders: [ /* ... */],
        stock: [ /* ... */],
        recent: [ /* ... */],
    };

    // --- Dummy Data (replace with API later) ---
    const dailySales = [
        { day: "Mon", sales: 12000, expenses: 4000, profit: 8000 },
        { day: "Tue", sales: 15000, expenses: 5000, profit: 10000 },
        { day: "Wed", sales: 11000, expenses: 3500, profit: 7500 },
        { day: "Thu", sales: 17000, expenses: 6500, profit: 10500 },
        { day: "Fri", sales: 19000, expenses: 7000, profit: 12000 },
        { day: "Sat", sales: 13000, expenses: 4200, profit: 8800 },
        { day: "Sun", sales: 9000, expenses: 3000, profit: 6000 },
    ];

    const monthlyProfit = [
        { month: "Jan", profit: 120000 },
        { month: "Feb", profit: 98000 },
        { month: "Mar", profit: 134000 },
        { month: "Apr", profit: 127000 },
        { month: "May", profit: 142000 },
        { month: "Jun", profit: 115000 },
        { month: "Jul", profit: 151000 },
        { month: "Aug", profit: 164000 },
        { month: "Sep", profit: 138000 },
        { month: "Oct", profit: 171000 },
        { month: "Nov", profit: 159000 },
        { month: "Dec", profit: 190000 },
    ];

    const receivables = [
        { id: 1, customer: "Rahul Sharma", amount: 2500, status: "pending" },
        { id: 2, customer: "Priya Verma", amount: 4200, status: "pending" },
        { id: 3, customer: "Amit Kumar", amount: 1500, status: "paid" },
    ];

    const payables = [
        { id: 1, supplier: "AquaPure Distributors", amount: 8000, status: "pending" },
        { id: 2, supplier: "HydroTech Pvt Ltd", amount: 5500, status: "pending" },
        { id: 3, supplier: "BlueWave Spares", amount: 2200, status: "paid" },
    ];

    const serviceReminders = [
        { id: 1, customer: "Kunal Singh", date: "2025-08-24", product: "RO Filter" },
        { id: 2, customer: "Sneha Patil", date: "2025-08-25", product: "UV Purifier" },
        { id: 3, customer: "Ravi Gupta", date: "2025-08-26", product: "Spare Pump" },
    ];

    const stock = [
        { id: 1, item: "RO Filter", qty: 4, min: 5 },
        { id: 2, item: "Carbon Cartridge", qty: 16, min: 8 },
        { id: 3, item: "Sediment Filter", qty: 3, min: 6 },
        { id: 4, item: "Spare Pump", qty: 11, min: 5 },
    ];

    const recent = [
        { id: 1, type: "Sale", label: "RO Filter x3", amount: 3600, when: "2h ago" },
        { id: 2, type: "Payment Received", label: "From Rahul Sharma", amount: 2500, when: "5h ago" },
        { id: 3, type: "Stock Added", label: "Sediment Filter x10", amount: 0, when: "Yesterday" },
        { id: 4, type: "Service Scheduled", label: "Sneha Patil • UV Purifier", amount: 0, when: "Yesterday" }
    ];


    // --- KPIs ---
    const todaysProfit = useMemo(
        () => dailySales[dailySales.length - 1]?.profit ?? 0,
        [dailySales]
    );
    const monthlyProfitTotal = useMemo(
        () => monthlyProfit.reduce((sum, m) => sum + m.profit, 0),
        [monthlyProfit]
    );
    const pendingReceivables = useMemo(
        () => receivables.filter(r => r.status === "pending").reduce((s, r) => s + r.amount, 0),
        [receivables]
    );
    const pendingPayables = useMemo(
        () => payables.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0),
        [payables]
    );
    const lowStock = stock.filter(s => s.qty < s.min);

    return (

        <div>
            <Dashboard {...data} />
        </div>
    );
}
