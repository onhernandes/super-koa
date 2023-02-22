import useResponseTimeHeader from "./index";
import Koa from "koa";
import request from "supertest";
import http from "http";
import { Options } from "../../types";

describe("useResponseTimeHeader", () => {
  it("Set X-Response-Time header", async () => {
    const app = new Koa();

    useResponseTimeHeader(app, Options.parse({}));

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

    useResponseTimeHeader(
      app,
      Options.parse({ responseTimeHeader: "X-Response-Total-Time" })
    );

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers).toHaveProperty("x-response-total-time");
  });
});
