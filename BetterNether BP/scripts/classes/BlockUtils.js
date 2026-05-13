export class BlockUtils {
    constructor(block) {
        this.block = block;
        this.location = block.location;
        this.dimension = block.dimension;
        this.tags = block.getTags();
    }
}
