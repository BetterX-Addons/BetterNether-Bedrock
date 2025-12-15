import { Block, Direction, EntityEquippableComponent, ItemStack, Vector3, world } from "@minecraft/server";
import { Vec3 } from "./vec/index";
import { ItemUtils } from "./ItemUtils";

export class BlockUtils {
    static randomState(block: Block, state: string, maxStates: number) {
        const random = Math.floor(Math.random() * maxStates);
        const perm = block.permutation.withState(state, random);
        block.setPermutation(perm);
    }

    static growSeedPlant(block: Block, maxSize: number, spawnStructure: boolean = false, structureName?: string) {
        const growth = block.permutation.getState("betternether:growth") as number;
        if (growth >= maxSize) return;
        const perm = block.permutation.withState("betternether:growth", growth + 1);
        BlockUtils.spawnParticles(block, "minecraft:crop_growth_emitter");
        block.setPermutation(perm);
        if (spawnStructure && structureName) {
            world.structureManager.place(structureName, block.dimension, block.location);
        }
    }

    static growPlantDirection(block: Block, direction: "Up" | "Down" | Direction) {
        if (direction === Direction.Up) {
            let topBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: 1, z: 0 }));
            while (topBlock.typeId !== "minecraft:air") {
                topBlock = block.dimension.getBlock(Vec3.add(topBlock.location, { x: 0, y: 1, z: 0 }));
            }
            if (topBlock.typeId === "minecraft:air") {
                topBlock.dimension.setBlockType(topBlock.location, block.typeId);
                BlockUtils.spawnParticles(topBlock, "minecraft:crop_growth_emitter");
            }
        }
        else {
            let bottomBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: -1, z: 0 }));
            while (bottomBlock.typeId !== "minecraft:air") {
                bottomBlock = block.dimension.getBlock(Vec3.add(bottomBlock.location, { x: 0, y: -1, z: 0 }));
            }
            if (bottomBlock.typeId === "minecraft:air") {
                bottomBlock.dimension.setBlockType(bottomBlock.location, block.typeId);
                BlockUtils.spawnParticles(bottomBlock, "minecraft:crop_growth_emitter");
            }
        }
    }

    static growPlantDirectionWithBoneMeal(block: Block, direction: "Up" | "Down" | Direction, item: ItemStack, equipment: EntityEquippableComponent) {
        if (item.typeId !== "minecraft:bone_meal") return;
        ItemUtils.itemAmountModifier(equipment, item, item.amount - 1);
        BlockUtils.growPlantDirection(block, direction);
    }

    static getFluids(block: Block, fluidType: string) {
        const downBlock = block.dimension.getBlockBelow(block.location);
        const sides = [
            { x: 1, y: 0, z: 0 },
            { x: -1, y: 0, z: 0 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: -1 },
        ]
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
    static destroyWithoutFluidsNearby(block: Block, grassBlocks: string[]) {
        const downBlock = block.dimension.getBlock(Vec3.add(block.location, { x: 0, y: -1, z: 0 }));
        if (grassBlocks.includes(downBlock.typeId) || block.typeId !== downBlock.typeId) {
            const hasFluids = BlockUtils.getFluids(downBlock, "minecraft:lava");
            if (!hasFluids) BlockUtils.destroyBlock(block);
        }
    }

    static destroyBlock(block: Block) {
        const { x, y, z } = block.location;
        block.dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`);
    }

    static spawnParticles(block: Block, particle: string) {
        const fixedLocation = Vec3.add(block.location, { x: 0.5, y: 0.5, z: 0.5 });
        block.dimension.spawnParticle(particle, fixedLocation);
    }
}