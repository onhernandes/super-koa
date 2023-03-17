import useKoaBody from "./index";
import Koa from "koa";
import request from "supertest";
import http from "http";
import { Options } from "../../types";
import * as R from "ramda";

describe("useKoaBody", () => {
  it("Sets up koa-body plugin", async () => {
    const app = new Koa();

    const superKoaCtx = useKoaBody(app, Options.parse({}));
    const koaBody: Koa.Middleware | undefined = R.path(
      ["middlewares", "globals", "koaBody"],
      superKoaCtx
    );
    expect(koaBody).toBeTruthy();

    if (!koaBody) {
      return;
    }

    app.use(koaBody);

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
