import { supabase } from "./supabase";

export async function getReports() {
    try {
        const { data, error } = await supabase
            .from("reports")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch error:", error);
            return [];
        }

        return data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return [];
    }
}