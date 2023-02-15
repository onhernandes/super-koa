// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { RoutesWithoutAuth, SuperKoaOptions } from "../../types";
import * as Koa from "koa";

export const shouldValidateCurrentUrl = (
  routesWithoutAuth: RoutesWithoutAuth,
  currentUrl: string
): boolean => {
  if (!currentUrl || !routesWithoutAuth) {
    return true;
  }

  routesWithoutAuth = Array.isArray(routesWithoutAuth)
    ? routesWithoutAuth
    : [routesWithoutAuth];
  const checks: any[] = routesWithoutAuth.map(
    (matcher: string | RegExp) => currentUrl.match(matcher)?.length
  );

  return !checks.includes(true);
};

const validate =
  (options: SuperKoaOptions) => (ctx: Koa.Context, next: Koa.Next) => {
    if (!options.useJWTAuth.enable) {
      return next();
    }

    if (
      options.useJWTAuth.enable &&
      options.useJWTAuth.routesWithoutAuth &&
      !shouldValidateCurrentUrl(options.useJWTAuth.routesWithoutAuth, ctx.url)
    ) {
      return next();
    }

    const headerValue = 
  };

export default validate;
