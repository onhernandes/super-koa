---
id: "modules"
title: "super-koa"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [SuperKoaErrors](namespaces/SuperKoaErrors.md)

## References

### default

Renames and re-exports [superKoa](modules.md#superkoa)

## Variables

### optionsMapping

• `Const` **optionsMapping**: `Record`<`string`, `SuperKoaFn`\>

#### Defined in

[src/index.ts:15](https://github.com/onhernandes/super-koa/blob/bfa25c8/src/index.ts#L15)

## Functions

### superKoa

▸ **superKoa**(`app`, `options`): `Partial`<`SuperKoaContext`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `__module` |
| `options` | `Object` |
| `options.loadMiddlewares` | `string`[] |
| `options.loadRoutes` | `string`[] |
| `options.useAppVersionHeader` | ``false`` \| { headerName: string; appVersion: string; } |
| `options.useBasicAuth` | ``false`` \| { username: string; password: string; } |
| `options.useErrorManager` | `boolean` |
| `options.useJWTAuth` | ``false`` \| { routesWithoutAuth: string[]; tokenIdentifier: string; authRequestHeader: string; contextResultKey: string; secret: string \| Buffer \| { key: string \| Buffer; passphrase: string; }; jsonWebTokenOptions: { ...; }; jsonWebTokenSignOptions: { ...; }; refreshTokenEndpoint: { ...; }; } |
| `options.useKoaBody` | ``false`` \| `Record`<`string`, `any`\> |
| `options.useRequestId` | ``false`` \| { headerName: string; requestIdGenerator: "uuid" \| "uuidv1" \| "uuidv4" \| ((args\_0: {}, ...args\_1: unknown[]) =\> string); } |
| `options.useResponseTimeHeader` | ``false`` \| { responseHeaderName: string; } |

#### Returns

`Partial`<`SuperKoaContext`\>

#### Defined in

[src/types/index.ts:41](https://github.com/onhernandes/super-koa/blob/bfa25c8/src/types/index.ts#L41)
