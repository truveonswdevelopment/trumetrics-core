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
