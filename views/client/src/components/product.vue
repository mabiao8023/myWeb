<template>
  <div class="hello">
  <Header color='#212224'></Header>
    
  <section class="main clear">
  	<!-- 轮播插件 -->
    <el-carousel class="el-carousel" indicator-position="outside" :autoplay='true' height="400px"
 :interval="5000">
    <el-carousel-item class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
    </el-carousel-item>
    <el-carousel-item class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
    </el-carousel-item>
    <el-carousel-item class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
    </el-carousel-item>
    </el-carousel>
    <div class="content ">
        <h3 class="title">家具沙发</h3>
        <p class="desc">
          小尺度沙发，轮廓清爽干脆，后背双弧线造型，让肩和腰的支撑更为舒适。30度清新转角让空间布局充满灵动感，每一刻都是幸福的彼岸。小尺度沙发，轮廓清爽干脆，后背双弧线造型，让肩和腰的支撑更为舒适。30度清新转角让空间布局充满灵动感，每一刻都是幸福的彼岸。
        </p>
    </div>
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
.part h1{
    color: #333;
    font-size: 40px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    background:url('../assets/title-bg2.png') no-repeat center bottom;
    background-size:200px 12px;
}
.main{
  max-width:1240px;
  width:100%;
  margin:20px auto;
  padding:40px;
}
.el-carousel{
  width:800px;
  float:left;
}
.content{
  overflow: hidden;
  padding-left:60px;
  text-align:left;
  .title{
    color: #333137;
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .desc{
    font-size: 16px;
    color: #858585;
    line-height: 2em;
  }
}
</style>
