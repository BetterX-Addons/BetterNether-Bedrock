import { EquipmentSlot } from "@minecraft/server";
const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
export const vineComponent = {
    onRandomTick({ block, dimension }, { params }) {
        const p = params;
        const direction = p.growing_direction === "up" ? "Up" : "Down";
        const permutation = block.permutation;
        const vineState = permutation.getState("betternether:vine"); // always true
        const isBlock = getBlockWithOffset(block, direction);
        if (!isBlock) {
            if (Math.random() < 0.1)
                return;
            // Si no hay bloque en la dirección de crecimiento, crece, si lo hay, no hace nada
            // La parte que crece, se le añade el permutation betternether:vine en true que seria el top vine
            // La parte anterior, se le añade el permutation betternether:vine en false que seria el bottom vine
            const newPermutation = permutation.withState("betternether:vine", true);
            block.setPermutation(newPermutation);
            const offsetBlock = getBlockWithOffset(block, direction === "Up" ? "Down" : "Up");
            if (offsetBlock) {
                const offsetPermutation = offsetBlock.permutation.withState("betternether:vine", false);
                offsetBlock.setPermutation(offsetPermutation);
            }
            dimension.spawnParticle(growthParticle, particleLocation(block));
        }
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        const p = params;
        const direction = p.growing_direction === "up" ? "Up" : "Down";
        const vineState = block.permutation.getState("betternether:vine");
        const isBlock = getBlockWithOffset(block, direction);
        if (item?.typeId === boneMeal && !isBlock) {
            const newPermutation = block.permutation.withState("betternether:vine", true);
            block.setPermutation(newPermutation);
            const offsetBlock = getBlockWithOffset(block, direction === "Up" ? "Down" : "Up");
            if (offsetBlock) {
                const offsetPermutation = offsetBlock.permutation.withState("betternether:vine", false);
                offsetBlock.setPermutation(offsetPermutation);
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
