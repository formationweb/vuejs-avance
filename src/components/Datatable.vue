<template>
    <div v-if="items.length > 0">
        <table>
            <thead>
               <tr>
                    <th v-for="column in columns" :key="column.key">
                        {{ column.label }}
                    </th>
               </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <td v-for="column in columns" :key="column.key">
                        <slot :name="column.key" :item :index>
                            {{ item[column.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="slots.footer">
                <tr>
                    <td>
                        <slot name="footer"></slot>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div v-else>
        <slot name="empty" :columns>
            Pas de données
        </slot>
    </div>
</template>

<script setup lang="ts" generic="T extends { id: number } & Record<string, any>">
type Column = { key: string, label: string }

defineProps<{
    columns: Column[]
    items: T[]
}>()

type SlotProps = {
    empty: (props: { columns: Column[] }) => void
    footer: () => void
}

type DynamicSlotProps = {
    [key: string]: (props: { item: T, index: number }) => void
}

const slots = defineSlots<SlotProps & DynamicSlotProps>()
</script>