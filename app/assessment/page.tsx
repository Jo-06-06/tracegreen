"use client";

import { useState } from "react";

export default function AssessmentPage() {
    const [formData, setFromData] = useState({
        companyName: "",
        electricity: "",
        water: "",
        waster: "",
        transport: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFromData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <main className="min-h-screen p-10 bg-green-50">
            <h1 className="text-3xl font-bold text-green-700 mb-6">
                Sustainability Assessment
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    name="companyName"
                    placeholder="Company Name"
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <input
                    name="waste"
                    placeholder="Waste (kg)"
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <input
                    name="transport"
                    placeholder="Transport Distance (km)"
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <button className="bg-green-600 text-white px-6 py-3 rounded-xl">
                    Generate Report
                </button>
            </form>
        </main>
    );
}