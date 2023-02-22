import Router from "@koa/router";
import * as Koa from "koa";
import { z } from "zod";
import jsonwebtoken from "jsonwebtoken";
import { sign } from "../../api/jsonwebtoken";
import { useJWTAuth } from "../../types/useJWTAuth";

export const RefreshTokenPayload = z
  .object({
    refreshToken: z.string(),
  })
  .passthrough();

const generateRefreshTokenRouter = (options: useJWTAuth) => {
  const { secret, jsonWebTokenSignOptions } = options;
  const { apiPrefix, endpoint, signPayload, refreshPayload } =
    options.refreshTokenEndpoint;
  const router = new Router();

  router.post(`${apiPrefix}${endpoint}`, async (ctx: Koa.Context) => {
    // @TODO Customize error as Unauthorized error
    const payload: z.infer<typeof RefreshTokenPayload> =
      RefreshTokenPayload.parse(ctx.request.body);

    const signInput = await signPayload(ctx, payload);
    const token = await sign(
      signInput,
      secret as jsonwebtoken.Secret,
      jsonWebTokenSignOptions as jsonwebtoken.SignOptions
    );

    const refreshResponsePayload = await refreshPayload(ctx, payload);
    const refreshToken = await sign(
      refreshResponsePayload,
      secret as jsonwebtoken.Secret,
      jsonWebTokenSignOptions as jsonwebtoken.SignOptions
    );

    ctx.body = {
      token,
      refreshToken,
    };
  });

  return router;
};

export default generateRefreshTokenRouter;
