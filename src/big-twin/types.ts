export type LifecyclePhase = 'PLAN' | 'BUILD' | 'OPERATE' | 'RETROFIT';

export interface TelemetryPacket {
    btu_variance: number; 
    grid_load: number;
    timestamp: number;
}

export interface DigitalDeed {
    id: string;
    asset_class: string;
    lifecycle_phase: LifecyclePhase;
    base_valuation: number;
    telemetry: TelemetryPacket;
}

export interface MonopolyReport {
    total_nodes: number;
    cohorts: Record<LifecyclePhase, number>;
    raw_asset_value: number;
    network_multiplier: number;
    metcalfe_valuation: number;
    system_status: string;
}
