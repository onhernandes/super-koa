// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { z } from "zod";
import * as Koa from "koa";
import jsonwebtoken from "jsonwebtoken";

export const RequestIdGeneratorEnum = z.enum(["uuid", "uuidv1", "uuidv4"]);

export const RoutesWithoutAuthZod = z.string().array().default([]);
export type RoutesWithoutAuth = z.infer<typeof RoutesWithoutAuthZod>;

export type ObjectType = { [key: string]: any };
export const BufferZodType = z.custom<Buffer | string>(
  (value: unknown) => value instanceof Buffer || typeof value === "string"
);
export const RegExpZodType = z.custom<RegExp | string>(
  (value: unknown) => value instanceof RegExp || typeof value === "string"
);

export const SignPayload = z
  .function()
  .args(z.any(), z.object({ refreshToken: z.string() }))
  .returns(z.string().or(z.promise(z.string())));

export type SignPayloadFn = (
  ctx: Koa.Context,
  payload: z.ZodParsedType | ObjectType
) => string | Promise<string>;

export const JWTAuth = z
  .union([
    z.object({
      routesWithoutAuth: RoutesWithoutAuthZod,
      tokenIdentifier: z.string().default("Bearer "),
      authRequestHeader: z.string().default("Authorization"),
      contextResultKey: z.string().default("loggetJWTDecode"),
      secret: z
        .string()
        .or(BufferZodType)
        .or(
          z.object({
            key: z.string().or(BufferZodType),
            passphrase: z.string(),
          })
        ),
      jsonWebTokenOptions: z
        .object({
          algorithms: z.array(z.string()).optional(),
          audience: z
            .string()
            .or(RegExpZodType)
            .or(z.array(z.string()))
            .or(z.array(RegExpZodType))
            .optional(),
          clockTimestamp: z.number().optional(),
          clockTolerance: z.number().optional(),
          complete: z.boolean().default(true),
          issuer: z.string().or(z.array(z.string())).optional(),
          ignoreExpiration: z.boolean().optional(),
          ignoreNotBefore: z.boolean().optional(),
          jwtid: z.string().optional(),
          nonce: z.string().optional(),
          subject: z.string().optional(),
          maxAge: z.string().or(z.number()).optional(),
          allowInvalidAsymmetricKeyTypes: z.boolean().optional(),
        })
        .default({ complete: true }),
      jsonWebTokenSignOptions: z
        .object({
          algorithm: z.any().optional(),
          keyid: z.string().optional(),
          expiresIn: z.string().or(z.number()).optional(),
          notBefore: z.string().or(z.number()).optional(),
          audience: z.string().or(z.array(z.string())).optional(),
          subject: z.string().optional(),
          issuer: z.string().optional(),
          jwtid: z.string().optional(),
          mutatePayload: z.boolean().optional(),
          noTimestamp: z.boolean().optional(),
          header: z.any().optional(),
          encoding: z.string().optional(),
          allowInsecureKeySizes: z.boolean().optional(),
          allowInvalidAsymmetricKeyTypes: z.boolean().optional(),
        })
        .default({}),
      refreshTokenEndpoint: z.object({
        apiPrefix: z.string().default("/api"),
        endpoint: z.string().default("/refresh-token"),
        signPayload: SignPayload,
        refreshPayload: SignPayload,
      }),
    }),
    z.literal(false),
  ])
  .default(false);

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
  loadRoutes: z.union([z.array(z.string()), z.literal(false)]),
  loadMiddlewares: z.union([z.array(z.string()), z.literal(false)]),
});

export type SuperKoaOptions = z.infer<typeof Options>;

export type SuperKoaFn = (app: Koa, options: SuperKoaOptions) => unknown;
