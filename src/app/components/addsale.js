"use client";
import { useState } from "react";
import "./addstock.css";
import { useContext } from "react";
import { toast } from 'react-toastify'
import { AppContext } from "../context/contextapi.js";
export default function AddStockPage(props) {
    const { loading, setloading } = useContext(AppContext);
    const { appear, setappear } = props;
    const today = new Date().toISOString().split("T")[0]
    const [form, setForm] = useState({
        customerName: "",
        tel: "",
        email: "",
        productName: "",
        quantity: "",
        price: "",
        paymentMethod: "",
        saleDate: today,
    });
    const [Message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
    };

    const handleSubmit = async (e) => {
        setloading(true)
        e.preventDefault();
        console.log("📦 Sending form data:", form);

        try {
            const res = await fetch("https://demobackend-memw.onrender.com/api/sale/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                setloading(false)
                setMessage("✅ Sale successfully!");
                toast.success("✅ Sale successfully!")
                setForm({
                    customerName: "",
                    tel: "",
                    email: "",
                    productName: "",
                    quantity: "",
                    price: "",
                    paymentMethod: "",
                    totalAmount: "",
                    saleDate: "",
                });
                setTimeout(() => {
                    // setloading(false)
                    setMessage("");
                    setappear(false)
                }, 2000);
            } else {
                toast.error(data.error)
                console.log(data.error)
                setMessage(`❌ Error: ${data.error || "Failed to add stock"}`);
                setForm({
                    customerName: "",
                    tel: "",
                    email: "",
                    productName: "",
                    quantity: "",
                    price: "",
                    paymentMethod: "",
                    totalAmount: "",
                    saleDate: "",
                });
                setTimeout(() => {
                    setloading(false)
                    setappear(false)
                }, 2000);
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Server error. Please try again.");
        }
    };

    return (
        <>
            {appear &&
                <>
                    <div className="overlay" onClick={() => setappear(false)}></div>
                    <div className={'container'}>
                        <h1 className={'title'}>Add Sale</h1>
                        <button className="closeBtn" onClick={() => {
                            setappear(false)
                        }}>X</button>
                        <form className="form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Customer Name"
                                value={form.customerName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="tel"
                                placeholder="Contact Number"
                                value={form.tel}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Contact Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="productName"
                                placeholder="Product Name"
                                value={form.productName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price per unit"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="totalAmount"
                                placeholder="Total Amount"
                                value={form.price && form.quantity ? form.price * form.quantity : ""}
                                readOnly
                            />
                            <select
                                className="select"
                                name="paymentMethod"
                                value={form.paymentMethod}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="upi">UPI</option>
                                <option value="wallet">Wallet</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="date"
                                name="saleDate"
                                value={form.saleDate}
                                onChange={handleChange}
                            />
                            <button type="submit" className="button">
                                {loading ? "Adding..." : "Add Sale"}
                            </button>
                        </form>


                        {Message && <p className={'message'}>{Message}</p>}
                    </div>
                </>
            }</>
    );
}
