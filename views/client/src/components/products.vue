<template>
  <div class="hello" v-if="product[$i18n.locale]">
  <Header></Header>
    <div class="banner">
	  	<img  src="../assets/banner1.jpg">
	  	<div class="mask-box">
	  		<div class="content-box">
	  			<div class="content">
	  				{{product[$i18n.locale].title}}
	  			</div>
	  		</div>
	  	</div>
	</div>
  <section class="main clear">
	   <ul class="product-list">
            <li
            v-if="product.list.length>0" 
            v-for="(val,vindex) in product.list"
            @mouseenter="productMouserEnter(index,vindex)" 
            @mouseleave="productMouserLeave(index,vindex)" 
            :class="{active:product.curIndex == vindex}" 
            class="product-list-item"
            @click.stop="gotoProductPage(val.id)"
            >
                <img :src="val.img_url[0]">
                <p>{{ val[$i18n.locale].title }}</p>
                <div class="mask-box"> 
                      {{$t('viewDetail')}}
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
      value: true,
      product:{},
    }
  },
  methods:{
    productMouserEnter(index,vindex){
      this.product.curIndex = vindex;
    },
    productMouserLeave(index,vindex){
      this.product.curIndex = -1;
    },
    gotoProductPage(id){
      this.$router.push({
        path:`/product/${id}`
      })
    },
    // 获取banner图列表
    getProductList(){
      console.log(this.$route.params.id);
      this.$http.get('/api/product',{
        params:{
          id:this.$route.params.id
        }
      }).then( res => {
          this.product = res.data.data;
          this.$set(this.product,'curIndex',-1);
          console.log(this.product);
        } )
    },
  },
  mounted(){
    this.getProductList();
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
			//border:1px solid #fff;
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
