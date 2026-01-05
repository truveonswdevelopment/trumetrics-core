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
