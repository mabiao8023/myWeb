<template>
  <footer class="footer">
	  <div class="footer-container">
	  	  <ul class='footer-list'>
	  	   	 <!-- <li v-for="(item,index) in $t('company.contact')">{{item}}</li> -->
	      	 <li v-for="(item,index) in $t('company.address')">{{item}}</li>
	      	 <li>Copyright © 2018 {{$t('company.name')}}</li>
	      </ul>
	  </div>
  </footer>
</template>
  
<script>
export default {
  name: 'hello',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="less" rel="stylesheet/less">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
.footer{
	width:100%;
	background:#212224;
	color:#888889;
	padding:30px;
	margin-top:30px;
	
}
.footer-container{
	width:100%;
	max-width:1240px;
	margin:0 auto;
}
.footer-container li{
	padding:5px;
}
</style>
