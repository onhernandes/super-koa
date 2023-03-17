---
id: "SuperKoaErrors.AppError"
title: "Class: AppError"
sidebar_label: "AppError"
custom_edit_url: null
---

[SuperKoaErrors](../namespaces/SuperKoaErrors.md).AppError

## Hierarchy

- `Error`

  ↳ **`AppError`**

  ↳↳ [`NotFound`](SuperKoaErrors.NotFound.md)

  ↳↳ [`Unauthorized`](SuperKoaErrors.Unauthorized.md)

  ↳↳ [`InvalidParams`](SuperKoaErrors.InvalidParams.md)

  ↳↳ [`Panic`](SuperKoaErrors.Panic.md)

## Constructors

### constructor

• **new AppError**(`message`, `«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `«destructured»` | `Object` |
| › `code` | `string` \| `number` |
| › `httpStatusCode` | `number` |
| › `metadata?` | `Record`<`string`, `unknown`\> |

#### Overrides

Error.constructor

#### Defined in

[src/errors/AppError.ts:8](https://github.com/onhernandes/super-koa/blob/bfa25c8/src/errors/AppError.ts#L8)

## Properties

### code

• **code**: `string` \| `number`

#### Defined in

[src/errors/AppError.ts:4](https://github.com/onhernandes/super-koa/blob/bfa25c8/src/errors/AppError.ts#L4)

___

### httpStatusCode

• **httpStatusCode**: `number`

#### Defined in

[src/errors/AppError.ts:5](https://github.com/onhernandes/super-koa/blob/bfa25c8/src/errors/AppError.ts#L5)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

website/node_modules/typescript/lib/lib.es5.d.ts:1054

___

### metadata

• `Optional` **metadata**: `any`

#### Defined in

[src/errors/AppError.ts:6](https://github.com/onhernandes/super-koa/blob/bfa25c8/src/errors/AppError.ts#L6)

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

website/node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

website/node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
