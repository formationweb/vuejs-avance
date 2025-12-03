import Text from "./Text.vue";

export const fieldRegistry: any = { 
    text: Text 
} as const
 
export type FieldRegistry = typeof fieldRegistry