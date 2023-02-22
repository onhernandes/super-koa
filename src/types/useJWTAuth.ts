import { z } from "zod";
import * as Koa from "koa";

export const RoutesWithoutAuthZod = z.string().array().default([]);

export type RoutesWithoutAuth = z.infer<typeof RoutesWithoutAuthZod>;

export const SignPayload = z
  .function()
  .args(z.any(), z.object({ refreshToken: z.string() }))
  .returns(z.string().or(z.promise(z.string())));

export type SignPayloadFn = (
  ctx: Koa.Context,
  payload: z.ZodParsedType | { [key: string]: any }
) => string | Promise<string>;

export const JWTAuth = z.object({
  routesWithoutAuth: RoutesWithoutAuthZod,
  tokenIdentifier: z.string().default("Bearer "),
  authRequestHeader: z.string().default("Authorization"),
  contextResultKey: z.string().default("loggetJWTDecode"),
  secret: z
    .string()
    .or(z.instanceof(Buffer))
    .or(
      z.object({
        key: z.string().or(z.instanceof(Buffer)),
        passphrase: z.string(),
      })
    ),
  jsonWebTokenOptions: z
    .object({
      algorithms: z.array(z.string()).optional(),
      audience: z
        .string()
        .or(z.instanceof(RegExp))
        .or(z.array(z.string()))
        .or(z.array(z.instanceof(RegExp)))
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
});

export type useJWTAuth = z.infer<typeof JWTAuth>;
