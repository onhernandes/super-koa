import * as Koa from "koa";
import { AppError } from "../errors";

export interface SuperKoaHelper<T> {
  (): T;
}

export type HelpersErrorsContext = Record<string, unknown>;

export type SuperKoaMiddlewareCategories = "auth";

interface SuperKoaContext {
  middlewares: Record<
    SuperKoaMiddlewareCategories,
    Record<string, Koa.Middleware>
  >;
  helpers: Record<string, HelpersErrorsContext>;
  errors: Record<string, AppError>;
}

export type PartialSuperKoaContext = Partial<SuperKoaContext>;

export default SuperKoaContext;
