<template>
  <div class="hello">
  <Header></Header>
    
  <!-- 轮播插件 -->
    <el-carousel class="el-carousel" height='700px' :autoplay='true' :interval="5000">
    <el-carousel-item v-for="(item,index) in banner" class="el-carousel-item" :key="'banner'+index">
        <img class='el-carousel-item-img' src="../assets/banner1.jpg">
        <div class="el-carousel-item-box">
            <div class="content">
                <h1>{{ item.lang[$i18n.locale].title }}</h1>
                <p>{{ item.lang[$i18n.locale].desc}}</p>
                <div class="button" v-if="item.link" @click="gotoPage(item.link)">{{$t('viewDetail')}}</div>
            </div>
        </div>
    </el-carousel-item>
  </el-carousel>
  <!-- 家具产品 -->
    <section class="part" v-for="(item,index) in product">
        <h1>{{ item[$i18n.locale].title }} <span  class="load_more" @click="gotoProductsPage(item.id)">{{$t('viewMore')}}></span></h1>
        <ul class="product-list">
            <li 
            v-for="(val,vindex) in item.list"
            @mouseenter="productMouserEnter(index,vindex)" 
            @mouseleave="productMouserLeave(index,vindex)" 
            :class="{active:item.curIndex == vindex}" 
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
      msg: 'Welcome to Your Vue.js App',
      value: true,
      
      // 当前家具的选中的
      jiajuSelectedIndex:0,
      // 当前石材的选中的
      shicaiSelectedIndex:0,
      banner:[],
      product:[],
    }
  },
  computed:{

  },
  watch:{
    
  },
  methods:{
    productMouserEnter(index,vindex){
      this.product[index].curIndex = vindex;
    },
    productMouserLeave(index,vindex){
      this.product[index].curIndex = -1;
    },
    gotoPage(url){
      location.href = url;
    },
    gotoProductPage(id){
      this.$router.push({
        path:`/product/${id}`
      })
    },
    gotoProductsPage(id){
      this.$router.push({
        path:`/products/${id}`
      })
    },
    // 获取banner图列表
    getBannerList(){
      this.$http.get('/api/banner/list')
        .then( res => {
          this.banner = res.data.data;
          console.log(this.banner);
        } )
    },
    // 获取banner图列表
    getProductList(){
      this.$http.get('/api/product')
        .then( res => {
          this.product = res.data.data;
          this.product.forEach( (val,index) => {
            // 要注意把数据绑定到固定的数值中
            this.$set(this.product[index],'curIndex',-1);
          } )
          console.log(this.product);
        } )
    },
  },
  mounted(){
    this.getBannerList();
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
    position:relative;
    .load_more{
      position:absolute;
      right:20px;
      font-size:18px;
      bottom:10px;
      cursor:pointer;
    }
    .load_more:hover{
      color:#999;
    }
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
    font-size:20px;
    text-align:center;
    color:#000;
    width:160px; 
    background:rgba(255,255,255,.7);
    border:1px solid #fff;
  }
  .button:hover{
    background:#000;
    color:#fff;
  }
}

</style>
