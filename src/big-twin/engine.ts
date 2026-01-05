import { DigitalDeed, MonopolyReport, LifecyclePhase } from './types';

export class BigTwinEngine {
    private signals: DigitalDeed[] = [];
    private readonly IDEAL_BTU_DELTA = -902; 

    constructor() {
        console.log(">> BIG TWIN ONLINE. LISTENING FOR LITTLE TWINS...");
    }

    public ingest(swarm: DigitalDeed[]): void {
        this.signals = swarm;
        console.log(">> INGESTED " + this.signals.length + " SIGNALS.");
    }

    public processNetworkValue(): MonopolyReport {
        const cohorts: Record<LifecyclePhase, number> = {
            'PLAN': 0, 'BUILD': 0, 'OPERATE': 0, 'RETROFIT': 0
        };

        let rawAssetValue = 0;
        let totalEfficiencyScore = 0;

        this.signals.forEach(twin => {
            cohorts[twin.lifecycle_phase]++;
            rawAssetValue += twin.base_valuation;

            const delta = Math.abs(twin.telemetry.btu_variance - this.IDEAL_BTU_DELTA);
            const efficiency = delta === 0 ? 1 : 1 / (1 + (delta * 0.01));
            totalEfficiencyScore += efficiency;
        });

        const N = this.signals.length;
        const avgEfficiency = N > 0 ? totalEfficiencyScore / N : 0;
        
        // METCALFE FORMULA
        const networkFactor = Math.pow(N / 10, 2); 
        const networkMultiplier = 1 + (networkFactor * avgEfficiency);
        const metcalfeValuation = rawAssetValue * networkMultiplier;

        return {
            total_nodes: N,
            cohorts,
            raw_asset_value: rawAssetValue,
            network_multiplier: parseFloat(networkMultiplier.toFixed(4)),
            metcalfe_valuation: Math.floor(metcalfeValuation),
            system_status: avgEfficiency > 0.8 ? 'OPTIMIZED (EMPIRE STATE)' : 'SUB-OPTIMAL'
        };
    }
}
