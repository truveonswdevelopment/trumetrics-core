export interface TruMetricsAsset {
  asset_identity: { uuid: string; builder_id: string; };
  little_twin_state: {
    electrical_inputs: { dryer_amps: number; range_amps: number; hood_amps: number; hvac_amps: number; indoor_temp_f: number; outdoor_temp_f: number; };
    pneumatic_response: { makeup_air_target_cfm: number; };
    thermal_derivation: { cooking_impact_net_btu: number; net_envelope_flux_btu: number; };
  };
}
