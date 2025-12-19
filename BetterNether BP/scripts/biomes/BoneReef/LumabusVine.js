import { system, EquipmentSlot, Direction } from "@minecraft/server";
import { Vec3 } from "../../utils/vec/index";
import { BlockUtils } from "../../utils/BlockUtils";
system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent("betternether:lumabus_vine", {
        onTick({ block }) {
        },
        onRandomTick({ block }) {
            const probability = Math.random();
            if (probability < 0.1) {
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
            BlockUtils.growPlantDirectionWithBoneMeal(block, Direction.Up, item, equipment);
        },
    });
});
