<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" size="big" @click="handleAdd">新增产品</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="bannerList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="产品编号" width="120">
			</el-table-column>
			<el-table-column label="产品名称" width="auto">
				<template scope="scope">
						<p>中文： {{ scope.row.zh.title }}</p>
						<p>英文： {{ scope.row.en.title }}</p>
				</template>
			</el-table-column>
			<el-table-column label="产品介绍" width="auto">
				<template scope="scope">
						<p>中文： {{ scope.row.zh.desc }}</p>
						<p>英文： {{ scope.row.en.desc }}</p>
				</template>
			</el-table-column>
			<el-table-column label="图片详情" width="auto">
				<template scope="scope">
					<el-col :span="24">
						<el-button class="btn" type="primary" @click="showImage(scope.row)">查看产品图片</el-button>
					</el-col>
				</template>
			</el-table-column>
			<el-table-column label="操作" prop="status" width="200">
				<template scope="scope">
					<el-col :span="12">
						<el-button class="btn" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
					</el-col>
					<el-col :span="12">
						<el-button type="danger" class="btn" size="small" @click="handleDel(scope.row)">删除</el-button>
					</el-col>
				</template>
			</el-table-column>
		</el-table>
		<!--编辑界面-->
		<el-dialog title="编辑产品类型" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">		
				<el-form-item label="中文产品名称">
					<el-input placeholder="请输入中文名称" v-model="editForm.zh.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品名称">
					<el-input placeholder="请输入英文名称" v-model="editForm.en.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="中文产品描述">
					<el-input type="textarea" placeholder="请输入中文描述" v-model="editForm.zh.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品描述">
					<el-input type="textarea" placeholder="请输入英文描述" v-model="editForm.en.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品图片">
					<ul>
						<li v-for="(item,index) in editForm.img_url">
							<img v-if="item" class="banner" :src="item">
							<el-col :span="24">
							<input type="file" @change="httpUpload($event,'editForm',index)">
								<el-button type="danger" class="btn" size="small" @click="handleDelImage('editForm',index)">删除当前图片</el-button>
							</el-col>
						</li>
					</ul>
					<el-button class="btn" type="primary"  @click="handleAddImage('addForm')">增加产品图片</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增产品" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="中文产品名称">
					<el-input placeholder="请输入中文名称" v-model="addForm.zh.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品名称">
					<el-input placeholder="请输入英文名称" v-model="addForm.en.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="中文产品描述">
					<el-input type="textarea" placeholder="请输入中文描述" v-model="addForm.zh.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品描述">
					<el-input type="textarea" placeholder="请输入英文描述" v-model="addForm.en.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品图片">
					<ul>
						<li v-for="(item,index) in addForm.img_url">
							<img v-if="item" class="banner" :src="item">
							<el-col :span="24">
							<input type="file" @change="httpUpload($event,'addForm',index)">
								<el-button type="danger" class="btn" size="small" @click="handleDelImage('addForm',index)">删除当前图片</el-button>
							</el-col>
						</li>
					</ul>
					<el-button class="btn" type="primary"  @click="handleAddImage('addForm')">增加产品图片</el-button>
				</el-form-item>
			
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--弹窗界面-->
		<el-dialog title="产品图片详情" v-model="popVisible" :close-on-click-modal="false">
		<el-carousel indicator-position="outside">
		    <el-carousel-item v-for="item in popData" :key="item">
		      <img width="100%" height="100%" :src="item">
		    </el-carousel-item>
		  </el-carousel>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { uploadFile,addProductList,getProductList,editProductList,removeProductList } from '../../api/api';

	export default {
		data() {
			return {
				bannerList:[],	
				productId:1,
				//编辑界面数据
				editForm: {
				    productId:'',
				    img_url:[],
                    zh:{
                    	title:'',
                    },
                    en:{
                    	title:'',
                    }
				},
				page: 1,
				listLoading: false,

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
		
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					productId:'',
				    img_url:[],
                    zh:{
                    	title:'',
                    },
                    en:{
                    	title:'',
                    }
				},
				editFormRules:{},
				addFormRules:{},
				popVisible:false,
				popData:[]

			}
		},
		methods: {
			showImage(row){
				this.popVisible = true;
				this.popData = row.img_url;
			},
			// 上传图片及文件方法
            httpUpload(event,type,index){
                let file = event.currentTarget.files[0];
                let form = new FormData();
                form.append('file',file);
                uploadFile(form).then( res => {
                    console.log(res,index);
                    // 复制当前的url
                    this[type].img_url.splice(index,1,res.pictureUrl);
                }).catch( e => {
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                } );
            },
            handleAddImage(type){
            	this[type].img_url.push('');
            },
            handleDelImage(type,index){
            	this[type].img_url.splice(index,1);
            },
			getClassChapter(){
				this.listLoading = true;
				getProductList({productId:this.productId}).then( res => {
				    console.log(res);
					this.bannerList = res;
					this.listLoading = false;
				} )
			},
			//删除
			handleDel: function (row) {
				this.$confirm('删除后不能恢复，确认要删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeProductList(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '已删除',
							type: 'success'
						});
						this.getClassChapter();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (row) {
				this.editFormVisible = true;
                this.editForm = row;
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					productId:this.productId,
				    img_url:[],
                    zh:{
                    	title:'',
                    },
                    en:{
                    	title:'',
                    }
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editProductList(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getClassChapter();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addProductList(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getClassChapter();
							});
						});
					}
				});
			},
		    gotoFreeList(row){
		      this.$router.push({path:`/freeList/${row.id}`});
		    }
		},
		mounted() {
			this.productId = this.$route.params.id;
			this.getClassChapter();
		},
	}

</script>

<style scoped>
	.banner-img{
		width:100%;
		height:100%;
		vertical-align:middle;
	}
	.banner{
		max-width:200px;
		border:1px solid #ccc;
		border-radius:10px;
	}
	.image{
		width:200px;
	}
	.btn{
		margin:5px 0;
	}
</style>	