import { system, world } from "@minecraft/server";

// ==========================================
// COMPONENTS
// ==========================================
import { seedPlantComponent } from "components/SeedPlant";
import { randomPlantComponent } from "components/RandomPlant";


// ==========================================
// REGISTRATION
// ==========================================
system.beforeEvents.startup.subscribe(e => {
    // Register block components
    e.blockComponentRegistry.registerCustomComponent("betternether:growth", seedPlantComponent);
    e.blockComponentRegistry.registerCustomComponent("betternether:random", randomPlantComponent);
});