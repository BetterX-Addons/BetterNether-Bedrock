import { EntityEquippableComponent, ItemStack, EquipmentSlot } from "@minecraft/server";

export class ItemUtils {
    static itemAmountModifier(equipment: EntityEquippableComponent, item: ItemStack, newAmount: number) {
       if (item.amount == 1)
            equipment.setEquipment(EquipmentSlot.Mainhand, undefined);
        else
            equipment.setEquipment(EquipmentSlot.Mainhand, new ItemStack(item.typeId, newAmount));
    }
}