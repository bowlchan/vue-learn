<template>
  <div id="app">
    <div id="header">
      <div class="wrapper">
        <h1>mini-blog</h1>
        <div id="nav">
          <router-link to="/">timeline</router-link>
          <span class="split">|</span>
          <router-link to="/profile">profile</router-link>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#header {
  background-color: #2c3e50;
  color: #fff;
  line-height: 4em;
  height: 4em;
}

.wrapper {
  display: flex;
  width: 800px;
  margin: 0 auto;
}
.content {
  width: 100%;
}

#header h1 {
  flex-grow: 2;
  margin: 0px;
}
#nav {
  margin: 0px;
  right: 0px;
}

#nav a {
  font-weight: bold;
  color: #aaaaaa;
}

#nav .split {
  padding: 0 0.5em;
}
</style>
