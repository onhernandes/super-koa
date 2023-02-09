// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import * as Koa from "koa";
import {
  useAppVersionHeader,
  useBasicAuth,
  useKoaBody,
  useRequestId,
  useResponseTimeHeader,
} from "./middlewares";
import { SuperKoaOptions, Options, SuperKoaFn } from "./types";

const optionsEnum = Options.keyof().enum;
type OptionsMapping = {
  [key: string]: SuperKoaFn;
};
export const optionsMapping: OptionsMapping = {
  [optionsEnum.useKoaBody]: useKoaBody,
  [optionsEnum.useResponseTimeHeader]: useResponseTimeHeader,
  [optionsEnum.useRequestId]: useRequestId,
  [optionsEnum.useAppVersionHeader]: useAppVersionHeader,
  [optionsEnum.useBasicAuth]: useBasicAuth,
};

const superKoa = (app: Koa, userOptions?: SuperKoaOptions) => {
  const options = Options.parse(userOptions || {});
  const entries = Object.entries(optionsMapping);

  for (const [key, fn] of entries) {
    if (Reflect.get(options, key)) {
      fn(app, options);
    }
  }
};

export default superKoa;
