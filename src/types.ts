// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { z } from "zod";
import * as Koa from "koa";

export const RequestIdGeneratorEnum = z.enum(["uuid", "uuidv1", "uuidv4"]);

export const RoutesWithoutAuthZod = z.union([
  z.string(),
  z.string().array(),
  z.any(),
]);
export type RoutesWithoutAuth = z.infer<typeof RoutesWithoutAuthZod>;

export const JWTAuth = z
  .discriminatedUnion("enable", [
    z.object({
      enable: z.literal(true),
      routesWithoutAuth: RoutesWithoutAuthZod,
      tokenIdentifier: z.string(),
      authRequestHeader: z.string().default("Authorization"),
      secret: z.string(),
      refreshTokenEndpoint: z.object({
        apiPrefix: z.string().default("/api"),
        endpoint: z.string().default("/refresh-token"),
      }),
    }),
    z.object({ enable: z.literal(false) }),
  ])
  .default({ enable: false });

const BooleanSchemaDefaultsTrue = z.boolean().default(true);
export const Options = z.object({
  useKoaBody: BooleanSchemaDefaultsTrue,
  koaBodyOptions: z.object({}).passthrough().optional(),
  useResponseTimeHeader: BooleanSchemaDefaultsTrue,
  responseTimeHeader: z.string().default("X-Response-Time"),
  useRequestId: BooleanSchemaDefaultsTrue,
  requestIdHeader: z.string().default("X-Request-ID"),
  requestIdGenerator: z
    .union([
      RequestIdGeneratorEnum,
      z.function().args(z.object({}).passthrough()).returns(z.string()),
    ])
    .default("uuidv4"),
  useAppVersionHeader: BooleanSchemaDefaultsTrue,
  appVersionHeader: z.string().optional(),
  appVersion: z.string().optional(),
  useBasicAuth: z
    .discriminatedUnion("enable", [
      z.object({
        enable: z.literal(true),
        username: z.string(),
        password: z.string(),
      }),
      z.object({ enable: z.literal(false) }),
    ])
    .default({ enable: false }),
  useJWTAuth: JWTAuth,
});

export type SuperKoaOptions = z.infer<typeof Options>;

export type ObjectType = { [key: string]: any };

export type SuperKoaFn = (app: Koa, options: SuperKoaOptions) => unknown;
