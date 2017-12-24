<template>
  <div class="hello">
  <Header></Header>
    
  <!-- 轮播插件 -->
    <el-carousel height='700px' :autoplay='true' :interval="5000" arrow="always">
    <el-carousel-item :key="item">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
    </el-carousel-item>
    <el-carousel-item :key="item">
        <img class='el-carousel-item-img' src="../assets/banner2.jpg">
    </el-carousel-item>
    <el-carousel-item :key="item">
        <img class='el-carousel-item-img' src="../assets/banner3.jpg">
    </el-carousel-item>
  </el-carousel>
  <!-- 家具产品 -->
    <section class="part">
        <h1>家具</h1>
        <ul class="product-list">
            <li @mouseenter="mouserEnter" @mouseleave="mouserLeave" :class="{active:jiajuSelectedIndex == 1}" class="product-list-item">
                <img src="../assets/jiaju1.jpg">
                <p>家具1</p>
                <div class="mask-box"> 
                    <router-link to='/'>
                      查看产品详情
                    </router-link>
                </div>
            </li>
            <li class="product-list-item">
                <img src="../assets/jiaju2.jpg">
                <p>家具2</p>
            </li>
            <li class="product-list-item">
                <img src="../assets/jiaju3.jpg">
                <p>家具3</p>
            </li>
            <li class="product-list-item">
                <img src="../assets/jiaju4.jpg">
                <p>家具4</p>
            </li>
        </ul>
    </section>
     <section class="part">
        <h1>石材</h1>
        <ul class="product-list">
            <li @mouseenter="mouserEnter" @mouseleave="mouserLeave" :class="{active:jiajuSelectedIndex == 1}" class="product-list-item">
                <img src="../assets/jiaju1.jpg">
                <p>家具1</p>
                <div class="mask-box"> 
                    <router-link to='/'>
                      查看产品详情
                    </router-link>
                </div>
            </li>
            <li class="product-list-item">
                <img src="../assets/jiaju2.jpg">
                <p>家具2</p>
            </li>
            <li class="product-list-item">
                <img src="../assets/jiaju3.jpg">
                <p>家具3</p>
            </li>
            <li class="product-list-item">
                <img src="../assets/jiaju4.jpg">
                <p>家具4</p>
            </li>
        </ul>
    </section>
  </div>
</template>

<script>
import Header from './common/header';
export default {

  name: 'HelloWorld',
  components:{
    Header
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
<style scoped>
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
}
.part .product-list{
  width:100%;
  font-size:0;
}
.part .product-list li{
  display:inline-block;
  width:25%;
  padding:10px;
  position:relative;
  height:364px;
  overflow: hidden;
  margin-bottom:20px;
  /*border:1px solid #eee;*/
}
.part .product-list li p{
  font-size:20px;
  padding:10px;
}
.part .product-list li:hover{
  /*box-shadow: 0 2px 10px rgba(0,0,0,.5);*/
  cursor: pointer;
}
.product-list li img{
  height:300px;
}
.product-list li .mask-box{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background:rgba(0,0,0,.5);
  z-index: 100;
  font-size:20px;
  padding-top:160px;
  opacity: 0;
  transition:all .5s linear;
}
.product-list li.active .mask-box{
  opacity: 1;
}
</style>
