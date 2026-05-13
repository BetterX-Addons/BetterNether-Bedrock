import { system, world } from "@minecraft/server";

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