"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecommendations } from "@/lib/recommendation";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type Report = {
    score: number;
    totalImpact: number;
    electricity: number;
    water: number;
    waste: number;
    transport: number;
};

export default function DashboardPage() {
    const [report, setReport] = useState<Report | null>(null);

    const router = useRouter();

    const saved = localStorage.getItem("tracegreenReport");
    useEffect(() => {
        if (saved) setReport(JSON.parse(saved));
    }, []);

    if (!report) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-green-50">
                <p className="text-lg text-gray-600">Loading report...</p>
            </main>
        );
    }

    const chartData = [
        { name: "Electricity", value: report.electricity },
        { name: "Water", value: report.water },
        { name: "Waste", value: report.waste },
        { name: "Transport", value: report.transport },
    ];

    const recommendations = getRecommendations(report);


    const highestImpact = chartData.reduce((prev, current) =>
        prev.value > current.value ? prev : current
    ).name;

    function getScoreColor(score: number) {
        if (score >= 70) return "text-green-600";
        if (score >= 40) return "text-yellow-500";
        return "text-red-500";
    }

    function handleNew() {
        localStorage.removeItem("tracegreenForm");
        localStorage.removeItem("tracegreenReport");
        localStorage.removeItem("editReportId");

        router.push("/assessment");
    }

    function handleEdit() {
        router.push("/assessment");
    }

    return (
        <main className="min-h-screen bg-green-50 px-6 py-12">
            <div className="max-w-6xl mx-auto space-y-8">

                <h1 className="text-4xl font-bold text-green-700">
                    TraceGreen Report
                </h1>

                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={handleEdit}
                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Edit Record
                    </button>

                    <button
                        onClick={() => router.push("/dashboard/history")}
                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        View History
                    </button>

                    <button
                        onClick={handleNew}
                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        New Assessment
                    </button>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-3xl shadow-md p-6">
                        <p className="text-xl text-gray-600">
                            Sustainability Score
                        </p>

                        <h2 className={`text-4xl font-bold ${getScoreColor(report.score)}`}>
                            {report.score.toFixed(1)}
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                            Out of 100 (lower impact = better)
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-md p-6">
                        <p className="text-xl text-gray-600">Highest Impact</p>
                        <h2 className="text-2xl font-bold">{highestImpact}</h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-md p-6">
                        <p className="text-xl text-gray-600">Total Impact</p>
                        <h2 className="text-2xl font-bold">
                            {report.totalImpact.toFixed(2)}
                        </h2>
                    </div>

                </div>

                {/* Chart */}
                <div className="bg-white rounded-3xl shadow-md p-6">

                    <h2 className="text-2xl font-semibold mb-6">
                        Impact Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#16a34a" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-3xl shadow-md p-6">

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Recommendations
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {recommendations.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("tracegreenForm");
                        localStorage.removeItem("tracegreenReport");
                        router.push("/assessment");
                    }}
                    className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                    Reset
                </button>
            </div>
        </main >
    );
}