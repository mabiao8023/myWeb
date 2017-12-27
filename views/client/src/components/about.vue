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
        <h3 class="title">公司简介</h3>
        <p class="desc">
          「意大利之家」创建于2000年，总部位于米兰，主要从事建材与家居的商贸业务。<br>
2010年，正式进入中国，在北京成立全资子公司——北京恒邦信大国际贸易有限公司，之后相继在上海、深圳、杭州、成都、青岛、贵阳分别成立了分公司，专注搭建意大利高端家居综合服务平台。<br>
「意大利之家」目前已与欧洲2500多个家居建材品牌建立合作，成为中国市场上欧洲进口家居建材一站式服务专业平台。在家居及生活方式领域，俨然已是意大利设计、艺术、文化的传播使者。<br>
另外，「意大利之家」在北京、上海、深圳等地开设了线下大型家居艺术体验馆。未来2年将陆续在南京、宁波、大连、厦门、等一线城市/发达城市建立线下意大利家居体验馆，完成中国13个城市的发展布局。
</p>
<p class="desc">
尊享热线：4000-650-601 &nbsp;&nbsp;邮箱：info@italyclassico.com<br>
Milano | Via Einaudi, 4-20068 Peschiera Borromeo (MI) Italy<br>	
北京体验馆地址：北京市朝阳区将台乡大环里环铁艺术城北区B-004栋<br>
上海体验馆地址：上海市徐汇区文定路209号文定生活A座6层<br>
 杭州体验馆地址：杭州市下城区长城街22号208室<br>
深圳体验馆地址：深圳市南山区侨香路与深云路交汇处智慧广场B座一单元10楼A室<br> 
 成都体验馆地址：四川省成都市高新区天府二街368号房天下大厦1607<br>
 青岛体验馆地址：青岛市市南区香港中路8号中铁青岛中心A座1203<br>
贵阳体验馆地址：贵州省贵阳市观山湖区明诚•景怡苑12组团11栋102<br>
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
