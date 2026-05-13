import { Block, BlockCustomComponent, EquipmentSlot, ItemStack, Vector3 } from "@minecraft/server";

const boneMeal = 'minecraft:bone_meal';

export const randomPlantComponent: BlockCustomComponent = {
    onPlace({ block }, { params }) {
        const p = params as { max_states: number };
        const maxStates = p.max_states;
        const permutation = block.permutation;
        setVariant(block, getRandomVariant(block, maxStates));
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
        const p = params as { max_states: number };
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        if (item?.typeId === boneMeal) {
            dimension.spawnItem(new ItemStack(block.typeId), getFixedLocation(block));
            item.amount -= 1;
        }
    }
};

function getRandomVariant(block: Block, maxStates: number): number {
    // Implement logic to get a random variant within the allowed range (0, maxStates)
    return Math.floor(Math.random() * maxStates);
}

function setVariant(block: Block, random: number) {
    const permutation = block.permutation;
    const newVariant = permutation.withState("betternether:random", random);
    block.setPermutation(newVariant);
}

function getFixedLocation(block: Block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y + 1, z: loc.z + 0.5 };
}