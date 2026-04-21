"use client";

import { useEffect, useState } from "react";

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

    return (
        <main className="min-h-screen p-10 bg-green-50">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl font-bold text-green-700">
                    TraceGreen Report
                </h1>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-wite p-6 rounded-xl shadow-md">
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

                <div className="bg-wite p-6 rounded-xl shadow-md">
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

            </div>
        </main>
    );
} 