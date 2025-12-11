import { world, system } from "@minecraft/server";
system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betternether:seed_block', {});
});
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        player.applyImpulse({ x: 0, y: 1, z: 0 });
    }
});
