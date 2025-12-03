import type { PiniaPluginContext } from "pinia"

type PersistOptionsReturn = {
    enabled: boolean
    storageKey: string
} | {
    enabled: boolean
}

declare module 'pinia' {
    interface PiniaCustomProperties {
        $persistOptions: PersistOptionsReturn
        $clearPersistedState?: () => void
    }
}

interface PersistOptions {
    prefix?: string
    include?: string[]
    storage?: Storage
}

export function piniaPersist(options: PersistOptions = {}) {
    return function({ store }: PiniaPluginContext) {
        const {
            include = [],
            prefix = 'pinia-',
            storage = localStorage
        } = options
        const storeId = store.$id

        if (!include.includes(storeId)) {
            return {
                $persistOptions: {
                    enabled: false
                }
            }
        }

        const storageKey = prefix + storeId
        const persistedState = storage.getItem(storageKey)
        if (persistedState) {
            store.$patch(JSON.parse(persistedState))
        }

        store.$subscribe((_, state) => {
            storage.setItem(storageKey, JSON.stringify(state))
        })

        return {
            $persistOptions: {
                enabled: true,
                storageKey
            },
            $clearPersistedState: () => {
                storage.removeItem(storageKey)
            }
        }
    }
}