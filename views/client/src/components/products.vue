<template>
  <div class="hello">
  <Header></Header>
    <div class="banner">
	  	<img  src="../assets/banner1.jpg">
	  	<div class="mask-box">
	  		<div class="content-box">
	  			<div class="content">
	  				家具
	  			</div>
	  		</div>
	  	</div>
	</div>
  <section class="main clear">
	 <ul class="product-list">
            <li 
            @mouseenter="shicaimouserEnter(1)" 
            @mouseleave="shicaimouserLeave" 
            :class="{active:shicaiSelectedIndex == 1}"
             class="product-list-item"
            @click.stop="gotoProductPage()" >
                <img src="../assets/jiaju1.jpg">
                <p>家具1</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
            <li class="product-list-item" @mouseenter="shicaimouserEnter(2)" @mouseleave="shicaimouserLeave" :class="{active:shicaiSelectedIndex == 2}"
              @click.stop="gotoProductPage()">
                <img src="../assets/jiaju2.jpg">
                <p>家具2</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
            <li class="product-list-item" @mouseenter="shicaimouserEnter(3)" @mouseleave="shicaimouserLeave" :class="{active:shicaiSelectedIndex == 3}"
              @click.stop="gotoProductPage()">
                <img src="../assets/jiaju3.jpg">
                <p>家具3</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
            <li class="product-list-item" @mouseenter="shicaimouserEnter(4)" @mouseleave="shicaimouserLeave" :class="{active:shicaiSelectedIndex == 4}" @click.stop="gotoProductPage()">
                <img src="../assets/jiaju4.jpg">
                <p>家具4</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
             <li 
            @mouseenter="shicaimouserEnter(1)" 
            @mouseleave="shicaimouserLeave" 
            :class="{active:shicaiSelectedIndex == 1}"
             class="product-list-item"
            @click.stop="gotoProductPage()" >
                <img src="../assets/jiaju1.jpg">
                <p>家具1</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
            <li class="product-list-item" @mouseenter="shicaimouserEnter(2)" @mouseleave="shicaimouserLeave" :class="{active:shicaiSelectedIndex == 2}"
              @click.stop="gotoProductPage()">
                <img src="../assets/jiaju2.jpg">
                <p>家具2</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
            <li class="product-list-item" @mouseenter="shicaimouserEnter(3)" @mouseleave="shicaimouserLeave" :class="{active:shicaiSelectedIndex == 3}"
              @click.stop="gotoProductPage()">
                <img src="../assets/jiaju3.jpg">
                <p>家具3</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
            </li>
            <li class="product-list-item" @mouseenter="shicaimouserEnter(4)" @mouseleave="shicaimouserLeave" :class="{active:shicaiSelectedIndex == 4}" @click.stop="gotoProductPage()">
                <img src="../assets/jiaju4.jpg">
                <p>家具4</p>
                <div class="mask-box"> 
                      查看产品详情
                </div>
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
      shicaiSelectedIndex:0,
    }
  },
  watch:{
    // 中英文切换
    value(val,newVal){
      this.$i18n.locale = this.$i18n.locale == 'zh' ? 'en' : 'zh';
    },
  },
  methods:{
    shicaimouserEnter(index){
      this.shicaiSelectedIndex = index;
    },
    shicaimouserLeave(){
      this.shicaiSelectedIndex = -1;
    },
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
  width:400px;
  height:400px;
  float:left;
}
.banner{
	margin-top:-88px;
	position:relative;
	height:300px;
	overflow:hidden;
	.mask-box{
		position:absolute;
		top:0;left:0;right:0;bottom:0;
		background:rgba(0,0,0,.5);
		.content-box{
			width:200px;
			height:80px;
			border:1px solid #fff;
			position:absolute;
			top:50%;
			left:50%;
			margin-left:-100px;
			margin-top:-40px;
			color:#fff;
			font-size:30px;
			line-height:80px;
			text-align:center;
		}
	}
}

.product-list{
  width:100%;
  font-size:0;
}
.product-list li{
  display:inline-block;
  width:25%;
  padding:10px;
  position:relative;
  height:364px;
  overflow: hidden;
  margin-bottom:20px;
  border:1px solid #eee;
}
 .product-list li p{
  font-size:20px;
  padding:10px;
}
.product-list li:hover{
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
  background:#212224;
  z-index: 100;
  font-size:20px;
  padding-top:160px;
  color:#fff;
  opacity: 0;
  transition:all .5s linear;
}
.product-list li.active .mask-box{
  opacity: 1;
}

</style>
