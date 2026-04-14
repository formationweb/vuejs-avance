import type { PiniaPluginContext } from "pinia"

interface PersistOptions {
    prefix?: string
    include?: string[]
    storage?: Storage
}

type PersistOptionsReturn = {
    enabled: boolean
    storageKey: string
} | {
    enabled: boolean
}

declare module "pinia" {
  interface PiniaCustomProperties {
    $clearPersistedState?: () => void
    $persistOptions: PersistOptionsReturn
  }
}

export function piniaPersist(options: PersistOptions = {}) {
    return function ({ store }: PiniaPluginContext) {
        const {
            prefix = 'pinia-',
            include = [],
            storage = localStorage
        } = options
        const storeId = store.$id

        if (!include.includes(storeId) && include.length > 0) {
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
            $clearPersistedState: () => {
                storage.removeItem(storageKey)
            },
            $persistOptions: {
                enabled: true,
                storageKey
            }
        }
    }
}