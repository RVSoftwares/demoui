"use client";
import { useState } from "react";
import "./addstock.css";
import { useContext } from "react";
import { AppContext } from "../context/contextapi.js";
export default function AddStockPage(props) {
    const { loading,setloading } = useContext(AppContext);
    const { appear, setappear } = props;
    const [form, setForm] = useState({
        productName: "",
        productType: "",
        brand: "",
        price: "",
        quantity: "",
        thresholdQuantity: "",
        supplier: "",
        purchaseDate: "",
        paymentMode: "",
        amountPaid: "",
        amountPending: "",
    });

    const [Message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        thresholdQuantity: Number(form.thresholdQuantity),
    };

    const handleSubmit = async (e) => {
        setloading(true)
        e.preventDefault();
        console.log("📦 Sending form data:", form);

        try {
            const res = await fetch("http://localhost:3001/api/stock/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                setloading(false)
                setMessage("✅ Stock added successfully!");
                setForm({
                    productName: "",
                    productType: "",
                    brand: "",
                    price: "",
                    quantity: "",
                    thresholdQuantity: "",
                    supplier: "",
                    purchaseDate: "",
                    paymentMode: "",
                    amountPaid: "",
                    amountPending: "",
                });
            } else {
                console.log(data.messsage)
                setMessage(`❌ Error: ${data.message || "Failed to add stock"}`);
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
                        <h1 className={'title'}>Add Stock</h1>
                        <button className="closeBtn" onClick={() => {
                            setappear(false)
                        }}>X</button>
                        <form className="form" onSubmit={handleSubmit}>
                            <input type="text" name="productName" placeholder="Product Name" value={form.productName} onChange={handleChange} required />
                            <input type="text" name="productType" placeholder="Product Type" value={form.productType} onChange={handleChange} required />
                            <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
                            <input type="number" name="price" placeholder="Price per unit" value={form.price} onChange={handleChange} required />
                            <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
                            <input type="number" name="thresholdQuantity" placeholder="Threshold Quantity" value={form.thresholdQuantity} onChange={handleChange} required />
                            <input type="text" name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} />
                            <input type="date" name="purchaseDate" placeholder="Purchase Date" value={form.purchaseDate} onChange={handleChange} />
                            <select className="select" name="paymentMode" value={form.paymentMode} onChange={handleChange}>
                                <option value="">Payment Mode</option>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="upi">UPI</option>
                                <option value="bank">Bank Transfer</option>
                            </select>
                            <input type="number" name="amountPaid" placeholder="Amount Paid" value={form.amountPaid} onChange={handleChange} />
                            <input type="number" name="amountPending" placeholder="Amount Pending" value={form.amountPending} onChange={handleChange} />
                        <button type="submit" className="button">{loading ? "Adding..." : "Add Stock"}</button>
                        </form>

                        {Message && <p className={'message'}>{Message}</p>}
                    </div>
                </>
            }</>
    );
}
