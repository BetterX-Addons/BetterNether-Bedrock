import { EquipmentSlot } from "@minecraft/server";
const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
const vineStateKey = "betternether:vine";
export const vineComponent = {
    onRandomTick({ block, dimension }, { params }) {
        const p = params;
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        // No crecemos si ya hay un bloque en la dirección de crecimiento
        if (getBlockInDirection(block, direction))
            return;
        // 10% de chance de no crecer
        if (Math.random() < 0.1)
            return;
        const vineState = getVineState(block);
        const maxState = getMaxState(p.has_roots);
        applyGrowth(block, dimension, vineState, maxState, p.has_roots, direction);
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const p = params;
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        if (item?.typeId !== boneMeal)
            return;
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        // No crecemos si ya hay un bloque en la dirección de crecimiento
        if (getBlockInDirection(block, direction))
            return;
        const vineState = getVineState(block);
        const maxState = getMaxState(p.has_roots);
        applyGrowth(block, dimension, vineState, maxState, p.has_roots, direction);
        item.amount -= 1;
        equipment?.setEquipment(EquipmentSlot.Mainhand, item);
    }
};
function getMaxState(hasRoots) {
    return hasRoots ? 2 : 1;
}
function getBlockInDirection(block, direction) {
    return direction === "Up" ? block.above() : block.below();
}
function getVineState(block) {
    return block.permutation.getState(vineStateKey);
}
function setVineState(block, state) {
    const newPermutation = block.permutation.withState(vineStateKey, state);
    block.setPermutation(newPermutation);
}
function getFixedLocation(block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}
function applyGrowth(block, dimension, vineState, maxState, hasRoots, direction) {
    // Si el estado actual es menor al máximo, incrementamos el estado
    if (vineState < maxState) {
        setVineState(block, vineState + 1);
    }
    else {
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
