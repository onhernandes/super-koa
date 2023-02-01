// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import useRequestId from "./index";
import Koa from "koa";
import request, { Response } from "supertest";
import http from "http";
import { Options } from "../../types";

jest.mock("uuid", () => ({
  v1: () => "v1",
  v4: () => "v4",
}));

describe("useRequestId", () => {
  it("Set X-Request-ID header", async () => {
    const app = new Koa();

    useRequestId(app, Options.parse({}));

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

    useRequestId(app, Options.parse({ requestIdGenerator: "uuidv1" }));

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

    useRequestId(app, Options.parse({ requestIdHeader: "ReqID" }));

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
    useRequestId(app, Options.parse({ requestIdGenerator }));

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response: Response = await request(http.createServer(app.callback()))
      .get("/")
      .set("Accept", "application/json");

    expect(response.headers?.["x-request-id"]).toEqual("reqid");
  });
});
