import { Direction, world } from "@minecraft/server";
import { Vec3 } from "./vec/index";
import { ItemUtils } from "./ItemUtils";
import { EntityUtils } from "./EntityUtils";
export class BlockUtils {
    static randomState(block, state, maxStates) {
        const random = Math.floor(Math.random() * maxStates);
        const perm = block.permutation.withState(state, random);
        block.setPermutation(perm);
    }
    static growSeedPlant(block, maxSize, spawnStructure = false, structureName) {
        const growth = block.permutation.getState("betternether:growth");
        if (growth >= maxSize)
            return;
        const perm = block.permutation.withState("betternether:growth", growth + 1);
        BlockUtils.spawnParticles(block, "minecraft:crop_growth_emitter");
        block.setPermutation(perm);
        if (spawnStructure && structureName) {
            world.structureManager.place(structureName, block.dimension, block.location);
        }
    }
    static growPlantDirection(block, direction) {
        if (direction === Direction.Up) {
            let topBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: 1, z: 0 }));
            while (topBlock?.typeId !== "minecraft:air") {
                topBlock = block.dimension.getBlock(Vec3.add(topBlock.location, { x: 0, y: 1, z: 0 }));
            }
            if (topBlock?.typeId === "minecraft:air") {
                topBlock.dimension.setBlockType(topBlock.location, block.typeId);
                BlockUtils.spawnParticles(topBlock, "minecraft:crop_growth_emitter");
            }
        }
        else {
            let bottomBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: -1, z: 0 }));
            while (bottomBlock?.typeId !== "minecraft:air") {
                bottomBlock = block.dimension.getBlock(Vec3.add(bottomBlock.location, { x: 0, y: -1, z: 0 }));
            }
            if (bottomBlock?.typeId === "minecraft:air") {
                bottomBlock.dimension.setBlockType(bottomBlock.location, block.typeId);
                BlockUtils.spawnParticles(bottomBlock, "minecraft:crop_growth_emitter");
            }
        }
    }
    static growPlantDirectionWithBoneMeal(block, direction, item, equipment) {
        if (item.typeId !== "minecraft:bone_meal")
            return;
        ItemUtils.itemAmountModifier(equipment, item, item.amount - 1);
        BlockUtils.growPlantDirection(block, direction);
    }
    static getFluids(block, fluidType) {
        const downBlock = block.dimension.getBlockBelow(block.location);
        const sides = [
            { x: 1, y: 0, z: 0 },
            { x: -1, y: 0, z: 0 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: -1 },
        ];
        for (const side of sides) {
            const sideLocation = Vec3.add(downBlock.location, side);
            const sideBlock = downBlock.dimension.getBlock(sideLocation);
            if (sideBlock.typeId === fluidType) {
                return true;
            }
        }
        return false;
    }
    // similar a la caña de azucar de minecraft
    static destroyWithoutFluidsNearby(block, grassBlocks) {
        const downBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: -1, z: 0 }));
        if (grassBlocks.includes(downBlock.typeId) || block.typeId !== downBlock.typeId) {
            const hasFluids = BlockUtils.getFluids(downBlock, "minecraft:lava");
            if (!hasFluids)
                BlockUtils.destroyBlock(block);
        }
    }
    static slimeBlock(block, entity) {
        const velY = Math.abs(EntityUtils.getVelocity(entity)?.y);
        entity.applyImpulse({ x: 0, y: velY, z: 0 });
    }
    static destroyBlock(block) {
        const { x, y, z } = block.location;
        block.dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`);
    }
    static spawnParticles(block, particle) {
        const fixedLocation = Vec3.add(block.location, { x: 0.5, y: 0.5, z: 0.5 });
        block.dimension.spawnParticle(particle, fixedLocation);
    }
}
