import { EquipmentSlot } from "@minecraft/server";
const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
/*
# Vine without roots (betternether:vine) -> State with 2 values: 0 = bottom vine, 1 = middle vine
# Vine with roots (betternether:vine) -> State with 3 values: 0 = bottom vine, 1 = middle vine, 2 = top vine

- Vines with roots, if they grow, the new vine will be the top vine, the current vine will be the middle vine and if there is a vine below, it will become the bottom vine
- Vines without roots, if they grow, the new vine will be the middle vine and the current vine will be the bottom vine, if there is a vine below, it will remain unchanged
*/
export const vineComponent = {
    onRandomTick({ block, dimension }, { params }) {
        const p = params;
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        const hasRoots = p.has_roots;
        const maxState = hasRoots ? 2 : 1;
        const permutation = block.permutation;
        const vineState = permutation.getState("betternether:vine");
        const targetBlock = getBlockWithOffset(block, direction);
        if (!targetBlock) {
            if (Math.random() < 0.1)
                return;
            if (vineState < maxState) {
                // Increment current vine state
                const newPermutation = permutation.withState("betternether:vine", vineState + 1);
                block.setPermutation(newPermutation);
                // Update vine in opposite direction to shift structure
                const oppositeBlock = getBlockWithOffset(block, direction === "Up" ? "Down" : "Up");
                if (oppositeBlock) {
                    const oppositePermutation = oppositeBlock.permutation.withState("betternether:vine", vineState);
                    oppositeBlock.setPermutation(oppositePermutation);
                }
            }
            else {
                // At max state, place new vine in growth direction
                const newBlock = getBlockWithOffset(block, direction);
                if (newBlock) {
                    const newPermutation = newBlock.permutation.withState("betternether:vine", hasRoots ? 2 : 1);
                    newBlock.setPermutation(newPermutation);
                }
            }
            dimension.spawnParticle(growthParticle, particleLocation(block));
        }
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        const p = params;
        const direction = p.grow_direction === "up" ? "Up" : "Down";
        const hasRoots = p.has_roots;
        const maxState = hasRoots ? 2 : 1;
        const permutation = block.permutation;
        const vineState = permutation.getState("betternether:vine");
        const targetBlock = getBlockWithOffset(block, direction);
        if (item?.typeId === boneMeal && !targetBlock) {
            if (vineState < maxState) {
                const newPermutation = permutation.withState("betternether:vine", vineState + 1);
                block.setPermutation(newPermutation);
                const oppositeBlock = getBlockWithOffset(block, direction === "Up" ? "Down" : "Up");
                if (oppositeBlock) {
                    const oppositePermutation = oppositeBlock.permutation.withState("betternether:vine", vineState);
                    oppositeBlock.setPermutation(oppositePermutation);
                }
            }
            else {
                const newBlock = getBlockWithOffset(block, direction);
                if (newBlock) {
                    const newPermutation = newBlock.permutation.withState("betternether:vine", hasRoots ? 2 : 1);
                    newBlock.setPermutation(newPermutation);
                }
            }
            item.amount -= 1;
            equipment?.setEquipment(EquipmentSlot.Mainhand, item);
            dimension.spawnParticle(growthParticle, particleLocation(block));
        }
    }
};
function particleLocation(block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}
function getBlockWithOffset(block, direction) {
    if (direction === "Up") {
        return block.above();
    }
    else {
        return block.below();
    }
}
