// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import Router from "@koa/router";
import * as Koa from "koa";
import { z } from "zod";
import jsonwebtoken from "jsonwebtoken";
import { sign } from "../../api/jsonwebtoken";
import { ObjectType, SignPayloadFn, SuperKoaOptions } from "../../types";

export const RefreshTokenPayload = z.object({
  refreshToken: z.string(),
});

const generateRefreshTokenRouter = ({
  useJWTAuth,
  jsonWebTokenSignOptions: options,
}: SuperKoaOptions) => {
  const {
    apiPrefix,
    endpoint,
    signPayload,
    refreshPayload,
  }: {
    apiPrefix: string;
    endpoint: string;
    signPayload: SignPayloadFn;
    refreshPayload: SignPayloadFn;
  } = useJWTAuth.refreshTokenEndpoint;
  const router = new Router();

  router.post(`${apiPrefix}${endpoint}`, async (ctx: Koa.Context) => {
    // @TODO Customize error as Unauthorized error
    const payload: z.infer<typeof RefreshTokenPayload> =
      RefreshTokenPayload.parse(ctx.request.body);

    const signInput = await signPayload(ctx, payload);
    const token = await sign(
      signInput,
      useJWTAuth.secret as jsonwebtoken.Secret,
      options as jsonwebtoken.SignOptions
    );

    const refreshResponsePayload = await refreshPayload(ctx, payload);
    const refreshToken = await sign(
      refreshResponsePayload,
      useJWTAuth.secret as jsonwebtoken.Secret,
      options as jsonwebtoken.SignOptions
    );

    ctx.body = {
      token,
      refreshToken,
    };
  });

  return router;
};

export default generateRefreshTokenRouter;
