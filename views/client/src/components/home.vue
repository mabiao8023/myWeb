<template>
  <div class="hello">
  <Header></Header>
    
  <!-- 轮播插件 -->
    <el-carousel class="el-carousel" height='700px' :autoplay='true' :interval="5000">
    <el-carousel-item class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
        <div class="el-carousel-item-box">
            <div class="content">
                <h1>REX</h1>
                <p>设计永恒的美，受到珍贵的自然材料的启发，协调了地板和墙壁的装饰。历史悠久的传统结合最新的陶瓷设计趋势为您打造理想的住宅、酒店、餐馆、商店和健康中心！</p>
                <div class="button">查看详情</div>
            </div>
        </div>
    </el-carousel-item>
    <!-- <el-carousel-item :key="item">
        <img class='el-carousel-item-img' src="../assets/banner2.jpg">
    </el-carousel-item>
    <el-carousel-item :key="item">
        <img class='el-carousel-item-img' src="../assets/banner3.jpg">
    </el-carousel-item> -->
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
  border:1px solid #eee;
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

.el-carousel-item{
  /*position:relative;*/
}
.el-carousel-item-box{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background: rgba(0,0,0,.4);
  z-index:100;
}
.el-carousel{
  margin-top:-88px;
}
.el-carousel .content{
  position:absolute;
  top:50%;
  left:50%;
  width: 674.5px;
  height: 371px;
  color:#fff;
  margin-top: -185.5px;
  margin-left: -337.25px;
  border:1px solid #fff;
  border-radius:5px;
  background:rgba(0,0,0,.3);
  padding:40px;
  h1{
    font-size:46px;
    padding:20px;
    border-bottom:2px solid #fff;
  }
  p{
    width:450px;
    text-align:center;
    margin:0 auto;
    line-height:2;
    font-size:16px;
  }
  .button{
    cursor: pointer;
    margin:20px auto;
    padding:10px 0;
    text-align:center;
    color:#000;
    width:100px;
    background:rgba(255,255,255,.7);
    border:1px solid #fff;
  }
  .button:hover{
    background:#000;
    color:#fff;
  }
}

</style>
