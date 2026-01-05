import { BigTwinEngine } from './engine';
import { DigitalDeed, LifecyclePhase } from './types';

const generateSwarm = (count: number): DigitalDeed[] => {
    const swarm: DigitalDeed[] = [];
    const phases: LifecyclePhase[] = ['PLAN', 'BUILD', 'OPERATE', 'RETROFIT'];

    for (let i = 0; i < count; i++) {
        // 80% chance the node is optimized (solving the paradox)
        const isOptimized = Math.random() > 0.2;
        
        swarm.push({
            id: 'twin-edge-' + i,
            asset_class: 'Commercial-Mixed-Use',
            lifecycle_phase: phases[Math.floor(Math.random() * phases.length)],
            base_valuation: 1000000 + (Math.random() * 500000), 
            telemetry: {
                btu_variance: isOptimized ? -902 : -902 + (Math.random() * 500 - 250),
                grid_load: 45,
                timestamp: Date.now()
            }
        });
    }
    return swarm;
};

const engine = new BigTwinEngine();
const littleTwinSwarm = generateSwarm(100);

engine.ingest(littleTwinSwarm);
const report = engine.processNetworkValue();

console.log("\n*** TRUMETRICS EMPIRE REPORT: JAN 2026 ***");
console.table(report.cohorts);
console.log("RAW ASSET VALUE:       $" + report.raw_asset_value.toLocaleString());
console.log("NETWORK MULTIPLIER:    " + report.network_multiplier + "x (Metcalfe Index)");
console.log("METCALFE VALUATION:    $" + report.metcalfe_valuation.toLocaleString());
console.log("STATUS:                " + report.system_status);
