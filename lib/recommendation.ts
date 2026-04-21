export function getRecommendations(report: any) {
    const tips = [];

    if (report.electricity > 50) {
        tips.push("Reduce electricity usage during peak hours.");
    }

    if (report.transport > 50) {
        tips.push("Encourage carpooling or optimize logistics routes.");
    }

    if (report.waste > 20) {
        tips.push("Improve recycling and reduce disposable materials");
    }

    return tips;
}