"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateReport } from "@/lib/calculator";

export default function AssessmentPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        companyName: "",
        electricity: "",
        water: "",
        waste: "",
        transport: "",
        employeeCount: "",
        industryType: "",
        wasteCategory: ""
    });
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const report = calculateReport(formData);

        localStorage.setItem("tracegreenReport", JSON.stringify(report));

        router.push("/dashboard");
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-10 bg-green-50">
            <h1 className="text-3xl font-bold text-green-700 mb-6">
                Sustainability Assessment
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg w-full">
                <label>Company Name</label>
                <input
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <label>Electricity Bill</label>
                <input
                    name="electricity"
                    placeholder="Electricity Bill (RM)"
                    value={formData.electricity}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <label>Water Bill</label>
                <input
                    name="water"
                    placeholder="Water Bill (RM)"
                    value={formData.water}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <label>Total waste</label>
                <input
                    name="waste"
                    placeholder="Waste (kg)"
                    type="number"
                    value={formData.waste}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <label>Transport Distance</label>
                <input
                    name="transport"
                    placeholder="Transport Distance (km)"
                    type="number"
                    value={formData.transport}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <label>Total employee</label>
                <input
                    name="employeeCount"
                    placeholder="Employee Count"
                    type="number"
                    value={formData.employeeCount}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                />

                <label>Industry Type</label>
                <select
                    name="industryType"
                    value={formData.industryType}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                >
                    <option value="">Select Industry</option>
                    <option value="Retail">Retail</option>
                    <option value="Office">Office</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Logistics">Logistics</option>
                </select>

                <label>Waste Category</label>
                <select
                    name="wasteCategory"
                    placeholder="Waste Category"
                    value={formData.wasteCategory}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                >
                    <option value="">Select Waste Type</option>
                    <option value="Paper">Paper</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Food Waste">Food Waste</option>
                    <option value="Electronic Waste">Electronic Waste</option>
                    <option value="Mixed">Mixed</option>
                </select>

                <div className="flex justify-center pt-4">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition" type="submit">
                        Generate Report
                    </button>
                </div>
            </form>
        </main>
    );
}