import { world } from "@minecraft/server";
export class BlockUtils {
    static randomState(block, state, maxStates) {
        const random = Math.floor(Math.random() * maxStates);
        const perm = block.permutation.withState(state, random);
        block.setPermutation(perm);
    }
    static growSeedPlant(block, item, maxSize, spawnStructure = false, structureName) {
        const growth = block.permutation.getState("betternether:growth");
        if (item.typeId !== "minecraft:bone_meal")
            return;
        if (!growth)
            return;
        if (growth >= maxSize)
            return;
        const perm = block.permutation.withState("betternether:growth", growth + 1);
        block.dimension.playSound("minecraft:crop_growth_emitter", block.location);
        block.setPermutation(perm);
        if (spawnStructure && structureName) {
            world.structureManager.place(structureName, block.dimension, block.location);
        }
    }
    static spawnParticles(block, particle) {
        block.dimension.spawnParticle(particle, block.location);
    }
}
