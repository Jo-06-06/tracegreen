import { supabase } from "./supabase";

type InsertedReport = {
    id: number;
};

export async function saveReport(
    formData: any,
    report: any
): Promise<InsertedReport[] | null> {
    try {
        const { data, error } = await supabase
            .from("reports")
            .insert([
                {
                    company_name: formData.companyName,
                    electricity: Number(formData.electricity),
                    water: Number(formData.water),
                    waste: Number(formData.waste),
                    transport: Number(formData.transport),
                    score: report.score,
                    total_impact: report.totalImpact,
                },
            ])
            .select("id"); // 🔥 IMPORTANT

        if (error) {
            console.error("Insert error:", error);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
}

export async function updateReport(
    id: number,
    formData: any,
    report: any
) {
    try {
        const { error } = await supabase
            .from("reports")
            .update({
                company_name: formData.companyName,
                electricity: Number(formData.electricity),
                water: Number(formData.water),
                waste: Number(formData.waste),
                transport: Number(formData.transport),
                score: report.score,
                total_impact: report.totalImpact,

                created_at: new Date().toISOString()
            })
            .eq("id", id);

        if (error) {
            console.error("Update error:", error);
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}