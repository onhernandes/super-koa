---
id: "SuperKoaErrors.Panic"
title: "Class: Panic"
sidebar_label: "Panic"
custom_edit_url: null
---

[SuperKoaErrors](../namespaces/SuperKoaErrors.md).Panic

## Hierarchy

- [`AppError`](SuperKoaErrors.AppError.md)

  ↳ **`Panic`**

## Constructors

### constructor

• **new Panic**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.code?` | `string` \| `number` |
| `options.httpStatusCode?` | `number` |
| `options.metadata?` | `Record`<`string`, `unknown`\> |

#### Overrides

[AppError](SuperKoaErrors.AppError.md).[constructor](SuperKoaErrors.AppError.md#constructor)

#### Defined in

[src/errors/Panic.ts:6](https://github.com/onhernandes/super-koa/blob/f80fb58/src/errors/Panic.ts#L6)

## Properties

### code

• **code**: `string` \| `number`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[code](SuperKoaErrors.AppError.md#code)

#### Defined in

[src/errors/AppError.ts:4](https://github.com/onhernandes/super-koa/blob/f80fb58/src/errors/AppError.ts#L4)

___

### httpStatusCode

• **httpStatusCode**: `number`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[httpStatusCode](SuperKoaErrors.AppError.md#httpstatuscode)

#### Defined in

[src/errors/AppError.ts:5](https://github.com/onhernandes/super-koa/blob/f80fb58/src/errors/AppError.ts#L5)

___

### message

• **message**: `string`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[message](SuperKoaErrors.AppError.md#message)

#### Defined in

website/node_modules/typescript/lib/lib.es5.d.ts:1054

___

### metadata

• `Optional` **metadata**: `any`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[metadata](SuperKoaErrors.AppError.md#metadata)

#### Defined in

[src/errors/AppError.ts:6](https://github.com/onhernandes/super-koa/blob/f80fb58/src/errors/AppError.ts#L6)

___

### name

• **name**: `string`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[name](SuperKoaErrors.AppError.md#name)

#### Defined in

website/node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[stack](SuperKoaErrors.AppError.md#stack)

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

[AppError](SuperKoaErrors.AppError.md).[prepareStackTrace](SuperKoaErrors.AppError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[AppError](SuperKoaErrors.AppError.md).[stackTraceLimit](SuperKoaErrors.AppError.md#stacktracelimit)

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

[AppError](SuperKoaErrors.AppError.md).[captureStackTrace](SuperKoaErrors.AppError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
