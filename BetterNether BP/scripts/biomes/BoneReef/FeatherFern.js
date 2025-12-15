import { system, EquipmentSlot } from "@minecraft/server";
import { BlockUtils } from "../../utils/BlockUtils";
import { ItemUtils } from "../../utils/ItemUtils";
system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent("betternether:feather_fern", {
        onRandomTick({ block }) {
            const probability = Math.random();
            if (probability < 0.2) {
                BlockUtils.growSeedPlant(block, 3);
            }
        },
        onPlayerInteract({ block, player }) {
            const equipment = player.getComponent('equippable');
            const item = equipment.getEquipment(EquipmentSlot.Mainhand);
            if (item?.typeId !== "minecraft:bone_meal")
                return;
            ItemUtils.itemAmountModifier(equipment, item, item.amount - 1);
            BlockUtils.growSeedPlant(block, 3);
        }
    });
});
