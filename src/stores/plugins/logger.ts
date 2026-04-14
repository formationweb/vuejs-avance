import type { PiniaPluginContext } from "pinia";

interface History {
  type: string;
  storeId: string;
  date: Date;
}

declare module "pinia" {
  interface PiniaCustomProperties {
    $history: History[];
    $clearHistory: () => void;
  }
}

interface PiniaLogOptions {
  max: number;
}

export function piniaLogger(options: PiniaLogOptions = { max: 10 }) {
  return function ({ store }: PiniaPluginContext) {
    const history: History[] = [];
    const { max } = options

    store.$subscribe(({ type, storeId }, state) => {
      history.push({
        type,
        storeId,
        date: new Date(),
      });
      if (history.length > max) {
        history.shift()
      }
      console.log(`${type}: ${storeId}`);
      console.log(state);
    });

    store.$onAction(({ name, args, store, after, onError }) => {
      const startTime = Date.now();
      console.log(`${store.$id}: ${name} action started`, args);

      after((result) => {
        console.log(
          `${store.$id}: ${name} action completed in ${Date.now() - startTime}ms`,
          result,
        );
      });

      onError((err) => {
        console.log(`${store.$id}: ${name} failed`, err);
      });
    });

    return {
      $history: history,
      $clearHistory: () => {
        history.length = 0;
        console.log(`${store.$id}: History cleared`);
      },
    };
  };
}
