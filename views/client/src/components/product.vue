<template>
  <div class="hello">
  <Header color='#212224'></Header>
 <!--  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>   -->
  <section class="main clear">
  	<!-- 轮播插件 -->
    <div class="el-carousel">
    <div v-for='(item,index) in product.img_url'  class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' preview="0" :src="item">
    </div>
    </div>
   <!--  <el-carousel class="el-carousel" indicator-position="outside" :autoplay='true'
 :interval="5000">
    <el-carousel-item v-for='(item,index) in product.img_url'  class="el-carousel-item" :key="item">
        <img class='el-carousel-item-img' preview="0" :src="item">
    </el-carousel-item>
    </el-carousel> -->
    <div class="content ">
        <h3 class="title">{{product[$i18n.locale].title}} </h3>
        <p class="desc">
          {{product[$i18n.locale].desc}}
        </p>
        <p class="desc desc2">
          ({{$t('zoomTip')}})
        </p>
        <div class="contact-us" @click="gotoCompany">
            {{$t('contactBtn')}}
        </div>
    </div>
  </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './common/header';
import Footer from './common/footer';
import { Loading } from 'element-ui';
export default {

  name: 'HelloWorld',
  components:{
    Header,
    Footer
  },
  data () {
    return {
      id:1,
      product:{}
    }
  },
  methods:{
    // 获得一个产品的详情
    getProductDetail(){
      let loading = Loading.service({ fullscreen: true });
      console.log(this.$route.params);
      this.id = this.$route.params.productId;
      console.log(this.id);
      this.$http.get('/api/productDetail',{
            params:{
                id:this.id
            }
        }).then( res => {
          this.product = res.data.data;
           this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loading.close();
          });
        } )
    },
    gotoCompany(){
      this.$router.push({
        path:'/about'
      })
    }
  },
  mounted(){
    this.getProductDetail();
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
  .desc2{
    color:#333;
  }
}
.contact-us{
  border-radius:5px;
  background:rgba(0,0,0,.7);
  color:#fff;
  padding:10px 20px;
  margin-top:20px;
  display:inline-block;
  cursor:pointer;
  &:hover{
    background:rgba(0,0,0,0.9);
  }
}
.el-carousel{
  cursor:pointer;
}

</style>
