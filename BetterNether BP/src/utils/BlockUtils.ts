import { Block, ItemStack, world } from "@minecraft/server";

export class BlockUtils {
    static randomState(block: Block, state: string, maxStates: number) {
        const random = Math.floor(Math.random() * maxStates);
        const perm = block.permutation.withState(state, random);
        block.setPermutation(perm);
    }

    static growSeedPlant(block: Block, item: ItemStack, maxSize: number, spawnStructure: boolean = false, structureName?: string) {
        const growth = block.permutation.getState("betternether:growth") as number;
        if (item.typeId !== "minecraft:bone_meal") return;
        if (!growth) return;
        if (growth >= maxSize) return;
        const perm = block.permutation.withState("betternether:growth", growth + 1);
        block.dimension.playSound("minecraft:crop_growth_emitter", block.location);
        block.setPermutation(perm);
        if (spawnStructure && structureName) {
            world.structureManager.place(structureName, block.dimension, block.location);
        }
    }

    static spawnParticles(block: Block, particle: string) {
        block.dimension.spawnParticle(particle, block.location);
    }
}