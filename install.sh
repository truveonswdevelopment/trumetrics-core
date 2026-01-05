#!/bin/bash

echo ">>> DEPLOYING TRUMETRICS CORE LOGIC..."

# 1. Create Directory Structure
mkdir -p packages/mrac-models/src
mkdir -p apps/little-twin-edge/src

# 2. Write the Schema (The Digital Deed)
cat << 'EOF' > packages/mrac-models/src/schema.json
{
  "title": "TruMetrics Asset",
  "properties": {
    "little_twin_state": {
      "type": "object",
      "properties": {
        "electrical_inputs": { "type": "object" },
        "pneumatic_response": { "type": "object" },
        "thermal_derivation": { "type": "object" }
      }
    }
  }
}
EOF

# 3. Write the Types (The Enforcer)
cat << 'EOF' > packages/mrac-models/src/types.ts
export interface TruMetricsAsset {
  asset_identity: { uuid: string; builder_id: string; };
  little_twin_state: {
    electrical_inputs: { dryer_amps: number; range_amps: number; hood_amps: number; hvac_amps: number; indoor_temp_f: number; outdoor_temp_f: number; };
    pneumatic_response: { makeup_air_target_cfm: number; };
    thermal_derivation: { cooking_impact_net_btu: number; net_envelope_flux_btu: number; };
  };
}
EOF

# 4. Write the Logic (The Kitchen Paradox)
cat << 'EOF' > apps/little-twin-edge/src/hpm-core.ts
import { TruMetricsAsset } from '../../../packages/mrac-models/src/types';

const SPECS = { DRYER_CFM: 150, HOOD_CFM: 400, HVAC_COP: 3.5 };

export class HomePerformanceManager {
  public processTick(sensors: any): Partial<TruMetricsAsset['little_twin_state']> {
    
    // PNEUMATICS: Calculate Exhaust
    let exhaust = 0;
    if (sensors.dryer_amps > 1.0) exhaust += SPECS.DRYER_CFM;
    if (sensors.hood_amps > 1.0) exhaust += SPECS.HOOD_CFM;

    // THERMALS: The Kitchen Paradox
    const hvac_btu = (sensors.hvac_amps * 240 * 3.412) * SPECS.HVAC_COP;
    const stove_btu = sensors.range_amps * 240 * 3.412;
    
    // Hood Loss Calculation
    const delta_t = sensors.indoor_temp_f - sensors.outdoor_temp_f;
    const hood_loss_btu = (sensors.hood_amps > 1.0 ? SPECS.HOOD_CFM : 0) * 1.08 * delta_t;
    
    const net_kitchen_impact = stove_btu - hood_loss_btu;
    const net_envelope_flux = hvac_btu - net_kitchen_impact;

    return {
      electrical_inputs: sensors,
      pneumatic_response: { makeup_air_target_cfm: exhaust },
      thermal_derivation: {
        cooking_impact_net_btu: Math.round(net_kitchen_impact),
        net_envelope_flux_btu: Math.round(net_envelope_flux)
      }
    };
  }
}
EOF

# 5. Write the Simulation Runner
cat << 'EOF' > apps/little-twin-edge/src/run-simulation.ts
import { HomePerformanceManager } from './hpm-core';

console.log("=== TRUMETRICS SIMULATION: THE KITCHEN PARADOX ===");
const hpm = new HomePerformanceManager();

// SCENARIO: Thanksgiving Cooking (Range ON, Hood ON)
const sensors = {
  dryer_amps: 0, 
  range_amps: 20.0, // High Heat
  hood_amps: 2.0,   // High Exhaust
  hvac_amps: 12.0,  
  indoor_temp_f: 70, 
  outdoor_temp_f: 30
};

const result = hpm.processTick(sensors);
console.log(JSON.stringify(result, null, 2));
EOF

# 6. Initialize and Run
echo ">>> INSTALLING DEPENDENCIES (One-time setup)..."
if [ ! -f "package.json" ]; then 
  npm init -y > /dev/null
  npm install typescript ts-node @types/node --save-dev > /dev/null
fi

echo ">>> EXECUTING SIMULATION..."
npx ts-node apps/little-twin-edge/src/run-simulation.ts
echo ">>> DONE."

