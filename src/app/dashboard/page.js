"use client";
import { useMemo } from "react";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context/contextapi";
import AddStockPage from "../components/addstock";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
export default function Dashboard() {
    const [showAddStock, setShowAddStock] = useState(false);
    const { authtoken } = useContext(AppContext);
    const router = useRouter();
    const [appear, setappear] = useState(false)
    const handleclick = () => {
        setappear(true);
        console.log("clicked")
    }
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

        <div className={styles.page}>
            <section className={styles.quickActions}>
                <button className={`${styles.qaBtn} ${styles.qaPrimary}`}>+ Add Sale</button>
                <button className={styles.qaBtn} onClick={handleclick}> + Add Stock </button>
            </section>

            <section className={styles.kpis}>
                <div className={`${styles.kpi} ${styles.kpiGreen}`}>
                    <div className={styles.kpiIcon}>💰</div>
                    <div className={styles.kpiBody}>
                        <span className={styles.kpiLabel}>Today’s Profit</span>
                        <span className={styles.kpiValue}>₹{todaysProfit.toLocaleString()}</span>
                    </div>
                </div>

                <div className={`${styles.kpi} ${styles.kpiBlue}`}>
                    <div className={styles.kpiIcon}>📆</div>
                    <div className={styles.kpiBody}>
                        <span className={styles.kpiLabel}>Monthly Profit (YTD)</span>
                        <span className={styles.kpiValue}>₹{monthlyProfitTotal.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div className={`${styles.kpi} ${styles.kpiOrange}`}>
                    <div className={styles.kpiIcon}>🧾</div>
                    <div className={styles.kpiBody}>
                        <span className={styles.kpiLabel}>Pending Receivables</span>
                        <span className={styles.kpiValue}>₹{pendingReceivables.toLocaleString()}</span>
                    </div>
                </div>

                <div className={`${styles.kpi} ${styles.kpiPink}`}>
                    <div className={styles.kpiIcon}>🏦</div>
                    <div className={styles.kpiBody}>
                        <span className={styles.kpiLabel}>Pending Payables</span>
                        <span className={styles.kpiValue}>₹{pendingPayables.toLocaleString()}</span>
                    </div>
                </div>
            </section>

            {/* Charts */}
            <section className={styles.charts}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.h3}>Daily Sales & Profit (Last 7 days)</h3>
                    </div>
                    <div className={styles.chartWrap}>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={dailySales} barSize={22}>
                                <CartesianGrid vertical={false} strokeOpacity={0.2} />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" name="Sales" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="profit" name="Profit" fill="#22C55E" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.h3}>Monthly Profit Trend</h3>
                    </div>
                    <div className={styles.chartWrap}>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={monthlyProfit} margin={{ right: 10 }}>
                                <CartesianGrid vertical={false} strokeOpacity={0.2} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="profit" name="Profit" dot radius={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* Middle grid: Recent + Reminders + Low Stock */}
            <section className={styles.grid2x}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.h3}>Recent Activity</h3>
                    </div>
                    <ul className={styles.activity}>
                        {recent.map((r) => (
                            <li key={r.id} className={styles.activityItem}>
                                <div className={styles.activityIcon}>
                                    {r.type === "Sale" ? "🛒" :
                                        r.type === "Payment Received" ? "✅" :
                                            r.type === "Payment Due" ? "⚠️" :
                                                r.type === "Stock Added" ? "📦" : "🔧"}
                                </div>
                                <div className={styles.activityBody}>
                                    <div className={styles.activityTop}>
                                        <span className={styles.activityType}>{r.type}</span>
                                        <span className={styles.activityWhen}>{r.when}</span>
                                    </div>
                                    <div className={styles.activityLabel}>{r.label}</div>
                                </div>
                                {r.amount > 0 && (
                                    <div className={styles.activityAmount}>₹{r.amount.toLocaleString()}</div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.sideCol}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.h3}>Upcoming Services</h3>
                        </div>
                        <ul className={styles.simpleList}>
                            {serviceReminders.map((s) => (
                                <li key={s.id}>
                                    <div>
                                        <div className={styles.bold}>{s.customer}</div>
                                        <div className={styles.dim}>{s.product}</div>
                                    </div>
                                    <div className={styles.tagInfo}>{s.date}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.h3}>Low Stock Alerts</h3>
                        </div>
                        <ul className={styles.simpleList}>
                            {lowStock.length === 0 ? (
                                <li><div className={styles.dim}>All good. No low stock 🔋</div></li>
                            ) : (
                                lowStock.map((s) => (
                                    <li key={s.id}>
                                        <div>
                                            <div className={styles.bold}>{s.item}</div>
                                            <div className={styles.dim}>In stock: {s.qty} • Min: {s.min}</div>
                                        </div>
                                        <div className={styles.tagWarn}>Low</div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </section>
            <AddStockPage appear={appear} setappear={setappear} />
        </div>
    );
}
