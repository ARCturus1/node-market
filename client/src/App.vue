<template>
  <div id="app">
    <header>
        <div class="container">
            <div class="logo">Company</div>
            <nav>
                <ul>
                    <li><a href="" class="menu-item">Главная</a></li>
                    <li><a href="" class="menu-item">Наши работы</a></li>
                    <li><a href="" class="menu-item">Галерея</a></li>
                    <li><a href="" class="menu-item">О нас</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <router-view/>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header {
  display: flex;
  height: 20vh;
  align-content: center;
}
header .container {
    width: 960px;
}
header .container .logo{
    font-size: 2.5em;
}
body {
  margin: 0;
  font-size: 14px;
}
header,
footer {
  width: 100%;
  background-color: rgb(37, 43, 49);
  color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
footer {
  height: 10vh;
  position: absolute;
  bottom: 0;
}
</style>
