// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import * as Koa from "koa";
import { SuperKoaOptions } from "../../types";
import validate from "./validate";

const useJWTAuth = (app: Koa, options: SuperKoaOptions): void => {
  if (!options.useJWTAuth) {
    return;
  }

  app.use(validate(options));
};

export default useJWTAuth;
