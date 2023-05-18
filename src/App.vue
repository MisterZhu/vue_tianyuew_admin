<template>
  <div id="app">
    <router-view />
  </div>
  <div class="page-footer">
      <p>Copyright 2023 aimissu.top <a class="no-underline" href="https://beian.miit.gov.cn/">豫ICP备2023005297号-1</a></p>
  </div>
</template>

<style>
html,
body,
#app {
  widows: 100%;
  height: 100%;
}
.page-footer {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
p, p a {
  color: #666;
}
.no-underline {
  text-decoration: none;
}

</style>
