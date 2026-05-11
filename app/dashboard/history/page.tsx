"use client";

import { useEffect, useState } from "react";
import { getReports } from "@/lib/getReports";
import { useRouter } from "next/navigation";

type Report = {
    id: number;
    company_name: string;
    electricity: number;
    water: number;
    waste: number;
    transport: number;
    score: number;
    total_impact: number;
    created_at: string;
};

export default function HistoryPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await getReports();
            setReports(data || []);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-green-50">
                <p className="text-lg text-gray-600">Loading reports...</p>
            </main>
        );
    }

    function handleEditFromHistory(item: Report) {
        // save form data
        localStorage.setItem("tracegreenForm", JSON.stringify({
            companyName: item.company_name,
            electricity: item.electricity,
            water: item.water,
            waste: item.waste,
            transport: item.transport,
        }));

        // save ID 
        localStorage.setItem("editReportId", item.id.toString());

        router.push("/assessment");
    }
    
    return (
        <main className="min-h-screen bg-green-50 px-6 py-12">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Title */}
                <h1 className="text-4xl font-bold text-green-700">
                    Report History
                </h1>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="px-5 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100"
                >
                    Back
                </button>

                {/* Empty State */}
                {reports.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-md p-10 text-center">
                        <p className="text-gray-500">
                            No reports found. Start by creating one.
                        </p>
                    </div>
                )}

                {/* Table */}
                {reports.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                        <table className="w-full text-left">

                            <thead className="bg-gray-100 text-gray-600 text-sm">
                                <tr>
                                    <th className="p-4">Company</th>
                                    <th className="p-4">Score</th>
                                    <th className="p-4">Total Impact</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Created At</th>

                                </tr>
                            </thead>

                            <tbody>
                                {reports.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleEditFromHistory(item)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="p-4 font-medium">
                                            {item.company_name}
                                        </td>

                                        <td className="p-4">
                                            {item.score.toFixed(1)}
                                        </td>

                                        <td className="p-4">
                                            {item.total_impact.toFixed(2)}
                                        </td>

                                        <td className="p-4 text-gray-500">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>
        </main>
    );
}