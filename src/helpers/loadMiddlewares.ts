import { SuperKoaOptions } from "../types";
import * as Koa from "koa";
import { listAllFilesFromPath } from "../api/fs";

const loadMiddlewares = async (
  app: Koa,
  { loadMiddlewares }: SuperKoaOptions
) => {
  const loaded = new Set(
    Array.isArray(loadMiddlewares)
      ? loadMiddlewares.reduce(
          (accumulator: string[], currentValue: string) => [
            ...accumulator,
            ...listAllFilesFromPath(currentValue, [".js", ".ts"]),
          ],
          []
        )
      : []
  );

  for (const routePath of loaded) {
    const imported: Koa.Middleware = await import(routePath);

    app.use(imported);
  }
};

export default loadMiddlewares;
