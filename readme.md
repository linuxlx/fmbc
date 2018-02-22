# JD Game项目脚手架

#### TODO:

- [ ] js-bridge拿配置
- [ ] js-bridge登陆
- [ ] dist deploy test
- [x] bundled js hash name [参考](https://github.com/packingjs/replace-hash-webpack-plugin)
- [ ] i18n with moment format auto config 
- [ ] [html-webpack-plugin](https://github.com/sorrycc/roadhog/issues/69)
- [x] 环境变量切换
- [x] 注入环境变量
- [x] 切换页面注销轮询（离开页面自动注销所有）
- [x] 竞猜人数
- [x] 钱包余额显示逻辑
- [x] 切换页面注销轮询（手动）
- [x] 获取gameConfig
- [x] 首页loading
- [X] 标题栏自动返回按钮
- [x] 获取钱包余额
- [X] 轮询的注册与反注册(见gamePortal的subscription)
- [X] 章鱼API proxy
- [X] [Fractal Project Structure](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) example in route: game
- [X] common antd <b>Modal</b>
- [X] ICON
- [X] 高清解决方案
- [X] antd mobile lib
- [X] react-router-redux
- [X] 分模块加载路由
- [X] react helmet
- [X] layout
- [x] persist store
- [X] react router redux
- [X] Lint错误自动修复
- [X] indexRoute
- [X] mock
- [X] reselect
- [X] dva loading
- [X] i18n
- [X] custome webpack config [参考](https://github.com/sorrycc/roadhog/issues/304)

#### Deprecated Techs:
- [ ] <del>seamless immutable</del>[ why?](https://github.com/sorrycc/blog/issues/1) 
- [ ] <del>登陆模块和redux化token</del> 使用jd账户系统

## 目录导航
1. [技术栈](#技术栈)
1. [配置要求](#配置要求)
1. [安装](#安装)
1. [组织结构](#组织结构)
1. [开发工具](#开发工具)
1. [路由](#路由)
1. [部署](#部署)

## 技术栈
* [dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)
* [ant mobile](https://mobile.ant.design)
* [dva-cli](https://github.com/dvajs/dva-cli)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [webpack](https://github.com/webpack/webpack)
* [eslint](http://eslint.org)
* [roadhog](https://github.com/sorrycc/roadhog)

## 配置要求
* node `^6.8.1`(更低版本未测试)
* yarn `^0.17.0`（推荐） or npm `^3.0.0`

## 快速开始

请确认系统环境符合配置要求，然后:

### 安装

```bash
$ git clone http://git.8win.com/zy-h5/zy-h5-game.git
$ cd zy-h5-game
```

安装npm packages. 推荐使用 [Yarn](https://yarnpkg.com/),  当然 `npm install` 同样奏效。 

```bash
$ yarn install    
$ yarn start      
```
成功的话 将会有项目页面在浏览器弹出，并且在terminal显示：

``` bash
Compiled successfully!

The app is running at:

  http://localhost:8000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|运行项目 `localhost:8000`. dev环境热替换模块自动开启|
|`build`|输出静态文件 (`~/dist`).|
|`lint`|Lint 所有的 `.js` 文件.|
|`lint:fix`|修复Lint错误(未完成！) [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).| 

## 组织结构

路由组织参考：
 **fractal** 结构, 参考阅读[关于fractal](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── (dist)                   # run build 后生成的静态文件 
├── mock                     # 开发用mock
├── public                   # 不被引入的静态文件
├── src                      # Application source code
│   ├── index.js             # 初始化dva的入口文件
│   ├── index.less           # 全局css
│   ├── router.js            # 顶级路由和全局路由定义，所有的子路由也将在此引用
│   ├── containers           # Global Reusable Container Components
│   ├── assets               # 需要import的项目通用静态文件
│   │   └── layouts          # 模块文件夹
│   │      └── xxx.jpg       # 静态文件
│   │   └── users          
│   ├── utils                # 项目通用工具函数
│   │   └── xxxparser.js     # 某转换方法
│   ├── components           # 项目级通用组件，除layout外应都是pure component
│   │   ├── modal            # 通用组件示例 
│   │   │   ├── index.js     # 通用组件文件
│   │   ├── Layouts          # 布局组件
│   │   │   ├── MainLayout.js 
│   │   │   ├── mainL.css    
│   │   │   ├── LoginLayout  
│   │   │   └── LogLayout.css
│   ├── routes               # 基于页面路由的模块
│   │   ├── Home             # 首页木块
│   │   │   ├── index.js     # Route定义
│   │   │   ├── assets       # 静态文件夹
│   │   │   ├── components   # pure 组件夹
│   │   │   ├── models       # dva的model定义文件夹
│   │   │   ├── containers   # container组件文件夹
│   │   │   ├── constants    # 常量文件夹
│   │   │   └── routes **    # 子路由（如果有）
│   │   └── user             # 另一个路由
│   │       ├── ...
│   ├── services             # 获取数据部分
│   │   ├── users.js         # users部分的数据获取
└── tests                    # 单元测试(未完成)
```

## 开发

#### 开发工具

**推荐使用 [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

### 路由
`react-router` 我们没有使用jsx路由，而是使用了plain route. 参考： [路由定义](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute)


## 部署
`npm run build`

### 静态部署
使用nginx, 将路由请求指向 `~/dist/index.html` ，由react router负责后续路由。 [参考文件](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful. The Express server that comes with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.

### 全局变量

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`process.env.API_HOST`|API end point|
|`process.env.PUBLIC_PATH`|部署的子文件夹，影响wwebpack打包后查找文件路径|
|`process.env.NODE_ENV_QA`|是测试环境时为1|

项目使用 [better-npm-run](https://github.com/benoror/better-npm-run) 向npm script添加环境变量，如果环境变量涉密请使用gitignore后的.env文件。
better-npm-run注入的env只在roadhog环境生效，所以增加新的key必须在.roadhogrc.js中的define映射相应的key到项目环境

### Styles

`less`,`scss`和`css`文件都可以直接被import.
[框架已经直接定义了css modulus](https://github.com/dvajs/dva-knowledgemap#理解-css-modules), 可直接起简单类名，无需关心命名空间问题

## npm packages
* [lodash](https://lodash.com/docs/4.17.4) js 工具库
* [moment](http://momentjs.cn/docs/) 时间格式和时区管理
* [reselect](https://github.com/reactjs/reselect) 计算和缓存衍生数据, [为什么要使用reselect](http://cn.redux.js.org/docs/recipes/ComputingDerivedData.html)
* [react-i18next](https://react.i18next.com/getting-started.html) 国际化与多语言



