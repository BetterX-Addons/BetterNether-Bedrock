import { EquipmentSlot } from "@minecraft/server";
const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';
export const grassBlockComponent = {
    onPlayerInteract({ block, player, dimension }, { params }) {
        const p = params;
        const feature = p.feature;
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        const fixedLocation = getFixedLocation(block);
        if (item?.typeId === boneMeal && feature) {
            dimension.placeFeature(feature, block.location);
            item.amount -= 1;
            equipment?.setEquipment(EquipmentSlot.Mainhand, item);
            dimension.spawnParticle(growthParticle, fixedLocation);
        }
    }
};
function getFixedLocation(block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}
