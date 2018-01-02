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
						<img class="image" :src="scope.row.img_url" alt="">
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
					<el-input placeholder="请输入中文标题" v-model="editForm.zh.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品描述">
					<el-input placeholder="请输入英文标题" v-model="editForm.en.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品图片">
					<img v-if="editForm.img_url" class="banner" :src="editForm.img_url" alt="">
					<input type="file" @change="httpUpload($event,'editForm')">
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
					<el-input placeholder="请输入中文描述" v-model="addForm.zh.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品描述">
					<el-input placeholder="请输入英文描述" v-model="addForm.en.desc" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="产品图片">
					<img v-if="addForm.img_url" class="banner" :src="addForm.img_url" alt="">
					<input type="file" @change="httpUpload($event,'addForm')">
				</el-form-item> -->
				<el-form-item label="上传产品图片">
					<el-upload
						  class="upload-demo"
						  action="http://127.0.0.1/api/uploadFile"
						  :before-upload="beforeUpload"
						  :on-remove="handleRemove"
						  :file-list="fileList"
						  list-type="picture"
						  :on-success="handleSuccess">
						  <el-button size="small" type="primary">点击上传</el-button>
						  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，可上传多张图片</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
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
				    img_url:'',
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
				    img_url:'',
                    zh:{
                    	title:'',
                    },
                    en:{
                    	title:'',
                    }
				},
				editFormRules:{},
				addFormRules:{},
				fileList: [],
				addImages:[]
			}
		},
		methods: {
			handleSuccess(response, file, fileList){
				var name = file.name;
				console.log(file);	
				if(response.code == 1){
					for( let i = 0 ; i < this.addImages.length; i++  ){
			        	if( this.addImages[i].name == name ){
							this.$message({
		                        message: '该图片已经上传，请重新上传其他图片！',
		                        type: 'error'
		                    });
		                    return false;
						}
			        }
					this.addImages.push({
						name:file.name,
						img_url:response.data.pictureUrl
					});
				}

				console.dir(this.addImages);
			},
			handleRemove(file, fileList) {
				var name = file.name;
				this.addImages.forEach( (val,index) => {
					if( val.name == name ){
						this.addImages.splice(index,1);
					}
				} );
		        // console.dir(file, fileList);
		    },
		    beforeUpload(file) {
		    	alert(1)
		        var name = file.name;
		        console.log(name,this.addImages)
		        for( let i = 0 ; i < this.addImages.length; i++  ){
		        	if( this.addImages[i].name == name ){
						this.$message({
	                        message: '该图片已经上传，请重新上传其他图片！',
	                        type: 'error'
	                    });
	                    return false;
					}
		        }
		    },
			// 上传图片及文件方法
            httpUpload(event,type){
                let file = event.currentTarget.files[0];
                let form = new FormData();
                form.append('file',file);
                uploadFile(form).then( res => {
                    console.log(res);
                    // 复制当前的url
                    this[type].img_url = res.pictureUrl;
                }).catch( e => {
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                } );
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
				    img_url:'',
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
		max-width:400px;
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