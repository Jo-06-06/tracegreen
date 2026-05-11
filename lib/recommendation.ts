export function getRecommendations(report: any) {
    const tips: string[] = [];

    if (report.electricity > 40) {
        tips.push("Reduce electricity usage during peak hours.");
    }

    if (report.water > 20) {
        tips.push("Implement water-saving practices.");
    }

    if (report.waste > 10) {
        tips.push("Improve waste recycling and management.");
    }

    if (report.transport > 20) {
        tips.push("Optimize logistics or reduce travel.");
    }

    if (tips.length === 0) {
        tips.push("Your sustainability performance is good. Keep it up.");
    }

    return tips;
}