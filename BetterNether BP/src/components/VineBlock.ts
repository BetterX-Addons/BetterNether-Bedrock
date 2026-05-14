import { Block, BlockCustomComponent, EquipmentSlot, Vector3 } from "@minecraft/server";

const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
const vineStateKey = "betternether:vine";

export const vineComponent: BlockCustomComponent = {
    onRandomTick({ block, dimension }, { params }) {
        const p = params as { grow_direction: "up" | "down"; has_roots: boolean };
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        
        // No crecemos si ya hay un bloque en la dirección de crecimiento
        if (getBlockInDirection(block, direction)) return;
        
        // 10% de chance de no crecer
        if (Math.random() < 0.1) return;
        
        const vineState = getVineState(block);
        const maxState = getMaxState(p.has_roots);
        
        applyGrowth(block, dimension, vineState, maxState, p.has_roots, direction);
    },
    
    onPlayerInteract({ block, player, dimension }, { params }) {
        const p = params as { grow_direction: "up" | "down"; has_roots: boolean };
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        
        if (item?.typeId !== boneMeal) return;
        
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        
        // No crecemos si ya hay un bloque en la dirección de crecimiento
        if (getBlockInDirection(block, direction)) return;
        
        const vineState = getVineState(block);
        const maxState = getMaxState(p.has_roots);
        
        applyGrowth(block, dimension, vineState, maxState, p.has_roots, direction);
        
        item.amount -= 1;
        equipment?.setEquipment(EquipmentSlot.Mainhand, item);
    }
};

function getMaxState(hasRoots: boolean): number {
    return hasRoots ? 2 : 1;
}

function getBlockInDirection(block: Block, direction: "Up" | "Down"): Block | undefined {
    return direction === "Up" ? block.above() : block.below();
}

function getVineState(block: Block): number {
    return block.permutation.getState(vineStateKey) as number;
}

function setVineState(block: Block, state: number): void {
    const newPermutation = block.permutation.withState(vineStateKey, state);
    block.setPermutation(newPermutation);
}

function getFixedLocation(block: Block): Vector3 {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}

function applyGrowth(block: Block, dimension: any, vineState: number, maxState: number, hasRoots: boolean, direction: "Up" | "Down"): void {
    // Si el estado actual es menor al máximo, incrementamos el estado
    if (vineState < maxState) {
        setVineState(block, vineState + 1);
    } else {
        // Si alcanzamos el máximo estado, creamos un nuevo bloque en la dirección de crecimiento
        const nextBlock = getBlockInDirection(block, direction);
        if (nextBlock) {
            // El nuevo bloque comienza con state 0
            setVineState(nextBlock, 0);
        }
    }
    
    // Spawn particles en la ubicación actual
    dimension.spawnParticle(growthParticle, getFixedLocation(block));
}