"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { calculateReport } from "@/lib/calculator";
import { saveReport, updateReport } from "@/lib/saveReport";

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

    useEffect(() => {
        const savedForm = localStorage.getItem("tracegreenForm");

        if (savedForm) {
            setFormData(JSON.parse(savedForm));
        }
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const report = calculateReport(formData);

        const editId = localStorage.getItem("editReportId");

        if (editId) {
            // UPDATE existing record
            await updateReport(Number(editId), formData, report);
        } else {
            // CREATE new record
            const data = await saveReport(formData, report);

            if (data && data.length > 0) {
                const insertedId = data[0].id;

                localStorage.setItem("editReportId", insertedId.toString());
            }
        }

        // save to localStorage
        localStorage.setItem("tracegreenReport", JSON.stringify(report));
        // save original form
        localStorage.setItem("tracegreenForm", JSON.stringify(formData));

        // clear edit mode after saving
        localStorage.removeItem("editReportId");

        // navigate to dashboard
        router.push("/dashboard");
    }

    const selectStyling = `
        w-full rounded-xl border border-gray-200 p-4 text-lg 
        focus:outline-none focus:ring-2 focus:ring-green-500 
        transition-all bg-gray-50 focus:bg-white 
        appearance-none cursor-pointer
        bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
        bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat
    `;

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-10 bg-green-50">
            <h1 className="text-3xl font-bold text-green-700 mb-6">
                Sustainability Assessment
            </h1>

            <form onSubmit={handleSubmit} className="max-w-6xl w-full">
                <div className="bg-white p-12 rounded-2xl shadow-2xl border border-green-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">Company Name</label>
                            <input
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-30 focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Electricity Bill
                            </label>
                            <input
                                name="electricity"
                                placeholder="Electricity Bill (RM)"
                                value={formData.electricity}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-30 focus:bg-white" />

                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Water Bill
                            </label>
                            <input
                                name="water"
                                placeholder="Water Bill (RM)"
                                value={formData.water}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-30 focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Total waste
                            </label>
                            <input
                                name="waste"
                                placeholder="Waste (kg)"
                                type="number"
                                value={formData.waste}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-30 focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Transport Distance
                            </label>
                            <input
                                name="transport"
                                placeholder="Transport Distance (km)"
                                type="number"
                                value={formData.transport}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-30 focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Total employee
                            </label>
                            <input
                                name="employeeCount"
                                placeholder="Employee Count"
                                type="number"
                                value={formData.employeeCount}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-30 focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Industry Type
                            </label>
                            <select
                                name="industryType"
                                value={formData.industryType}
                                onChange={handleChange}
                                className={selectStyling}
                            >
                                <option value="">Select Industry</option>
                                <option value="Retail">Retail</option>
                                <option value="Office">Office</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Beverage">Beverage</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Logistics">Logistics</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="text-xl font-bold text-gray-800 tracking-wide">
                                Waste Category
                            </label>
                            <select
                                name="wasteCategory"
                                value={formData.wasteCategory}
                                onChange={handleChange}
                                className={selectStyling}
                            >
                                <option value="">Select Waste Type</option>
                                <option value="Paper">Paper</option>
                                <option value="Plastic">Plastic</option>
                                <option value="Food Waste">Food Waste</option>
                                <option value="Electronic Waste">Electronic Waste</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center pt-16">
                        <button className="bg-green-600 text-white text-xl font-bold px-12 py-4 rounded-2xl hover:bg-green-700 hover:scale-105 transition-all shadow-lg active:scale-95" type="submit">
                            Generate Report
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}