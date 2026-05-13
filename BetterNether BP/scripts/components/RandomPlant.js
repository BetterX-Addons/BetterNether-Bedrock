import { EquipmentSlot, ItemStack } from "@minecraft/server";
const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
export const randomPlantComponent = {
    beforeOnPlayerPlace(e, { params }) {
        const { block } = e;
        const permutation = e.permutationToPlace;
        const p = params;
        const maxStates = p.max_states;
        const randomVariant = getRandomVariant(block, maxStates);
        const newPermutation = permutation.withState('betternether:random', randomVariant);
        e.permutationToPlace = newPermutation;
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const p = params;
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        if (item?.typeId === boneMeal) {
            dimension.spawnItem(new ItemStack(block.typeId), getFixedLocation(block));
            item.amount -= 1;
            equipment?.setEquipment(EquipmentSlot.Mainhand, item);
            dimension.spawnParticle(growthParticle, particleLocation(block));
        }
    }
};
function getRandomVariant(block, maxStates) {
    // Implement logic to get a random variant within the allowed range (0, maxStates)
    return Math.floor(Math.random() * maxStates);
}
function getFixedLocation(block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y + 1, z: loc.z + 0.5 };
}
function particleLocation(block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}
