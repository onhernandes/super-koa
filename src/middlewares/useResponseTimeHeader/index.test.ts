import useResponseTimeHeader from "./index";
import Koa from "koa";
import request from "supertest";
import http from "http";
import { Options } from "../../types";
import * as R from "ramda";

describe("useResponseTimeHeader", () => {
  it("Set X-Response-Time header", async () => {
    const app = new Koa();

    const superKoaCtx = useResponseTimeHeader(
      app,
      Options.parse({ useResponseTimeHeader: {} })
    );
    const middleware: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "responseTimeHeader"],
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

    const response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers).toHaveProperty("x-response-time");
  });

  it("Custom X-Response-Time header", async () => {
    const app = new Koa();

    const superKoaCtx = useResponseTimeHeader(
      app,
      Options.parse({
        useResponseTimeHeader: { responseHeaderName: "X-Response-Total-Time" },
      })
    );
    const middleware: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "responseTimeHeader"],
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

    const response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers).toHaveProperty("x-response-total-time");
  });
});
