<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
#app {
  font-family: "Microsoft YaHei",'微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  background: url(./assets/bg.jpg) center center 100% 100%;
}
img{
  width:100%;
  vertical-align:middle;
}
.clear{
  content:"";
  display:table;
  width:0;
  height:0;
  clear:both;
}
// 简单的过渡动画
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
