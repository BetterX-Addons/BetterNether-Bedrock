import { world, system } from "@minecraft/server";

// BetterNether
import { EntityUtils } from "utils/EntityUtils";
import "./Biomes";

system.runInterval(() => {
    const dimensions = [ "overworld", "nether", "the_end" ];
    for (const dimension of dimensions) {
        for (const entity of world.getDimension(dimension).getEntities()) {
            // Utils
            EntityUtils.saveVelocity(entity);
        }
    }
})

// Cuando el evento sea estable, hacer que cancele el daño por caida en los jellyfish
// world.beforeEvents.entityHurt.subscribe