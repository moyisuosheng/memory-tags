# memory-tags

一个在桌面添加记忆标签的软件

## Project Setup

## Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```

## 通过 electron-vite 构建项目

```sh
# npm 6.x
npm create @quick-start/electron my-app --template vue

# npm 7+, extra double-dash is needed:
npm create @quick-start/electron my-app -- --template vue

# yarn
yarn create @quick-start/electron my-app --template vue

# pnpm
pnpm create @quick-start/electron my-app --template vue

```

### 安装Day.js

```
#安装Day.js
yarn add dayjs
```

### 使用Day.js

```
const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()
```

### 安装 antdv

```
yarn add ant-design-vue@4.x
```

### antdv全局完整注册

```
//index.js
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(Antd).mount('#app');
```

### 安装 unplugin-vue-components

```
yarn add unplugin-vue-components -D
```

### vite引入unplugin-vue-components

```js
// vite.config.js
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    // ...
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
});
```

