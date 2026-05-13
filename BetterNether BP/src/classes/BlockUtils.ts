import { Block, Dimension, Entity, Player, Vector3 } from "@minecraft/server";

export class BlockUtils {
    private block: Block;
    private location: Vector3;
    private dimension: Dimension;
    private tags: string[];
    constructor(block: Block) {
        this.block = block;
        this.location = block.location;
        this.dimension = block.dimension;
        this.tags = block.getTags();
    }

    
}