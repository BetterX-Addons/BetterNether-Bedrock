import { world, system, EquipmentSlot, ItemStack, BlockPermutation } from "@minecraft/server";
import { BlockUtils } from "../../utils/BlockUtils";
import { ItemUtils } from "../../utils/ItemUtils";
import { Vec3 } from "../../utils/vec/index";

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent("betternether:jellyfish", {
        onEntityFallOn({ block, entity }) {
            if (!entity) return;
            const growth = block.permutation.getState('betternether:growth') as number;
            if (growth < 3) return;
            BlockUtils.slimeBlock(block, entity);
        },
        onTick({ block, dimension }) {
            const growth = block.permutation.getState('betternether:growth') as number;
            if (growth == 2) {
                const isBig = Math.random() < 0.5;
                const blockUp = dimension.getBlock(Vec3.add(block.location, { x: 0, y: 1, z: 0 }));
                const grassBlock = dimension.getBlock(Vec3.add(block.location, { x: 0, y: -1, z: 0 }));
                switch (grassBlock?.typeId) {
                    case "betternether:mushroom_grass": {
                        if (isBig && blockUp?.isAir) {
                            const roots = block.permutation.withState('betternether:growth', 6);
                            const top = block.permutation.withState('betternether:growth', 7);
                            block.setPermutation(roots);
                            dimension.setBlockPermutation(blockUp.location, top);
                        } else {
                            const jelly = block.permutation.withState('betternether:growth', 3);
                            block.setPermutation(jelly);
                        }
                        break;
                    }
                    case "betternether:sepian_mushroom_grass": {
                        if (isBig && blockUp?.isAir) {
                            const roots = block.permutation.withState('betternether:growth', 10);
                            const top = block.permutation.withState('betternether:growth', 11);
                            block.setPermutation(roots);
                            dimension.setBlockPermutation(blockUp.location, top);
                        } else {
                            const jelly = block.permutation.withState('betternether:growth', 5);
                            block.setPermutation(jelly);
                        }
                        break;
                    }

                    case "betternether:other": {
                        
                        break;
                    }
                }
            }
        },
        onRandomTick({ block }) {
            const probability = Math.random();
            if (probability < 0.2) {
                BlockUtils.growSeedPlant(block, 2);
            }
        },
        onPlayerInteract({ block, player }) {
            const equipment = player.getComponent('equippable');
            const item = equipment.getEquipment(EquipmentSlot.Mainhand);
            if (item?.typeId !== "minecraft:bone_meal") return;
            ItemUtils.itemAmountModifier(equipment, item, item.amount - 1);
            BlockUtils.growSeedPlant(block, 2);
        }
    });
});