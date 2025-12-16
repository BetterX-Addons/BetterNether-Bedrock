export class EntityUtils {
    static saveVelocity(entity) {
        if (!entity.isFalling)
            return;
        const { x, y, z } = entity.getVelocity();
        entity.setDynamicProperty("betternether:velocity", { x, y, z });
    }
    static getVelocity(entity) {
        return entity.getDynamicProperty("betternether:velocity");
    }
}
