import { EquipmentSlot } from "@minecraft/server";
const BONE_MEAL = 'minecraft:bone_meal';
const GROWTH_PARTICLE = 'minecraft:crop_growth_emitter';
const VINE_STATE_KEY = "betternether:vine";
const getMaxState = (hasRoots) => hasRoots ? 2 : 1;
const getTopState = (hasRoots) => hasRoots ? 2 : 1;
function getBlockInDirection(block, direction) {
    return direction === "Up" ? block.above() : block.below();
}
function getOppositeDirection(direction) {
    return direction === "Up" ? "Down" : "Up";
}
function getVineState(block) {
    return block.permutation.getState(VINE_STATE_KEY);
}
function setVineState(block, state) {
    const newPermutation = block.permutation.withState(VINE_STATE_KEY, state);
    block.setPermutation(newPermutation);
}
function growVine(block, vineState, maxState, hasRoots, direction) {
    if (vineState < maxState) {
        setVineState(block, vineState + 1);
        const oppositeBlock = getBlockInDirection(block, getOppositeDirection(direction));
        if (oppositeBlock) {
            setVineState(oppositeBlock, vineState);
        }
    }
    else {
        const newVineBlock = getBlockInDirection(block, direction);
        if (newVineBlock) {
            setVineState(newVineBlock, getTopState(hasRoots));
        }
    }
}
function getParticleLocation(block) {
    const { x, y, z } = block.location;
    return { x: x + 0.5, y, z: z + 0.5 };
}
export const vineComponent = {
    onRandomTick({ block, dimension }, { params }) {
        const p = params;
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        if (getBlockInDirection(block, direction))
            return;
        if (Math.random() < 0.1)
            return;
        const vineState = getVineState(block);
        const maxState = getMaxState(p.has_roots);
        growVine(block, vineState, maxState, p.has_roots, direction);
        dimension.spawnParticle(GROWTH_PARTICLE, getParticleLocation(block));
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        if (item?.typeId !== BONE_MEAL)
            return;
        const p = params;
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        if (getBlockInDirection(block, direction))
            return;
        const vineState = getVineState(block);
        const maxState = getMaxState(p.has_roots);
        growVine(block, vineState, maxState, p.has_roots, direction);
        item.amount -= 1;
        equipment?.setEquipment(EquipmentSlot.Mainhand, item);
        dimension.spawnParticle(GROWTH_PARTICLE, getParticleLocation(block));
    }
};
