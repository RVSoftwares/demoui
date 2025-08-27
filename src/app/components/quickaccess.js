import React, { useState } from 'react'
import './quickaccess.css'
import AddStockPage from "../components/addstock";
import Addsale from '../components/addsale'
const quickaccess = () => {
    const [modal, setModal] = useState(null);
    const handleAddStock = () => setModal("stock");
    const handleAddSale = () => setModal("sale");
    const closeModal = () => setModal(null);
    return (
        <div>
            <section className="quickActions">
                <button className="qaBtn" onClick={handleAddSale}>+ Add Sale</button>
                <button className="qaBtn" onClick={handleAddStock}> + Add Stock </button>
            </section>
            <AddStockPage appear={modal === "stock"} setappear={closeModal} />
            <Addsale appear={modal === "sale"} setappear={closeModal} />
        </div>
    )

}

export default quickaccess
