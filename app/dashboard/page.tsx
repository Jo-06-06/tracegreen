"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [report, setReport] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("tracegreeReport");

        if (saved) {
            setReport(JSON.parse(saved));
        }
    }, []);
    if (!report) return <p>Loading...</p>;
    
    return (
        <main className="min-h-screen p-10 bg-green-50">
            <h1 className="text-4xl font-bold text-green-700">
                TraceGreen Report
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
                <p className="text-xl">Sustainability Score: {report.score}</p>
                <p>Total Impact: {report.totalImport}</p>
            </div>
        </main>
    );
} 