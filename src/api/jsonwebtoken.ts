import jsonwebtoken from "jsonwebtoken";

export const verify = (
  token: string,
  secret: jsonwebtoken.Secret | jsonwebtoken.GetPublicKeyOrSecret,
  options: jsonwebtoken.VerifyOptions & { complete: true } = { complete: true }
): Promise<any> =>
  new Promise((resolve, reject) => {
    const verifyCallback: jsonwebtoken.VerifyCallback = (
      error: jsonwebtoken.VerifyErrors | null,
      decoded: string | jsonwebtoken.Jwt | jsonwebtoken.JwtPayload | undefined
    ): void => {
      if (error) {
        reject(error);
      }

      if (decoded === undefined) {
        // @TODO change error to custom invalid xyz
        reject(new Error(`Empty decoded value: ${JSON.stringify(decoded)}`));
      }

      resolve(decoded);
    };

    jsonwebtoken.verify(token, secret, options, verifyCallback);
  });

export const sign = (
  value: string | object | Buffer,
  secret: jsonwebtoken.Secret,
  options: jsonwebtoken.SignOptions = {}
): Promise<string> =>
  new Promise((resolve, reject) => {
    const callback: jsonwebtoken.SignCallback = (
      error: Error | null,
      token: string | undefined
    ) => {
      if (error) {
        return reject(error);
      }

      if (!token) {
        return reject(new Error("Received empty data from sign"));
      }

      return resolve(token);
    };
    jsonwebtoken.sign(value, secret, options, callback);
  });

export default {
  verify,
};
