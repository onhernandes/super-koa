import { useJWTAuth } from "../../types/useJWTAuth";
import { sign as apiJWTSign, verify } from "../../api/jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";

export const sign =
  (options: useJWTAuth) => (payload: string | object | Buffer) => {
    const { secret, jsonWebTokenSignOptions } = options;
    const jwtSecret: jsonwebtoken.Secret = secret;
    const jwtOptions: jsonwebtoken.SignOptions = jsonWebTokenSignOptions;

    return apiJWTSign(payload, jwtSecret, jwtOptions);
  };

export const parse = (options: useJWTAuth) => (token: string) => {
  const { secret, jsonWebTokenSignOptions } = options;
  const jwtSecret = secret satisfies jsonwebtoken.Secret;
  const jwtOptions = {
    complete: true,
    ...jsonWebTokenSignOptions,
  } satisfies jsonwebtoken.VerifyOptions & { complete: true };

  return verify(token, jwtSecret, jwtOptions);
};
