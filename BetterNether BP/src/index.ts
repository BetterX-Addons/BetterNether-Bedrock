import { world, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betternether:seed_block', {
        
    });
});