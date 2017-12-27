<template>
  <div class="hello">
  <Header color='#000'></Header>
    
  <section class="main">
  	<!-- 轮播插件 -->
    <el-carousel class="el-carousel" height='300px' :autoplay='true' :interval="5000">
    <el-carousel-item class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
    </el-carousel-item>
    </el-carousel>
  </section>
 
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './common/header';
import Footer from './common/footer';
export default {

  name: 'HelloWorld',
  components:{
    Header,
    Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: true,
      // 当前家具的选中的
      jiajuSelectedIndex:0,
    }
  },
  watch:{
    // 中英文切换
    value(val,newVal){
      this.$i18n.locale = this.$i18n.locale == 'zh' ? 'en' : 'zh';
    },
  },
  methods:{
    mouserEnter(){
      this.jiajuSelectedIndex = 1;
    },
    mouserLeave(){
      this.jiajuSelectedIndex = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #fff;
}
.el-carousel-item-img{
  height:100%;
}
.part{
  width:1240px;
  margin:0 auto;
}
.part h1{
    color: #333;
    font-size: 40px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    background:url('../assets/title-bg2.png') no-repeat center bottom;
    background-size:200px 12px;
}

</style>
