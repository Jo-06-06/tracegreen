export function calculateReport(data: {
    electricity: string;
    water: string;
    waste: string;
    transport: string;
}) {
    const electricity = Number(data.electricity) * 0.5;
    const water = Number(data.water) * 0.2;
    const waste = Number(data.waste) * 0.3;
    const transport = Number(data.transport) * 0.4;

    const totalImpact = electricity + water + waste + transport;

    const score = Math.max(0, 100 - totalImpact);

    return {
        totalImpact,
        score,
        electricity,
        water,
        waste,
        transport,
    };
}