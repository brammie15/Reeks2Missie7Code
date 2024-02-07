import { system } from "@minecraft/server";

export async function delayedRun(callback: Function, delay: number) {
  let timer = system.runTimeout(() => {
    callback();
    system.clearRun(timer);
  }, delay);
}

export function delay(t: number) {
  return new Promise((r: any) => {
    system.runTimeout(r, t);
  });
}
