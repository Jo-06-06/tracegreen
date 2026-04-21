"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Report = {
    score: number;
    totalImpact: number;
    electricity: number;
    waste: number;
    water: number;
    transport: number;
};

export default function DashboardPage() {
    const [report, setReport] = useState<Report | null>(null);

    const [scenario, setScenario] = useState({
        electricityReduction: 0,
        wasteReduction: 0,
        transportReduction: 0,
    });

    useEffect(() => {
        const saved = localStorage.getItem("tracegreenReport");

        if (saved) {
            setReport(JSON.parse(saved));
        }
    }, []);

    if (!report) return <p className="p-10">Loading...</p>;

    const scoreColor =
        report.score >= 80
            ? "text-green-600"
            : report.score >= 50
                ? "text-yellow-500"
                : "text-red-500";

    const impacts = {
        Electricity: report.electricity,
        Water: report.water,
        Waste: report.waste,
        Transport: report.transport,
    };

    const highestSource = Object.entries(impacts).reduce((a, b) =>
        a[1] > b[1] ? a : b
    )[0];

    const chartData = [
        { name: "Electricity", value: report.electricity },
        { name: "Water", value: report.water },
        { name: "Waste", value: report.waste },
        { name: "Transport", value: report.transport },
    ];

    const simulatedElectricity =
        report.electricity * (1 - scenario.electricityReduction / 100);

    const simulatedWaste =
        report.waste * (1 - scenario.wasteReduction / 100);

    const simulatedTransport =
        report.transport * (1 - scenario.transportReduction / 100);

    const simulatedTotal =
        simulatedElectricity + report.water + simulatedWaste + simulatedTransport;

    const simulatedScore = Math.max(0, 100 - simulatedTotal);

    function handleScenarioChange(e: React.ChangeEvent<HTMLInputElement>) {
        setScenario({
            ...scenario,
            [e.target.name]: Number(e.target.value),
        });
    }

    return (
        <main className="min-h-screen p-10 bg-green-50">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl font-bold text-green-700">
                    TraceGreen Report
                </h1>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-gray-500">Sustainability Score</p>
                        <p className={'text-3xl font-bold ${scoreColor}'}>
                            {report.score}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-gray-500">Highest Impact Source</p>
                        <p className="text-2xl font-bold">
                            {highestSource}
                        </p>
                    </div>
                    {/* <div className="bg-wite p-6 rounded-xl shadow-md">
                        <p className="text-gray-500">Total Impact</p>
                        <p className="text-3xl font-bold text-green-700">
                            {report.totalImpact}
                        </p>
                    </div> */}

                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Impact Breakdown
                    </h2>

                    <p>Electricity: {report.electricity}</p>
                    <p>Water: {report.water}</p>
                    <p>Waster: {report.waste}</p>
                    <p>Transport: {report.transport}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Recommendations
                    </h2>

                    <ul className="space-y-2 list-disc ml-5">
                        {report.electricity > 50 && (
                            <li>Reduce electricity use during peak hours.</li>
                        )}
                        {report.transport > 30 && (
                            <li>Optimize logistics or encourage carpooling.</li>
                        )}
                        {report.waste > 20 && (
                            <li>Improve recycling and reduce disposable waste.</li>
                        )}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Impact Overview
                    </h2>
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Scenario Simulator
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Electricity Reduction (%)
                            </label>
                            <input
                                type="number"
                                name="electricityReduction"
                                min="0"
                                max="100"
                                value={scenario.electricityReduction}
                                onChange={handleScenarioChange}
                                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Waste Reduction (%)
                            </label>
                            <input
                                type="number"
                                name="wasteReduction"
                                min="0"
                                max="100"
                                value={scenario.wasteReduction}
                                onChange={handleScenarioChange}
                                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Transport Reduction (%)
                            </label>
                            <input
                                type="number"
                                name="transportReduction"
                                min="0"
                                max="100"
                                value={scenario.transportReduction}
                                onChange={handleScenarioChange}
                                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                        <div className="rounded-2xl bg-green-50 p-5 border border-green-100">
                            <p className="text-sm text-gray-600">Simulated Total Impact</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {simulatedTotal.toFixed(2)}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-green-50 p-5 border border-green-100">
                            <p className="text-sm text-gray-600">Simulated Sustainability Score</p>
                            <p className="text-2xl font-bold text-green-700">
                                {simulatedScore.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 