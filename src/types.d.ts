interface CreepMemory {
    role: 'harvester' | 'upgrader' | 'builder';
    building?: boolean;
    upgrading?: boolean;
    working?: boolean;
}
