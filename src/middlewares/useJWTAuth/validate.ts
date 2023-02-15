// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { RoutesWithoutAuth, SuperKoaOptions } from "../../types";
import * as Koa from "koa";
import jsonwebtoken from "jsonwebtoken";
import { verify } from "../../api/jsonwebtoken";

export const shouldValidateCurrentUrl = (
  routesWithoutAuth: RoutesWithoutAuth,
  currentUrl: string
): boolean => {
  if (!currentUrl || !routesWithoutAuth) {
    return true;
  }

  const checks: any[] = routesWithoutAuth.map(
    (matcher: string | RegExp) => currentUrl.match(new RegExp(matcher))?.length
  );

  return !checks.includes(true);
};

const validate =
  (options: SuperKoaOptions) => (ctx: Koa.Context, next: Koa.Next) => {
    const {
      tokenIdentifier = "Bearer ",
      routesWithoutAuth = [],
      contextResultKey = "loggedJWTDecode",
      authRequestHeader = "Authorization",
    } = options.useJWTAuth;

    if (!shouldValidateCurrentUrl(routesWithoutAuth as string[], ctx.url)) {
      return next();
    }

    const headerValue =
      ctx.headers?.[authRequestHeader] ??
      ctx.headers?.[authRequestHeader.toLowerCase()];

    if (typeof headerValue !== "string") {
      // @TODO convert into proper customized error
      throw new Error("Unauthorized");
    }

    const token = headerValue.replace(tokenIdentifier as string, "");

    try {
      const result = verify(
        token,
        options.useJWTAuth.secret as jsonwebtoken.Secret,
        options.useJWTAuth.jsonWebTokenOptions as jsonwebtoken.VerifyOptions & {
          complete: true;
        }
      );
      ctx.state[contextResultKey] = result;
      return next();
    } catch (error: any) {
      // @TODO convert into proper customized error
      throw new Error("Unauthorized");
    }
  };

export default validate;
