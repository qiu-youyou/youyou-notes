---
tag:
  - 芝士
tags:
  - JavaScript
---

# 转换数字金额为大写

## 转换规则

中文大写金额转换的基本规则是将阿拉伯数字转换为对应的中文大写数字，并添加适当的单位。例如，数字“12345.67”应转换为“壹万贰仟叁佰肆拾伍元陆角柒分”。

## 实现步骤

### 1. 数字映射

首先，我们需要建立一个数字到汉字的映射表。这通常是一个包含 0 到 9 的中文大写数字的数组。
::: code-group

```js [javascript]
const cnNumerals = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
```

:::

### 2. 单位处理

接下来，我们需要处理整数部分和小数部分的单位。整数部分通常包括“元”、“万”、“亿”等单位，而小数部分则包括“角”、“分”等单位。
::: code-group

```js [javascript]
const bigUnits = ['', '万', '亿', '兆'];
const units = ['', '拾', '佰', '仟'];
const decimalUnits = ['角', '分'];
const yuan = '元';
```

:::

### 3. 整数转换

我们需要处理不同位数的数字和对应的单位。我们可以从低位到高位遍历整数部分的每一位数字，并根据其位置添加相应的单位。
::: code-group

```js [javascript]
function convertIntegerPart(integerPart) {
  let result = '';
  if (integerPart !== '0') {
    // 遍历整数部分的每一位数字
    for (let i = 0; i < integerPart.length; i++) {
      let digit = integerPart[i];
      let position = integerPart.length - i - 1;
      let unitIndex = position % 4;
      let bigUnitIndex = Math.floor(position / 4);

      // 处理零的连续出现情况
      if (digit === '0') {
        // 省略连续的零（非末尾）
        if (result.endsWith(cnNumerals[0]) && position !== integerPart.length - 1) {
          continue;
        }
        // 添加零（末尾或单独出现）
        result += cnNumerals[0];
      } else {
        // 添加非零数字和对应单位
        result += cnNumerals[parseInt(digit)] + units[unitIndex];
      }
      // 添加大单位（每四位一隔）
      if (unitIndex === 0 && bigUnitIndex > 0) {
        result += bigUnits[bigUnitIndex];
      }
    }
  } else {
    // 整数部分为零时只添加“零”
    result += cnNumerals[0];
  }
  return result;
}
```

:::

### 4. 小数转换

需要遍历小数部分的每一位数字，并根据其位置添加相应的单位即可。
::: code-group

```js [javascript]
function convertDecimalPart(decimalPart) {
  let result = '';
  // 小数部分处理
  if (decimalPart !== '00') {
    // 遍历小数部分的每一位数字
    for (let i = 0; i < decimalPart.length; i++) {
      let digit = decimalPart[i];
      if (digit !== '0') {
        // 添加非零数字和对应单位
        result += cnNumerals[parseInt(digit)] + decimalUnits[i];
      }
    }
  } else {
    // 如果小数部分为零，则移除末尾的“元零”
    result = result.endsWith(yuan + cnNumerals[0]) ? result.slice(0, -1) : result;
  }

  return result;
}
```

:::

### 5. 转换函数

最后，我们将整数部分和小数部分合并起来，并在中间添加“元”字。并对输入进行验证，确保它是一个有效的数字。
::: code-group

```js [javascript]
export function convertAmountToCapital(money) {
  // 输入验证
  if (typeof money !== 'number' || isNaN(money) || !isFinite(money)) {
    throw new Error('Invalid input: must be a finite number.');
  }

  // 处理整数部分和小数部分
  let integerPart = Math.floor(money).toString();
  let decimalPart = Math.round((money - Math.floor(money)) * 100)
    .toString()
    .padStart(2, '0')
    .slice(0, 2);

  let result = '';
  result += convertIntegerPart(integerPart);
  result += yuan;
  result += convertDecimalPart(decimalPart);
  return result;
}

console.log(convertAmountToCapital(12345.67));
```

:::

## 完整代码

::: code-group

```js [convertAmountToCapital.js]
const cnNumerals = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const bigUnits = ['', '万', '亿', '兆'];
const units = ['', '拾', '佰', '仟'];
const decimalUnits = ['角', '分'];
const yuan = '元';

function convertIntegerPart(integerPart) {
  let result = '';
  if (integerPart !== '0') {
    // 遍历整数部分的每一位数字
    for (let i = 0; i < integerPart.length; i++) {
      let digit = integerPart[i];
      let position = integerPart.length - i - 1;
      let unitIndex = position % 4;
      let bigUnitIndex = Math.floor(position / 4);

      // 处理零的连续出现情况
      if (digit === '0') {
        // 省略连续的零（非末尾）
        if (result.endsWith(cnNumerals[0]) && position !== integerPart.length - 1) {
          continue;
        }
        // 添加零（末尾或单独出现）
        result += cnNumerals[0];
      } else {
        // 添加非零数字和对应单位
        result += cnNumerals[parseInt(digit)] + units[unitIndex];
      }
      // 添加大单位（每四位一隔）
      if (unitIndex === 0 && bigUnitIndex > 0) {
        result += bigUnits[bigUnitIndex];
      }
    }
  } else {
    // 整数部分为零时只添加“零”
    result += cnNumerals[0];
  }
  return result;
}

function convertDecimalPart(decimalPart) {
  let result = '';
  // 小数部分处理
  if (decimalPart !== '00') {
    // 遍历小数部分的每一位数字
    for (let i = 0; i < decimalPart.length; i++) {
      let digit = decimalPart[i];
      if (digit !== '0') {
        // 添加非零数字和对应单位
        result += cnNumerals[parseInt(digit)] + decimalUnits[i];
      }
    }
  } else {
    // 如果小数部分为零，则移除末尾的“元零”
    result = result.endsWith(yuan + cnNumerals[0]) ? result.slice(0, -1) : result;
  }

  return result;
}

export function convertAmountToCapital(money) {
  // 输入验证
  if (typeof money !== 'number' || isNaN(money) || !isFinite(money)) {
    throw new Error('Invalid input: must be a finite number.');
  }

  // 处理整数部分和小数部分
  let integerPart = Math.floor(money).toString();
  let decimalPart = Math.round((money - Math.floor(money)) * 100)
    .toString()
    .padStart(2, '0')
    .slice(0, 2);

  let result = '';
  result += convertIntegerPart(integerPart);
  result += yuan;
  result += convertDecimalPart(decimalPart);
  return result;
}
```

:::
