import { Entity, world } from "@minecraft/server";

export class EntityUtils {
    static saveVelocity(entity: Entity) {
        if (!entity.isFalling) return;
        const { x, y, z } = entity.getVelocity();
        entity.setDynamicProperty("betternether:velocity", { x, y, z });
    }

    static getVelocity(entity: Entity) {
        return entity.getDynamicProperty("betternether:velocity");
    }
}