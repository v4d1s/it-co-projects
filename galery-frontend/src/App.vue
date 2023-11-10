<template>
  <div class="app">
    <div class="navbar">
      <h1>Галерея проектов</h1>
      <router-link class="router-link" to="/projects">Список проектов</router-link>
      <router-link class="router-link" to="/project">Создать проект</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 60em
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.navbar {
  width: 100%;
  height: 50px;
  background-color: bisque;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.router-link {
  padding: 15px 10px;
  color: black;
  font-size: 18px;
}
</style>
