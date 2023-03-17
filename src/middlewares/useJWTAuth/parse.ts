import { RoutesWithoutAuth, useJWTAuth } from "../../types/useJWTAuth";
import * as Koa from "koa";
import { Unauthorized } from "../../errors";
import { parse as jwtParse } from "./jwt";

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

const parse =
  (options: useJWTAuth): Koa.Middleware =>
  (ctx, next) => {
    const {
      tokenIdentifier,
      routesWithoutAuth,
      contextResultKey,
      authRequestHeader,
    } = options;

    if (!shouldValidateCurrentUrl(routesWithoutAuth, ctx.url)) {
      return next();
    }

    const headerValue =
      ctx.headers?.[authRequestHeader] ??
      ctx.headers?.[authRequestHeader.toLowerCase()];

    if (typeof headerValue !== "string") {
      throw new Unauthorized();
    }

    const token = headerValue.replace(tokenIdentifier, "");

    try {
      const result = jwtParse(options)(token);
      ctx.state[contextResultKey] = result;
      return next();
    } catch (error: any) {
      throw new Unauthorized();
    }
  };

export default parse;
