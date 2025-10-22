---
tag:
  - LLM
tags:
  - LangChain

description: LangChain 核心组件与用法，包括 Prompt、Message、Model、OutputParser 及 LCEL/Runnable。通过示例展示如何从提示设计、模型调用到结果解析，再到链式组合，以快速上手并构建可扩展的 LLM 应用。

date: 2025-09-29 15:12:41
sticky: 9998
---

# 一杯咖啡的时间 上手 LangChain

`LangChain` 核心组件与用法，包括 `Prompt`、`Message`、`Model`、`OutputParser` 及 `LCEL/Runnable`。通过示例展示如何从提示设计、模型调用到结果解析，再到链式组合，以快速上手并构建可扩展的 `LLM` 应用。

## 🌵 LangChain 是什么

`LangChain` 是一个 面向大语言模型 `（LLM）` 的应用开发框架，它的核心目标是：

👉 让开发者更容易地使用大语言模型，并把它们融入到实际应用中。

#### 为什么需要 LangChain

大语言模型（比如 `GPT-4、Claude、Llama`）很强大，但它们本质上只是“输入 → 输出”的黑箱：

你输入一段文本，它返回一段文本。
它并不知道你要用它做什么，也不会主动约束输出格式。

在实际开发中，我们经常会遇到问题：

```
Prompt 管理困难：模型的表现高度依赖于提示词，如何组织和复用 Prompt？
输出不可控：模型可能返回乱七八糟的内容，怎么解析成结构化结果？
多步骤逻辑：很多应用需要多次调用模型，怎么把步骤组织起来？
集成外部工具：模型需要调用数据库、搜索引擎或 API，该怎么桥接？
调试和监控：怎么记录调用过程、监控 token 消耗、可视化调试？
```

> LangChain 的设计初衷就是为了解决这些问题。

#### LangChain 的核心价值

```
抽象：把 Prompt、Model、Parser、Chain 等抽象成模块。
可组合：所有模块实现统一接口 (Runnable)，可以像积木一样组合。
可扩展：支持不同的模型 (OpenAI、Anthropic、本地 LLM)、不同的存储、不同的工具。
可观测：内置回调 (Callback) 机制，支持监控、日志和流式输出。
```

> LangChain 就是一个帮你把 LLM 变成“可用应用”的开发框架。

## 🌵 Prompt 基础用法

#### 什么是 Prompt

`Prompt`（提示词）就是你告诉大语言模型该做什么的指令。

它可以是简单的一句话：

::: code-group

```md [] {}
请把这句话翻译成英文：你好，世界
```

:::

也可以是一个结构化的对话：

::: code-group

```md [] {}
System: 你是一个专业翻译
User: 请把下面的句子翻译成英文：你好，世界
```

:::

#### Prompt 的组成

在 LangChain 中，`Prompt` 被设计成一个独立的模块，便于管理、复用和动态生成。

LangChain 把 `Prompt` 视为由 模板 + 变量 组成：

- 模板 (Template)：字符串或对话结构，里面包含占位符。
- 变量 (Variables)：运行时传入的值，填充到模板里。

::: code-group

```python [] {}
from LangChain.prompts import PromptTemplate

prompt = PromptTemplate.from_template("请翻译成英文：{text}")
prompt_value = prompt.format(text="你好")
print(prompt_value)
# -> 请翻译成英文：你好

```

:::

#### Prompt 的子组件

对于 `Prompt Template`， 在 `LangChain` 中，又涵盖了多个子组件，
例如：角色提示模板、消息占位符、文本提示模板、聊天消息提示模板、提示、消息等:

```
PromptTemplate ：创建文本消息提示模板，用于与大语言模型/文本生成模型进行交互。
ChatPromptTemplate ：用于创建聊天消息提示模板，一般用于与聊天模型进行交互。
MessagePlaceholder ：消息占位符，在聊天模型中对不确定是否需要的消息进行占位。
SystemMessagePromptTemplate ：用于创建系统消息提示模板，角色为系统。
HumanMessagePromptTemplate ：用于创建人类消息提示模板，角色为人类。
AIMessagePromptTemplate ：用于创建 AI 消息提示模板，角色为 AI。
PipelinePromptTemplate ：用于创建管道消息，可以将提示模板作为变量进行快速复用。
```

Prompt 的常用方法及功能:

```
partial：用于格式化提示模板中的部分变量。
format：传递变量数据，格式化提示模板为文本消息。
invoke：传递变量数据，格式化提示模板为提示。
to_string：将提示/消息提示列表转换成字符串。
to_messages：用于将提示转换成消息列表。
```

#### Prompt 基础用法

#### PromptTemplate

> 适合非对话任务（翻译、总结、分类）等单轮任务。

::: code-group

```python [] {}
from LangChain.prompts import PromptTemplate

prompt = PromptTemplate.from_template("请翻译成英文：{text}")
prompt_value = prompt.invoke(text="你好")
print(prompt.format(text="你好"))
print(prompt_value.to_string())
print(prompt_value.to_messages())

```

---

:::

#### ChatPromptTemplate & MessagesPlaceholder

> 如果你要做多轮对话，还可以通过 `MessagesPlaceholder` 来插入动态历史。

::: code-group

```python [] {}
from LangChain.prompts import MessagesPlaceholder, HumanMessagePromptTemplate
from LangChain_core.messages import AIMessage
from LangChain_core.prompts import ChatPromptTemplate

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个聊天助手"),
    # 调用时你可以传入 history，这样就能保留上下文。
    MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.from_template("请翻译成英文：{text}"),
])

chat_prompt_value = chat_prompt.invoke({
    "chat_history": [
        ("human", "我叫小明"),
        AIMessage("你好，我是ChatGPT，有什么可以帮到您"),
    ],
    "text": "你好",
})
print(chat_prompt_value)

```

:::

## 🌵 Message 基础用法

#### 为什么需要 Message

在 `LLM (Language Model)` 中，输入和输出都是 字符串,

而在 `ChatModel (对话模型)` 中，模型的输入输出遵循 对话格式。

如果只用 `str` ，模型无法分辨这段话是谁说的，而在 `LangChain` 中 `Message` 是消息组件，
并且所有消息都具有: `type(类型)、content(内容)、response_metadata(响应元数据)`。

> 这样，模型不仅能理解输入内容，还能理解上下文和身份设定。

#### Message 基础用法

LangChain 封装的 `Message` 涵盖了 5 种类型的消息：
`SystemMessage、HumanMessage、AIMessage、FunctionMessage、ToolMessage`。

在实践中，通常用 `ChatPromptTemplate` 生成 `Message`，再交给 `ChatModel`:

#### 设定角色:

::: code-group

```python [] {}
from LangChain.prompts import ChatPromptTemplate

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位{role}"),
    ("user", "请用{lang}解释：{topic}")
])

messages = chat_prompt.format_messages(role="科学家", lang="中文", topic="量子纠缠")

print(messages)

# 输出
"""
[
  SystemMessage(content="你是一位科学家"),
  HumanMessage(content="请用中文解释：量子纠缠")
]
"""

```

:::

#### 保持上下文对话

::: code-group

```python [] {}
history = [
    HumanMessage(content="你好"),
    AIMessage(content="你好！我是 AI 助手。"),
    HumanMessage(content="给我讲个笑话")
]
chat.invoke(history)

```

:::

## 🌵 Model 组件基础用法

#### 什么是 Model

在 LangChain 里，`Model` 就是和大语言模型交互的接口。

- 你给它输入 `(Prompt)`，它返回输出（文本或消息）。
- LangChain 把不同厂商的模型 `(OpenAI、Anthropic、LLaMA)` 统一成了相似的接口。
- 所有模型都实现了 `Runnable` 协议，所以调用方式一致 `(.invoke / .batch / .stream)`。

> 这样一来，你的应用就不用依赖某一个具体模型，而是可以随时切换。

#### Model 的分类

LangChain 里常见的模型主要有两类：

- LLM（Language Model）: 输入输出都是纯文本字符串、适合单论任务（翻译、总结）
- ChatModel（对话模型）: 输入输入对话消息、适合多轮对话、聊天机器人。

> LLM 输入输出是纯字符串，ChatModel 输入输出是 Message 列表.

#### 基础调用方式

#### 单次调用（invoke）

> 传递对应的文本提示/消息提示，大语言模型生成对应的内容。

::: code-group

```python [] {}
from LangChain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from LangChain_openai import OpenAI, ChatOpenAI

# LLM 调用
llm = OpenAI(model="text-davinci-003")
print(llm.invoke("给我一句励志格言"))

# ChatModel 调用（字符串）
chat = ChatOpenAI(model="gpt-3.5-turbo")
print(chat.invoke("给我一句励志格言"))

# ChatModel 调用（Message 列表）
# 编排提示词
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个聊天助手"),
    HumanMessagePromptTemplate.from_template("{query}"),
])

# 创建大语言模型
llm = ChatOpenAI(model="gpt-3.5-turbo")

ai_message = llm.invoke(prompt.invoke({"query": "你好"}))

print(ai_message.type)
print(ai_message.content)
print(ai_message.response_metadata)
```

:::

#### 批量调用（batch）:

> 批量调用可以节省时间，适合一次处理多条数据（如批量翻译、文本分类）。

::: code-group

```python [] {}
ai_messages = llm.batch([
    prompt.invoke({"query": "写一个关于春天的比喻句"}),
    prompt.invoke({"query": "写一个关于冬天的比喻句"}),
])

for ai_message in ai_messages:
    print(ai_message.content)

```

:::

#### 流式调用（stream）:

> 流式输出版本 适合需要边生成边展示 的场景（比如聊天机器人）。

::: code-group

```python [] {}
response = llm.stream(prompt.invoke({"query": "写一个50字的短故事"}))

for chunk in response:
    print(chunk.content, flush=True, end="")

```

:::

## 🌵 OutputParser 基础用法

#### OutputParser 是什么

`LangChain` 里的 `OutputParser`(输出解析器) 就是：

把模型生成的 自由文本 转换成 结构化结果（JSON、列表、数字、Pydantic 对象等）。

因为大模型的输出往往是自然语言，而在应用里我们需要 可控格式：

如：数据提取（返回 JSON）、分类任务（返回标签）、数值计算（返回数字）、程序调用（返回结构化参数）等。

> `OutputParser` 是模型输出到程序可用数据的桥梁

#### OutputParser 核心作用

- 将 自由文本 或 模型生成的自然语言 转成 可程序化处理的数据。
- 使得模型生成结果更稳定、可靠。
- 提高下游任务（如数据库存储、API 调用、前端展示）的可控性。

#### 常见 OutputParser

在 `LangChain` 中预设了大量的输出解析器，
输出解析器通常包含两个抽象函数的实现，这也是自定义输出解析器需要实现的两个函数：

- `get_format_instructions`：用来约定输出的格式，并转换为描述文本。
- `parse`：用来解析 LLM 的输出为约定的格式。

#### StrOutputParse

> 这是最基础的解析器，直接返回字符串。

::: code-group

```python [] {}
from LangChain_core.output_parsers import StrOutputParser
from LangChain_core.prompts import ChatPromptTemplate
from LangChain_openai import ChatOpenAI

# 1.编排提示模板
prompt = ChatPromptTemplate.from_template("{query}")

# 2.构建大语言模型
llm = ChatOpenAI(model="gpt-3.5-turbo-16k")

# 3.创建字符串输出解析器
parser = StrOutputParser()

# 4.调用大语言模型生成结果并解析
content = parser.invoke(llm.invoke(prompt.invoke({"query": "你好，你是?"})))

print(content)

```

:::

#### PydanticOutputParser

> 按字段解析 Pydantic 对象

::: code-group

```python [] {}
from LangChain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

class Person(BaseModel):
    name: str = Field(..., description="人的名字")
    age: int = Field(..., description="人的年龄")

parser = PydanticOutputParser(pydantic_object=Person)
parsed = parser.invoke('{"name": "张三", "age": 25}')
print(parsed)
# 输出: Person(name='张三', age=25)

```

:::

#### PydanticOutputParser / JsonOutputParser

> - PydanticOutputParser → 返回 Pydantic 对象，带类型验证
> - JsonOutputParser → 返回字典，直接解析 JSON

::: code-group

```python [] {}
from LangChain_core.output_parsers import JsonOutputParser
from LangChain_core.prompts import ChatPromptTemplate
from LangChain_core.pydantic_v1 import BaseModel, Field
from LangChain_openai import ChatOpenAI


# 1. 定义 Pydantic 数据结构
class WeatherReport(BaseModel):
    location: str = Field(description="城市名称")
    temperature: str = Field(description="当前温度")
    condition: str = Field(description="天气状况，比如晴天、多云、下雨等")

parser = JsonOutputParser(pydantic_object=WeatherReport)

# 2. 构建提示模板
prompt = ChatPromptTemplate.from_template(
    "请根据用户提供的城市生成天气报告。\n{format_instructions}\n用户输入: {query}"
).partial(format_instructions=parser.get_format_instructions())

# 3. 构建大语言模型
llm = ChatOpenAI(model="gpt-3.5-turbo-16k")

# 4. 调用模型并解析输出
weather_report = parser.invoke(llm.invoke(prompt.invoke({"query": "北京"})))

# 5. 输出结果
print(type(weather_report))  # <class 'dict'> 或 Pydantic 模型
print("城市:", weather_report.get("location"))
print("温度:", weather_report.get("temperature"))
print("天气状况:", weather_report.get("condition"))
print(weather_report)

```

:::

## 🌵 LCEL 与 Runnable 协议

结合上面的内容，我们用到的 `Prompt`、`Model`、`OutputParser` 本质都是 `Runnable`。

这些组件有一个共同的调用：`invoke`，并且每一个组件的输出都是下一个组件的输入:

::: code-group

```python [] {}
prompt = ChatPromptTemplate.from_template("{query}")
llm = ChatOpenAI(model="gpt-3.5-turbo-16k")
parser = StrOutputParser()

output = parser.invoke(llm.invoke(prompt.invoke({"query": "你好"})))
```

:::

```
1. PromptTemplate：输入字典 → 输出 prompt 消息
2. ChatModel：输入消息 → 输出 AIMessage
3. OutputParser：输入 AIMessage → 输出结构化数据
```

这种写法虽然能实现对应的功能，但是存在很多缺陷：

```
嵌套式写法让程序的维护性与可阅读性大大降低，当需要修改某个组件时，变得异常困难。
没法得知每一步的具体结果与执行进度，出错时难以排查。
嵌套式写法没法集成大量的组件，组件越来越多时，代码会变成“一次性”代码。
```

> 与前端代码中的 回调地狱 非常相似

#### LCEL 表达式与 Runnable 可运行协议

#### Runnable = LangChain 中的“统一可运行单元”接口。

> 任何模型、解析器、函数、或组合管道都可以被包装成 Runnable，
> 提供统一的调用契约（invoke / batch / stream 等方法），从而实现可组合、可并行、可流式的工作流。

#### LCEL = 基于 Runnable 的声明式编程/编排层，

> 允许你用更简洁的表达式（或构建 Runnables 的原语）来组合、配置、并行化和部署链式工作流。
> 它是面向“描述任务要做什么”的语法糖/编排层，背后运行时会把这些描述编译为可执行的 Runnables。

LCEL 让你写出类似 `prompt | model | parser` 这种 `链式表达式（chain）`，
而不是一堆 `.invoke(...)` 嵌套。

> Prompt/Model/Parser 是砖块，Runnable 是标准接口，LCEL 是搭积木的语言。

#### 把 Prompt → ChatModel → OutputParser 串成一个 LCEL Pipeline

::: code-group

```python [] {}
# 1.构建组件
from LangChain_core.output_parsers import JsonOutputParser
from LangChain_core.prompts import ChatPromptTemplate
from LangChain_core.pydantic_v1 import BaseModel, Field
from LangChain_openai import ChatOpenAI

# 1. 定义输出结构
class TravelPlan(BaseModel):
    city: str = Field(description="推荐的城市")
    reason: str = Field(description="推荐的理由")
    must_try_food: str = Field(description="必尝的特色美食")

parser = JsonOutputParser(pydantic_object=TravelPlan)

# 2. 构建 Prompt（注意 partial 注入 format_instructions）
prompt = ChatPromptTemplate.from_template(
    "请根据用户的偏好推荐一个旅游目的地。\n"
    "{format_instructions}\n"
    "用户偏好: {preference}"
).partial(format_instructions=parser.get_format_instructions())

# 3. 创建模型
llm = ChatOpenAI(model="gpt-3.5-turbo")

# 4. chain：Prompt → Model → Parser
chain = prompt | llm | parser

# 5. 调用
result = chain.invoke({"preference": "喜欢海边和美食"})

print(result)
# 输出
"""
{
  "city": "巴塞罗那",
  "reason": "拥有美丽的地中海海岸线和丰富的文化氛围",
  "must_try_food": "海鲜饭（Paella）"
}
"""

```

:::

#### RunnableParallel 并行运行

`RunnableParallel` 是 LangChain 中封装的支持运行多个 `Runnable` 的类
，一般用于操作 `Runnable` 的输出，以匹配序列中下一个 `Runnable` 的输入，起到并行运行 `Runnable` 并格式化输出结构的作用。

例如 `RunnableParallel` 可以让我们同时执行多条 `Chain`，
然后以字典的形式返回各个 `Chain` 的结果，对比每一条链单独执行，效率会高很多:

上面的示例中，假设我们要同时生成 旅游计划 和 一句宣传文案，就可以这样：

::: code-group

```python [] {}
from LangChain_core.runnables import RunnableParallel

tagline_prompt = ChatPromptTemplate.from_template("请为 {city} 写一句旅游宣传标语")
tagline_chain = tagline_prompt | llm

parallel_chain = RunnableParallel({
    "plan": chain,       # 上面定义的 plan 链
    "tagline": tagline_chain
})

result = parallel_chain.invoke({"preference": "喜欢海边和美食", "city": "巴塞罗那"})
print(result)
# 输出
"""
{
  "plan": {"city": "巴塞罗那", "reason": "...", "must_try_food": "..."},
  "tagline": "巴塞罗那：阳光与海浪的味觉盛宴"
}
"""

```

:::

#### RunnablePassthrough 简化 invoke

`RunnablePassthrough` 顾名思义：直接把输入原样传递下去，不做任何处理。

在 `LCEL` 组合中，如果你需要把输入“直接带下去”给某个环节，可以用它来简化。
简单理解：它就是一个“什么都不干的 Runnable”。
可以在并行（RunnableParallel）里，既想保留原始输入，又想跑其他链。

> 恒等映射：输入啥 → 输出啥

示例模拟一个检索器功能, 这是 RAG 模式的典型用法:

这里定义了两个变量：`context` 和 `query`。
模型生成答案时，会把〈检索到的 `context` 与 用户的 `query`〉 一起传入。

::: code-group

```python [] {}
from LangChain_core.output_parsers import StrOutputParser
from LangChain_core.prompts import ChatPromptTemplate
from LangChain_core.runnables import RunnablePassthrough
from LangChain_openai import ChatOpenAI

# 真实场景里，这一步会去调用 向量数据库、知识库 API，返回相关上下文。
def retrieval(query: str) -> str:
    """一个模拟的检索器函数"""
    print("正在检索:", query)
    return "我是AI 助手"

# 1.编排prompt
# 这里定义了两个变量：context 和 query。
# 模型生成答案时，会把检索到的 context 与用户 query 一起传入。
prompt = ChatPromptTemplate.from_template("""请根据用户的问题回答，可以参考对应的上下文进行生成。

<context>
{context}
</context>

用户的提问是: {query}""")

# 2.构建大语言模型
llm = ChatOpenAI(model="gpt-3.5-turbo-16k")

# 3.输出解析器
parser = StrOutputParser()

# 4.构建链
chain = RunnablePassthrough.assign(context=lambda x: retrieval(x["query"])) | prompt | llm | parser

# 5.调用链
content = chain.invoke({"query": "你好，我是谁?"})

print(content)

```

:::

## 🌵 总结

- `Prompt` : 输入设计，保证模型方向正确；
- `Model` : 执行引擎，负责调用大语言模型；
- `OutputParser` : 输出治理，让结果可控、可用；
- `Runnable` : 统一接口，让所有组件能被组合；
- `LCEL` : 编排语言，让链条构建更直观；
- `Passthrough` & `Parallel` : 灵活扩展，支持上下文注入与多结果并行。
