import { SuperKoaOptions } from "../types";
import * as Koa from "koa";
import { listAllFilesFromPath } from "../api/fs";
import Router from "@koa/router";

const loadRoutes = async (app: Koa, { loadRoutes }: SuperKoaOptions) => {
  const loadedRoutes = new Set(
    Array.isArray(loadRoutes)
      ? loadRoutes.reduce(
          (accumulator: string[], currentValue: string) => [
            ...accumulator,
            ...listAllFilesFromPath(currentValue, [".js", ".ts"]),
          ],
          []
        )
      : []
  );

  for (const routePath of loadedRoutes) {
    const imported: Router = await import(routePath);

    app.use(imported.routes()).use(imported.allowedMethods());
  }
};

export default loadRoutes;
