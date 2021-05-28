# vue2-template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 사용법
```
1. 화면을 담당할 vue파일을 만들어 views 폴더 아래에 위치시킨다.
   views/부모컴포넌트.vue + views/라우트칠드런폴더/컴포넌트이름.vue 
   컨텐츠 영역으로써 라우터가 찾아야할 파일을 추가한다.
   테마를 일관성 있게 하려면 원본 소스의 도큐먼트를 참조한다.
   도큐먼트 사이트 : https://www.creative-tim.com/learning-lab/bootstrap-vue/overview/argon-dashboard

2. 라우트 추가 (추가된 화면을 찾을 수 있게)
   routes/routes.js 에서 라우트 추가.

3. 메뉴에서 새로 만든 화면으로 올 수 있도록 추가하기
   MainLayout.vue 의 좌축 네비게이션을 등록해준다.
```

## 기타 정보 : 무료소스에 함수는 정의되어 있으나 네비게이션의 서브메뉴 관련 코드가 빠져 있어서 추가해줌.
```
SidebarPlugin/SideBar.vue
단순 <slot name="links"></slot>였다. 같은 창작팀의 다른 무료소스 참조하여 아래와 같이 변경함.
즉, 서브목록이 있는 메뉴인경우 다음과 같이 바꿔주면 된다.

<slot name="links">
    <!-- 서브메뉴 -->
    <sidebar-item
    v-for="(link, index) in sidebarLinks"
    :key="link.name + index"
    :link="link"
    >
        <sidebar-item
            v-for="(subLink, index) in link.children"
            :key="subLink.name + index"
            :link="subLink"
        >
        </sidebar-item>
    </sidebar-item>
    <!-- 서브메뉴 -->
</slot>

MainLayout.vue에서는 서브메뉴를 추가할 시 메뉴의 속에 아래와 같이 중첩해서 넣어주면 된다.
<sidebar-item
    :link="{
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    }"
>
    <sidebar-item
    :link="{
        name: 'Dashboard',
        path: '/dashboard'
        }"
        >
    </sidebar-item>
    <sidebar-item
    :link="{
        name: 'Icons',
        path: '/icons'
        }"
        >
    </sidebar-item>
</sidebar-item>

물론 routes.js 안에 필요한 컴포넌트들을 등록해 주어야한다.

```

### custom add
```
오픈 소스
https://www.creative-tim.com/product/vue-argon-dashboard
Main.js 안에서 (Dashoboard-plugin.js) 네이밍 변경.
Plugins/dashboard-plugin.js -> main-plugin.js 네임이 변경
views/Layout/DashboardLayout.vue -> MainLayout.vue
views/Layout/DashboardNavbar.vue -> MainNavbar.vue

결과적으로 vue-cli 디폴트에서 추가된 부분
npm install axios
npm i vuex-persistedstate

npm install vue bootstrap bootstrap-vue
npm install element-ui -S

npm install vue-quill-editor --save

package.json add + npm i

"chart.js": "^2.9.3",
"d3": "^5.7.0",
"datamaps": "^0.5.9",
"date-fns": "^1.30.1",
"dropzone": "^5.5.1",
"es6-promise": "^4.1.1",
"flatpickr": "^4.5.7",
"fuse.js": "^3.2.0",
"google-maps": "^3.2.1",
"nouislider": "^12.1.0",
"perfect-scrollbar": "^1.3.0",
"quill": "^1.3.6",
"sweetalert2": "^9.5.4",
"vee-validate": "^3.2.1",
"vue-chartjs": "^3.5.0",
"vue-clipboard2": "^0.3.0",
"vue-flatpickr-component": "^8.1.2",
"vue2-transitions": "^0.2.3"

"node-sass": "^4.12.0",
"sass-loader": "^7.1.0",


lint block with develop
--skip-plugins @vue/cli-plugin-eslint
```

### error history
```
# 1. vue.config.js -> publicPath: '/'로 설정하여 해결.
Uncaught SyntaxError: Unexpected token <

# 2. vue script1002: 구문 오류 (https://www.programmersought.com/article/4208331093/)
npm install babel-polyfill --save-dev
# main.js에 추가
import 'babel-polyfill'
# vue.config.js
configureWebpack: {
    entry: { app: ["babel-polyfill", "./src/main.js"] }
}
# IE11
data(){}, created() 등을 아래 형태로 바꾼다.
data: function () {
    return {}
}
```

### error 슈팅 도와주는 설정. vue.config.js 참조
```
# 참조 : https://jacklyons.me/how-to-fix-vuejs-not-working-in-ie11/
configureWebpack: {
      entry: ["babel-polyfill", "./src/main.js"],
      optimization: {
        runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              }
            }
          }
        }
      }
    }
```