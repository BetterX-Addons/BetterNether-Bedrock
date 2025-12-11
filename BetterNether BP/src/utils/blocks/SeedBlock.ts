import { world, Block, Dimension, Vector3, BlockPermutation } from "@minecraft/server";
import * as vec from "../vec/index";

export class SeedBlock {
    private block: Block;
    private location: Vector3;
    private dimension: Dimension;
    private permutation: BlockPermutation;
    private particle: string;
    constructor(block: Block) {
        this.block = block;
        this.location = block.location;
        this.dimension = block.dimension;
        this.permutation = block.permutation;
        this.particle = "minecraft:crop_growth_emitter";
    }

    public growth(hasStructure: boolean, structureId?: string, offset?: Vector3) {
        const stateId = "betternether:growth";
        const maxStateTagId = "betternether:maxstate:";
        const tags = this.block.getTags();
        const maxState = parseInt(tags.find(t => t.startsWith(maxStateTagId))?.split(":")[2] || "0");
        const currentState = this.permutation.getState(stateId) as number;
        this.dimension.spawnParticle(this.particle, this.location);
        if (currentState < maxState) {
            this.permutation = this.permutation.withState(stateId, currentState + 1);
        } else if (hasStructure) {
            this.spawnStructure(structureId, offset);
        }
    }

    public spawnStructure(structureId: string, offset: Vector3) {
        world.structureManager.place(structureId, this.dimension, vec.Vec3.add(this.location, offset));
    }
}