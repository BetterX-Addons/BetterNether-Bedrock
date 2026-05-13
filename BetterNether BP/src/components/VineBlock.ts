import { Block, BlockCustomComponent, Direction, EquipmentSlot, ItemStack, Vector3 } from "@minecraft/server";

const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';

/*
# Vine without roots (betternether:vine) -> State with 2 values: 0 = bottom vine, 1 = middle vine
# Vine with roots (betternether:vine) -> State with 3 values: 0 = bottom vine, 1 = middle vine, 2 = top vine

- Vines with roots, if they grow, the new vine will be the top vine, the current vine will be the middle vine and if there is a vine below, it will become the bottom vine
- Vines without roots, if they grow, the new vine will be the middle vine and the current vine will be the bottom vine, if there is a vine below, it will remain unchanged
*/

export const vineComponent: BlockCustomComponent = {
    onRandomTick({ block, dimension }, { params }) {
        const p = params as { growing_direction: "up" | "down" };
        const direction = p.growing_direction === "up" ? "Up" : "Down";
        const permutation = block.permutation;
        const vineState = permutation.getState("betternether:vine") as number; // 0, 1, or 2
        const isBlock = getBlockWithOffset(block, direction);
        if (!isBlock) {
            if (Math.random() < 0.1) return;
            // Si no hay bloque en la dirección de crecimiento, crece, si lo hay, no hace nada
            // La parte que crece, se le añade el permutation betternether:vine en true que seria el top vine
            // La parte anterior, se le añade el permutation betternether:vine en false que seria el bottom vine
            const newPermutation = permutation.withState("betternether:vine", vineState + 1);
            block.setPermutation(newPermutation);
            const offsetBlock = getBlockWithOffset(block, direction === "Up" ? "Down" : "Up");
            if (offsetBlock) {
                const offsetPermutation = offsetBlock.permutation.withState("betternether:vine", vineState);
                offsetBlock.setPermutation(offsetPermutation);
            }
            dimension.spawnParticle(growthParticle, particleLocation(block));
        }
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        const p = params as { growing_direction: "up" | "down" };
        const direction = p.growing_direction === "up" ? "Up" : "Down";
        const vineState = block.permutation.getState("betternether:vine") as number;
        const isBlock = getBlockWithOffset(block, direction);
        if (item?.typeId === boneMeal && !isBlock) {
            const newPermutation = block.permutation.withState("betternether:vine", vineState + 1);
            block.setPermutation(newPermutation);
            const offsetBlock = getBlockWithOffset(block, direction === "Up" ? "Down" : "Up");
            if (offsetBlock) {
                const offsetPermutation = offsetBlock.permutation.withState("betternether:vine", vineState);
                offsetBlock.setPermutation(offsetPermutation);
            }
            item.amount -= 1;
            equipment?.setEquipment(EquipmentSlot.Mainhand, item);
            dimension.spawnParticle(growthParticle, particleLocation(block));
        }
    }
};

function particleLocation(block: Block): Vector3 {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}

function getBlockWithOffset(block: Block, direction: "Up" | "Down"): Block | undefined {
    if (direction === "Up") {
        return block.above();
    } else {
        return block.below();
    }
}