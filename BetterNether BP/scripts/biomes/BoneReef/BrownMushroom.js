import { system } from "@minecraft/server";
import { BlockUtils } from "../../utils/BlockUtils";
system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent("betternether:brown_mushroom", {
        onPlace: (e) => {
            const { block, dimension } = e;
            BlockUtils.randomState(block, "betternether:random", 4);
        }
    });
});
