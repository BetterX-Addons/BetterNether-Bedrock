import { system, world } from "@minecraft/server";

// ==========================================
// CONSTANTS
// ==========================================
import { GRASS_BLOCKS } from "constants/GrassBlocks";

// ==========================================
// COMPONENTS
// ==========================================
import { seedPlantComponent } from "components/SeedPlant";
import { randomPlantComponent } from "components/RandomPlant";
import { grassBlockComponent } from "components/GrassBlock";
import { vineComponent } from "components/VineBlock";

// ==========================================
// REGISTRATION
// ==========================================
system.beforeEvents.startup.subscribe(e => {
    // Register block components
    e.blockComponentRegistry.registerCustomComponent("betternether:growth", seedPlantComponent);
    e.blockComponentRegistry.registerCustomComponent("betternether:random", randomPlantComponent);
    e.blockComponentRegistry.registerCustomComponent("betternether:bone_meal_vegetation", grassBlockComponent);
    e.blockComponentRegistry.registerCustomComponent("betternether:vine", vineComponent);
});

// ==========================================
// WORLD EVENTS
// ==========================================
world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { player, block, itemStack } = e;
    // Prevent to interact with grass blocks without bone meal
    if (GRASS_BLOCKS.includes(block.typeId) && itemStack?.typeId !== "minecraft:bone_meal") {
        e.cancel = true;
    }
});