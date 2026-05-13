import { Block, BlockCustomComponent, EquipmentSlot, Vector3, world } from "@minecraft/server";

const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';

export const grassBlockComponent: BlockCustomComponent = {
    onPlayerInteract({ block, player, dimension }, { params }) {
        const p = params as { feature: string };
        const feature = p.feature;
        const equipment = player?.getComponent('equippable');
        const item = equipment?.getEquipment(EquipmentSlot.Mainhand);
        const fixedLocation = getFixedLocation(block);
        if (item?.typeId === boneMeal && feature) {
            dimension.placeFeature(feature, block.location);
            item.amount -= 1;
            equipment?.setEquipment(EquipmentSlot.Mainhand, item);
            // spawn particles in random positions and in the center of the block
            for (let i = 0; i < 10; i++) {
                const offsetX = (Math.random() - 0.5) * 0.5;
                const offsetZ = (Math.random() - 0.5) * 0.5;
                dimension.spawnParticle(growthParticle, { x: fixedLocation.x + offsetX, y: fixedLocation.y + 0.5, z: fixedLocation.z + offsetZ });
            }
            dimension.spawnParticle(growthParticle, fixedLocation);
        }
    }
};

function getFixedLocation(block: Block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}