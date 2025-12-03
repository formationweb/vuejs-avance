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
                <tr v-for="(item, index) in items" :key="item">
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

<script setup lang="ts">
type Column = { key: string, label: string }

defineProps<{
    columns: Column[]
    items: any[]
}>()

type SlotProps = {
    empty: (props: { columns: Column[] }) => void
    footer: () => void
}

type DynamicSlotProps = {
    [key: string]: (props: { item: any, index: number }) => void
}

const slots = defineSlots<SlotProps & DynamicSlotProps>()
</script>