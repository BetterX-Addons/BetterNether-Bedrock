import { EquipmentSlot, world, system } from "@minecraft/server";
const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
export const grassBlockComponent = {};
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, blockFace, player, isFirstEvent, itemStack } = event;
    if (!isFirstEvent || !block || !player)
        return;
    let shouldCancel = false;
    const comp = block.getComponent("betternether:bone_meal_vegetation");
    if (!comp)
        return;
    const p = comp.customComponentParameters.params;
    const feature = p.feature;
    const equipment = player?.getComponent('equippable');
    const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
    const fixedLocation = getFixedLocation(block);
    if (item?.typeId === boneMeal && feature) {
        shouldCancel = true;
        system.runTimeout(() => {
            const dimension = block.dimension;
            dimension.placeFeature(feature, block.location);
            item.amount -= 1;
            equipment?.setEquipment(EquipmentSlot.Mainhand, item);
            dimension.spawnParticle(growthParticle, fixedLocation);
        });
    }
    if (shouldCancel)
        event.cancel = true;
});
function getFixedLocation(block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}
