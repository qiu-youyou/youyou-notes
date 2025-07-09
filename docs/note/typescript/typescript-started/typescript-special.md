---
tag:
  - 笔记
tags:
  - TypeScript

recommend: 4

description: 本笔记介绍 TypeScript 的六种特殊类型：any、never、void、unknown、Tuple 和 Enum，详细说明它们的用法、区别及注意事项，帮助理解和正确使用这些类型。
---

# TypeScript 语法用法 - 特殊类型

这里介绍 TypeScript 的六种特殊类型 any & never & void & unknown & Tuple & Enum。

## 👻 any 任意类型

有时，我们在编写代码的时候，并不能清楚地知道一个值到底是什么类型，这时就需要用到 `any` 类型，即任意类型；

```ts
let a: any;
a = 111;
a = '111';
a = () => {};
a = [];
a = {};
a = undefined;
a = null;
```

## 👻 void 没有类型

`void` 和 `any` `相反，any` 是表示任意类型，而 `void` 是表示没有任意类型，就是什么类型都不是；

```ts
let b: void;
b = 111; // Error 不能将类型“number”分配给类型“void”。
b = '111'; // Error 不能将类型“string”分配给类型“void”。
b = () => {}; // Error 不能将类型“() => void”分配给类型“void”。
b = {}; // Error 不能将类型“{}”分配给类型“void”。
b = []; // Error never[]”分配给类型“void”。
b = null; //Error 不能将类型“null”分配给类型“void”
b = undefined; // OK
```

::: tip
`void` 类型的变量只能赋值为 `undefined` 其他类型不能赋值给 `void` 类型的变量。
:::

## 👻 never 永不存在的值的类型

它是那些总会抛出异常或根本不会有返回值的函数表达式的返回值类型。

当变量被永不为真的类型保护所约束时，该变量也是 `never` 类型。

```ts
interface Foo {
  type: 'foo';
}

interface Bar {
  type: 'bar';
}

type All = Foo | Bar;

// TS 是可以收窄类型的 (discriminated union)
// 如果一切逻辑正确，那么这里应该能够编译通过。
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // val 被收窄为 Foo
      break;
    case 'bar':
      // val 被收窄为 Bar
      break;
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val;
      break;
  }
}

// 有一天你的同事改了 All 的类型：
// type All = Foo | Bar | Baz
// 然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，
// 这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。
```

::: tip
在 `default` 里面我们把被收窄为 `never` 的 `val` 赋值给一个显式声明为 `never` 的变量。

通过这个办法，你可以确保 `handleValue` 总是穷尽 (exhaust) 了所有 `All` 的可能类型。

`never` 的主要作用：限制类型、控制流程、类型运算。
:::

## 👻 unknown 未知类型

`unknown` 类型是 `TypeScript在3.0` 版本新增的类型，它表示未知的类型。

- 任何类型的值都可以赋值给 `unknown` 类型；

```ts
let c: unknown;
c = 111;
c = '111';
c = [];
c = {};
c = () => {};
c = undefined;
c = null;

// 流程控制
if (typeof c === 'number') {
  c.toFixed(2);
} else if (typeof c === 'object' && c instanceof Array) {
  c.join('-');
}
```

- 如果没有类型断言或基于控制流的类型细化时，`unknown` 不可以赋值给 `其它类型`，这时它只能赋值给 `unknown` 和 `any` 类型；

```ts
let value1: any;
let value2: unknown;
let value3: string = value2; // error 不能将类型“unknown”分配给类型“string”
value1 = value2;
```

- 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作；

```ts
let value4: unknown;
value4++; // error “value4”的类型为“未知”。
value4--; // error “value4”的类型为“未知”。
value4 += 1; // error “value4”的类型为“未知”。
```

- `unknown` 与任何 `其它类型` 组成的 `交叉类型`，最后都等于 `其它类型`；

```ts
type type1 = unknown & string; // type1 => string
type type2 = number & unknown; // type2 => number
type type3 = unknown & unknown; // type3 => unknown
type type4 = unknown & string[]; // type4 => string[]
```

- `unknown` 与任何 `其它类型` 组成的 `联合类型`，都等于 `unknown` 类型；
  但只有 `any` 例外，`unknown` 与 `any` 组成的联合类型等于 `any`；

```ts
type type5 = string | unknown; // type5 => unknown
type type6 = number[] | unknown; // type6 => unknown
type type7 = any | unknown; // type7 => any
```

- `never` 类型是 `unknown` 的子类型；

```ts
type type8 = never extends unknown ? true : false; // type8 => true
```

- `keyof unknown` 等于类型 `never`

```ts
type type9 = keyof unknown; // type9 => never
```

- 只能对 `unknown` 进行等或不等操作，不能进行其它操作；

```ts
value1 === value2;
value1 !== value2;
value1 += value2; // error
```

- `unknown` 类型的值不能访问其属性、作为函数调用和作为类创建实例；

```ts
let value5: unknown;
value5.age; // error “value5”的类型为“未知”。
value5(); // error “value5”的类型为“未知”。
new value5(); // error “value5”的类型为“未知”。
```

- 使用映射类型时如果遍历的是 `unknown` 类型，则不会映射任何属性；

```ts
type Types<T> = { [P in keyof T]: number };
type type10 = Types<any>; // type10 => { [x: string]: number }
type type11 = Types<unknown>; // type10 => {}
```

::: tip
我们在实际使用中，如果有类型无法确定的情况，要尽量避免使用 `any`。

这三个式子都不会报错，因为 `tmp` 是 `any` 类型：

```ts
let tmp: any;
console.log(tmp.name); // 当 tmp 是一个对象时，访问name属性是没问题的
console.log(tmp.toFixed()); // 当 tmp 是数值类型的时候，调用它的toFixed方法没问题
console.log(tmp.length); // 当 tmp 是字符串或数组时获取它的length属性是没问题
```

当你指定值为 `unknown` 类型的时候，但是没有通过基于控制流的类型断言来缩小范围，是不能对它进行任何操作的；

所以 `unknown` 相比于 `any` 是安全的！
:::

## 👻 Tuple 元组

- `Tuple` 表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。
- `Tuple` 必须声明每个成员的类型。

```ts
const value: [number] = [1];
const value1: [string, string, boolean] = ['a', 'b', true];
```

- 某些情况下，使用 `元组（Tuple）` 来代替数组要更加妥当，一个数组中只存放固定长度的变量，来防止越界访问。

```ts
const value1: [string, string, boolean] = ['a', 'b', true];
console.log(value1[10]); // error 长度为“3”的元组类型“[string, string, boolean]”在索引“10“处没有元素
```

- 元组也支持了在某一个位置上的可选成员。此时元组的长度属性也会发生变化。

```ts
const value: [string, number?, boolean?] = ['a'];
// 长度的类型为 1 | 2 | 3
console.log(typeof value.length); // 1 | 2 | 3
```

- 具名元组（Labeled Tuple Elements） 可以为元组中的元素打上类似属性的标记。

```ts
const value: [name: string, age: number, email?: string] = ['zhangsan', 18];
```

## 👻 Enum 枚举

- 枚举并不是 `JavaScript` 中原生的概念
- 用来将相关常量放在一个容器里面, 常量被真正地约束在一个命名空间下。
- 枚举 可以让你拥有更好的类型提示。
- Enum 成员值都是只读的，不能重新赋值。
- 多个同名的 Enum 结构会自动合并, 合并只允许首成员忽略初始值并且不能有同名成员。

```ts
enum baseUrl {
  test = 'xxx/test/url',
  prev = 'xxx/prev/url',
  prod = 'xxx/prod/url',
}

enum baseUrl {
  test = 'xxx', // error
  test1 = 'xxx/test1/url',
  prev1 = 'xxx/prev1/url',
  prod1 = 'xxx/prod1/url',
}

// 系统会自动把 baseUrl 合并

baseUrl.test = 'xxx/xxx'; // error 无法为“test”赋值，因为它是只读属性
```

- 枚举和对象的重要差异在于，对象是单向映射的，我们只能从键映射到键值。而枚举是双向映射的，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员。
- 但是仅有值为数字的枚举成员才能够进行这样的双向枚举，字符串枚举成员仍然只会进行单次映射。

```ts
enum Color {
  Red,
  Green,
  Blue = 'a',
}
const colorValue = Color.Red; // 0
const colorKey = Color[0]; // Red
console.log(Color.Blue); // a
console.log(Color[2]); // undefined
```

- Enum 成员默认不必赋值，系统会从零开始逐一递增，按照顺序为每个成员赋值。

```ts
enum Color {
  Red,
  Green,
  Blue,
} // Red = 0, Green = 1, Blue = 2
```

- 可以设定成员的值，后面成员的值就会从这个值开始递增。

```ts
enum Color {
  Red,
  Green = 100,
  Blue,
} // Red = 0, Green = 100, Blue = 101
```

- 成员的值可以是小数，但不能是 `Bigint`
- 成员的值也可以相同。

```ts
enum Color {  Red = 90, Blue: 90, Green = 0.5,
  Blue = 7n, // error
}
```
