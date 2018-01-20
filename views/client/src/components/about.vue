<template>
  <div class="hello">
  <Header></Header>
    <div class="banner">
	  	<img  src="../assets/banner1.jpg">
	  	<div class="mask-box"></div>
	</div>
  <section class="main clear">
	 <!--  <div class="el-carousel">
	  	<img  src="../assets/banner1.jpg">
	  </div> -->
    
    <div class="content ">
        <h3 class="title">{{$t('companyIntroTitle')}}</h3>
        <p class="desc" v-for="(item,index) in $t('company.intro')">{{item}}</p>
          <br/>
        <p class="desc" v-for="(item,index) in $t('company.address')">{{item}}</p>
         <br/>
        <p class="desc" v-for="(item,index) in $t('company.contact')">{{item}}</p>
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
  width:400px;
  height:400px;
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
.banner{
	margin-top:-88px;
	position:relative;
	height:300px;
	overflow:hidden;
	.mask-box{
		position:absolute;
		top:0;left:0;right:0;bottom:0;
		background:rgba(0,0,0,.5);
	}
}
</style>
