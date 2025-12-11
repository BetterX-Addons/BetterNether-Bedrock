import { world } from "@minecraft/server";
import * as vec from "../vec/index";
export class SeedBlock {
    constructor(block) {
        this.block = block;
        this.location = block.location;
        this.dimension = block.dimension;
        this.permutation = block.permutation;
        this.particle = "minecraft:crop_growth_emitter";
    }
    growth(hasStructure, structureId, offset) {
        const stateId = "betternether:growth";
        const maxStateTagId = "betternether:maxstate:";
        const tags = this.block.getTags();
        const maxState = parseInt(tags.find(t => t.startsWith(maxStateTagId))?.split(":")[2] || "0");
        const currentState = this.permutation.getState(stateId);
        this.dimension.spawnParticle(this.particle, this.location);
        if (currentState < maxState) {
            this.permutation = this.permutation.withState(stateId, currentState + 1);
        }
        else if (hasStructure) {
            this.spawnStructure(structureId, offset);
        }
    }
    spawnStructure(structureId, offset) {
        world.structureManager.place(structureId, this.dimension, vec.Vec3.add(this.location, offset));
    }
}
