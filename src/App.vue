<template>
  <router-view />
</template>

<style>
html,
body {
  min-height: 100% !important;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
}

* {
  font-family: Manrope, Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  /* Margin collapsing sux */
  display: inline-flex;
  flex-direction: column;
}

.screen-reader-text {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}

.btnBase {
  border: 1px solid rgba(0, 128, 106, 0.32);
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  background: #FFFFFF;
  cursor: pointer;
}
</style>
