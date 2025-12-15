import { ItemStack, EquipmentSlot } from "@minecraft/server";
export class ItemUtils {
    static itemAmountModifier(equipment, item, newAmount) {
        if (item.amount == 1)
            equipment.setEquipment(EquipmentSlot.Mainhand, undefined);
        else
            equipment.setEquipment(EquipmentSlot.Mainhand, new ItemStack(item.typeId, newAmount));
    }
}
