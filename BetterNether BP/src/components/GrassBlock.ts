import { Block, BlockCustomComponent, EquipmentSlot, Vector3, world, system } from "@minecraft/server";

const boneMeal = 'minecraft:bone_meal';
const growthParticle = 'minecraft:crop_growth_emitter';

export const grassBlockComponent: BlockCustomComponent = {
    
};

// Prevent swing animation on custom blocks without using bone meal.
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, player, isFirstEvent } = event;
    
    if (!isFirstEvent || !block || !player) return;

    let shouldCancel = false;
    
    const comp = block.getComponent("betternether:bone_meal_vegetation");
    if(!comp) return;
    const p = comp.customComponentParameters.params as { feature: string };

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
            for (let i = 0; i < 5; i++) {
                const offsetX = (Math.random() - 0.5) * 0.5;
                const offsetZ = (Math.random() - 0.5) * 0.5;
                dimension.spawnParticle(growthParticle, { x: fixedLocation.x + offsetX, y: fixedLocation.y + 0.5, z: fixedLocation.z + offsetZ });
            }
            dimension.spawnParticle(growthParticle, fixedLocation);
        });

    }
    
    if (shouldCancel) event.cancel = true;
});

function getFixedLocation(block: Block) {
    const loc = block.location;
    return { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
}