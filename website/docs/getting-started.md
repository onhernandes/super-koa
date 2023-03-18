---
sidebar_position: 1
---

# Getting Started

SuperKoa tries to work as an extension of Koa with a lot of features included. It's default function will just return a SuperKoaContext object containing everything we have to offer.

If you want to, Superkoa will assimilate it's customized context with the Koa's Context definition, so you'll have everything close as possible - it's disabled by default, you can change this by passing `{ assimilateContext: true }` to `SuperKoa` function.

> SuperKoa **does not** instantiates `Koa.Application`, rather it receives the application instance as first parameter.

### Installation

You may install SuperKoa directly from NPM, you really only need to install koa itself.

```shell
npm i super-koa
```

## Let's initialize our application

```typescript
import * as Koa from "koa";
import SuperKoa, { SuperKoaOptions } from "super-koa";

const app = new Koa();
const options: SuperKoaOptions = {};
SuperKoa(app, options);
```

And that's it! This is enough to get things going. Now you Koa application is powered by SuperKoa and you have plenty of features to keep exploring!

See more interesting features:
