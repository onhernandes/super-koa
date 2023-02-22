import { RoutesWithoutAuth, useJWTAuth } from "../../types/useJWTAuth";
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
  (options: useJWTAuth) => (ctx: Koa.Context, next: Koa.Next) => {
    const {
      tokenIdentifier,
      routesWithoutAuth,
      contextResultKey,
      authRequestHeader,
      secret,
      jsonWebTokenOptions,
    } = options;

    if (!shouldValidateCurrentUrl(routesWithoutAuth, ctx.url)) {
      return next();
    }

    const headerValue =
      ctx.headers?.[authRequestHeader] ??
      ctx.headers?.[authRequestHeader.toLowerCase()];

    if (typeof headerValue !== "string") {
      // @TODO convert into proper customized error
      throw new Error("Unauthorized");
    }

    const token = headerValue.replace(tokenIdentifier, "");

    try {
      const result = verify(
        token,
        secret as jsonwebtoken.Secret,
        jsonWebTokenOptions as jsonwebtoken.VerifyOptions & {
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
