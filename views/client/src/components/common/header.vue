<template>
  <header class="header" :style="{background: color}">
      <div class="container clear">
          <div class="logo" @click.stop="gotoIndexPage">
              <img src="../../assets/logo.png">
          </div>
          <div class="nav">  
              <ul class="nav-list">
              <!--     <li>关于我们</li>
                  <li>产品</li> -->
                  <li>
                    <el-dropdown @command="changLang">
                      <span class="el-dropdown-link">
                        中文/EN<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='zh'>中文</el-dropdown-item>
                        <el-dropdown-item command='en'>English</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </li>
                  <li @click='gotoIndexPage'>
                      {{$t('header.index')}}
                  </li>
                  <li @click="gotoAbout">
                      {{$t('header.about')}}
                  </li>
              </ul>
          </div>
      </div>
  </header>
</template>
  
<script>
export default {
  name: 'hello',
  props:['color'],
  data () {
    return {
      
    }
  },
  methods:{
    changLang(command){
      this.$i18n.locale = command;
    },
    gotoIndexPage(){
      this.$router.push({
          path:'/'
      });
    },
    gotoAbout(){
this.$router.push({
          path:'/about'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}


a {
  color: #42b983;
}
.header{
  position:relative;
/*  top:0;
  left:0;
  right:0;*/
  /*height:88px;*/
  z-index:1000;
}
.container{
  width:100%;
  max-width: 1240px;
  margin:0 auto;
  padding:0 15px;
  height:100px;
}
.logo{
  float:left;
  margin-top:10px;
  width:80px;
  /*height:66px;*/
}
.logo img{
  height:100%;
}
.nav{
  padding-right:40px;
  float:right;
  color:#fff;
  font-size:18px;
  line-height:40px;
  margin-top:24px;
}
.nav li{
  margin-left:20px;
  display: inline-block;
}
.nav li:hover{
  color:#42b983;
  cursor:pointer;
  
}
.el-dropdown-link{
  color:#fff;
  font-size:18px;
}
.el-dropdown-link:hover{
  color:#42b983;
}
</style>
