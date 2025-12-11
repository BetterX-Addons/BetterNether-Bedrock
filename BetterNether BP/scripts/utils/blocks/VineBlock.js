class VineBlock {
    constructor(block) {
        this.block = block;
        this.location = block.location;
        this.dimension = block.dimension;
        this.permutation = block.permutation;
        this.particle = "minecraft:crop_growth_emitter";
    }
    // If up, it grows up, else it grows down
    growth(up) {
        const stateId = "betternether:vine_growth";
        const maxSizeTagId = "betternether:maxsize:";
        const tags = this.block.getTags();
        const maxSize = parseInt(tags.find(t => t.startsWith(maxSizeTagId))?.split(":")[2] || "0");
        /*
            Size explanation
            usually [0, 1] or [0, 1, 2]
            0 - vine roots/bottom
            1 - vine top or middle
            2 - vine top
            This depends on what's the max size of the vine
            If max size's 1, then it only have roots and top vine
            If max size's 2, then it have roots, mid and top vine
        */
        const currentSize = this.permutation.getState(stateId);
        this.dimension.spawnParticle(this.particle, this.location);
        if (currentSize < maxSize) {
            this.permutation = this.permutation.withState(stateId, currentSize + 1);
        }
    }
}
export {};
