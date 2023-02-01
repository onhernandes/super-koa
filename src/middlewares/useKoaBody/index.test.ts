// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import useKoaBody from "./index";
import Koa from "koa";
import request from "supertest";
import http from "http";
import { Options } from "../../types";

describe("useKoaBody", () => {
  it("Sets up koa-body plugin", async () => {
    const app = new Koa();

    useKoaBody(app, Options.parse({}));

    app.use((ctx: Koa.Context) => {
      ctx.body = ctx.request.body;
    });

    const response = await request(http.createServer(app.callback()))
      .post("/")
      .send({ name: "Cleitinho" })
      .set("Accept", "application/json");

    expect(response.body).toEqual({ name: "Cleitinho" });
  });
});
