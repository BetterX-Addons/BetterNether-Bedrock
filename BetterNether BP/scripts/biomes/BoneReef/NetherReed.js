import { system, EquipmentSlot, Direction } from "@minecraft/server";
import { Vec3 } from "../../utils/vec/index";
import { BlockUtils } from "../../utils/BlockUtils";
system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent("betternether:nether_reed", {
        onTick({ block }) {
            BlockUtils.destroyWithoutFluidsNearby(block, ["betternether:mushroom_grass", "betternether:sepian_mushroom_grass"]);
            fixTexture(block);
        },
        onRandomTick({ block }) {
            const probability = Math.random();
            if (probability < 0.4) {
                BlockUtils.growPlantDirection(block, "Up");
            }
        },
        beforeOnPlayerPlace: (e) => {
            const { block, player } = e;
            const blockDown = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: -1, z: 0 }));
            if (blockDown.typeId === 'betternether:nether_reed')
                return;
            const hasFluids = BlockUtils.getFluids(block, "minecraft:lava");
            if (!hasFluids)
                e.cancel = true;
        },
        onPlayerInteract: (e) => {
            const { block, player } = e;
            const equipment = player.getComponent("equippable");
            const item = equipment.getEquipment(EquipmentSlot.Mainhand);
            if (!item)
                return;
            BlockUtils.growPlantDirectionWithBoneMeal(block, Direction.Up, item);
        },
    });
});
function fixTexture(block) {
    if (block.typeId === 'minecraft:air')
        return;
    const upBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: 1, z: 0 }));
    if (upBlock.typeId === 'minecraft:air') {
        const topBlock = block.permutation.withState("betternether:top", true);
        block.setPermutation(topBlock);
    }
    else {
        const bottomBlock = block.permutation.withState("betternether:top", false);
        block.setPermutation(bottomBlock);
    }
}
