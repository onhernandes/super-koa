import useRequestId from "./index";
import Koa from "koa";
import request, { Response } from "supertest";
import http from "http";
import { Options } from "../../types";
import * as R from "ramda";

jest.mock("uuid", () => ({
  v1: () => "v1",
  v4: () => "v4",
}));

describe("useRequestId", () => {
  it("Set X-Request-ID header", async () => {
    const app = new Koa();

    const superKoaCtx = useRequestId(app, Options.parse({ useRequestId: {} }));
    const middleware: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "requestIdHeader"],
      superKoaCtx
    );
    expect(middleware).toBeTruthy();

    if (!middleware) {
      return;
    }

    app.use(middleware);

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response: Response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers?.["x-request-id"]).toEqual("v4");
  });

  it("Set X-Request-ID header using uuidv1", async () => {
    const app = new Koa();

    const superKoaCtx = useRequestId(
      app,
      Options.parse({ useRequestId: { requestIdGenerator: "uuidv1" } })
    );
    const middleware: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "requestIdHeader"],
      superKoaCtx
    );
    expect(middleware).toBeTruthy();

    if (!middleware) {
      return;
    }

    app.use(middleware);

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response: Response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers?.["x-request-id"]).toEqual("v1");
  });

  it("Custom Request ID header", async () => {
    const app = new Koa();

    const superKoaCtx = useRequestId(
      app,
      Options.parse({ useRequestId: { headerName: "reqid" } })
    );
    const middleware: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "requestIdHeader"],
      superKoaCtx
    );
    expect(middleware).toBeTruthy();

    if (!middleware) {
      return;
    }

    app.use(middleware);

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response: Response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers?.reqid).toEqual("v4");
  });

  it("Custom request ID generator", async () => {
    const app = new Koa();

    const requestIdGenerator = () => "reqid";
    const superKoaCtx = useRequestId(
      app,
      Options.parse({ useRequestId: { requestIdGenerator } })
    );
    const middleware: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "requestIdHeader"],
      superKoaCtx
    );
    expect(middleware).toBeTruthy();

    if (!middleware) {
      return;
    }

    app.use(middleware);

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response: Response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers?.["x-request-id"]).toEqual("reqid");
  });
});
