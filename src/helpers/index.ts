import * as R from "ramda";
import SuperKoaContext, {
  PartialSuperKoaContext,
} from "../types/SuperKoaContext";

type KeyMapping = Record<string, string[]>;

export const mergeWithKeyFn =
  (keyMapping: KeyMapping) => (key: string, left: any, right: any) => {
    if (keyMapping?.array?.includes(key)) {
      right = Array.isArray(right) ? right : [right];
      left = Array.isArray(left) ? left : [left];
      return [...left, ...right] as unknown[];
    }

    const mixed = {
      ...left,
      ...right,
    };

    return mixed as unknown;
  };

export type KeysOfSuperKoaContext = keyof SuperKoaContext;

export const mergeSuperKoaContexts = (
  firstInput: PartialSuperKoaContext,
  secondInput: PartialSuperKoaContext
): SuperKoaContext => {
  const ctx: SuperKoaContext = {
    middlewares: {},
    helpers: {},
  };
  const mixedKeys = [...Object.keys(firstInput), ...Object.keys(secondInput)];
  const keySet = Array.from(new Set(mixedKeys)) as Array<KeysOfSuperKoaContext>;

  for (const key of keySet) {
    const mergedValue = R.mergeDeepWithKey<
      PartialSuperKoaContext,
      PartialSuperKoaContext
    >(mergeWithKeyFn({}), firstInput, secondInput);

    ctx[key] = mergedValue[key];
  }

  return ctx;
};
