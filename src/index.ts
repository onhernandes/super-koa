// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import * as Koa from "koa";
import { useKoaBody } from "./middlewares";
import { SuperKoaOptions, Options, SuperKoaFn } from "./types";

const optionsEnum = Options.keyof().enum;
type OptionsMapping = {
  [key: string]: { fn: SuperKoaFn; customOptionsProp?: string };
};
export const optionsMapping: OptionsMapping = {
  [optionsEnum.useKoaBody]: {
    fn: useKoaBody,
    customOptionsProp: optionsEnum.koaBodyOptions,
  },
};

const superKoa = (app: Koa, userOptions: SuperKoaOptions = {}) => {
  const options = Options.parse(userOptions);
  const entries = Object.entries(optionsMapping);

  for (const [key, { fn, customOptionsProp }] of entries) {
    if (Reflect.has(optionsMapping, key)) {
      const customOptions = customOptionsProp
        ? Reflect.get(options, customOptionsProp)
        : {};
      fn(app, customOptions);
    }
  }
};

export default superKoa;
