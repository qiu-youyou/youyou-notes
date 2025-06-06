# 回文数

[🔗 leetcode 题目](https://leetcode.cn/problems/palindrome-number/description/?envType=problem-list-v2&envId=math)

::: tip

1. 所有的负数都不可能是回文数；
2. 所有个位为 0 的数字，都不可能是回文数，0 除外；

:::

### 菜鸡尝试

将数字转换为字符串，将字符串分割为数组，使用数组的 `reverse` 将数组反转后，

再转换为字符串，比较是否相等。

::: code-group

<<< ./index.ts#Solution1
:::

### 官方题解

将数字的后半部分反转，在与前半部分进行比较。

如数字 `1221` 的后半部分 `21` 反转后为 `12`，与前半部分 `12` 进行比较。

`1221 % 10` 获得最后一位 `1`，`1221 / 10 % 10` 得到第二位 向下取整后为 `2`，`1 * 10 + 2 = 12`。

重复以上的步骤，最后相等 或 忽略不对判断回文数产生影响的中位数后相等的，就是回文数。

::: code-group

<<< ./index.ts#Solution2
:::
