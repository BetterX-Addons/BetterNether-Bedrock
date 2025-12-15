import { world, system } from "@minecraft/server";
import { BlockUtils } from "../../utils/BlockUtils";

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent("betternether:sepian_bone_grass", {
        onPlace: (e) => {
            const { block, dimension } = e;
            BlockUtils.randomState(block, "betternether:variants", 5);
        }
    });
});