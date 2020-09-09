# 2. Vue-routerによる複数画面アプリの作成

![image_04.png](image_04.png)

Vue-routerを用いることで、URLパスの値によって異なる画面（コンポーネント）を表示することができる。画面とコンポーネントの対応は`src/router/index.ts`で定義されており、この設定を変更してURLパスごとにどのコンポーネントにRoutingするかを決めることができる。

```javascript
...
  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
...
```

Routerによって選択されたコンポーネントは`src/App.vue`内の以下の箇所にマウントされる。

```javascript
...
    <router-view />
...
```
なお、


## 2.1. 画面コンポーネントの作成

mini-blogアプリではtimeline画面とprofile画面を切り替える仕様とする。`src/views/Timeline.vue`という名前で以下の内容のファイルを作成する。コードの中身については後述する。

```javascript
<template>
  <div class="timeline">
    <h1>Timeline</h1>
    <ul>
      <li v-for="tweet in tweets" v-bind:key="tweet.id">
        {{tweet.message}}
        <span class="date">[{{tweet.date | dateFilter}}]</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Timeline",
  data: () => {
    return {
      tweets: [
        {
          id: 3,
          message: "よく考えたら休日だった😇",
          date: "2020-09-05T01:44:00.000Z"
        },
        {
          id: 2,
          message: "ご飯食べる時間ない🥺ぴえん",
          date: "2020-09-05T01:41:00.000Z"
        },
        {
          id: 1,
          message: "やばい寝坊した😱",
          date: "2020-09-05T01:40:00.000Z"
        }
      ]
    };
  },
  filters: {
    dateFilter: date => new Date(date).toLocaleString()
  }
});
</script>
<style scoped>
.date {
  size: 0.8em;
}
</style>
```

同様に`src/views/Profile.vue`についても以下の通り作成する

```javascript
<template>
  <div class="timeline">
    <h1>Profile</h1>
    <p>todo</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Profile"
});
</script>
<style scoped>
</style>
```
