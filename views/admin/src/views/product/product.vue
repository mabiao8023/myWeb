<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" size="big" @click="handleAdd">新增产品类型</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="bannerList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="产品类型编号" width="120">
			</el-table-column>
			<el-table-column label="中文产品标题" prop="zh.title" width="auto">
			</el-table-column>
			<el-table-column label="英文产品标题" prop="en.title" width="auto">
			</el-table-column>
			<el-table-column label="产品列表" width="auto">
				<template scope="scope">
						<el-col :span="24">
							<el-button class="btn" type="primary" size="small" @click="gotoFreeList(scope.row)">产品列表</el-button>
						</el-col>
				</template>
			</el-table-column>
			<el-table-column label="操作" prop="status" width="200">
				<template scope="scope">
					<el-col :span="12">
						<el-button class="btn" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
					</el-col>
					<el-col :span="12">
						<el-button :type="scope.row.status == 1 ? 'danger' : 'success'" :disabled="scope.row.status == 0" class="btn" size="small" @click="handleDel(scope.row)">{{ scope.row.status == 1?'冻结':'已冻结' }}</el-button>
					</el-col>
				</template>
			</el-table-column>
		</el-table>
		<!--编辑界面-->
		<el-dialog title="编辑产品类型" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">		
				<el-form-item label="中文产品标题">
					<el-input placeholder="请输入中文标题" v-model="editForm.zh.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品标题">
					<el-input placeholder="请输入英文标题" v-model="editForm.en.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否可用">
					<el-switch
							v-model="editForm.status"
							on-color="#13ce66"
							off-color="#ff4949"
							on-text="冻结"
							off-text="启用"
							:on-value="1"
							:off-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增产品类型" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="中文产品标题">
					<el-input placeholder="请输入中文标题" v-model="addForm.zh.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文产品标题">
					<el-input placeholder="请输入英文标题" v-model="addForm.en.title" auto-complete="off"></el-input>
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
	import { uploadFile,addProduct,getProduct,editProduct,removeProduct } from '../../api/api';

	export default {
		data() {
			return {
				bannerList:[],	
				//编辑界面数据
				editForm: {
				    status:1,
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
					status:1,
                    zh:{
                    	title:'',
                    },
                    en:{
                    	title:'',
                    }
				},
				editFormRules:{},
				addFormRules:{},
			}
		},
		methods: {
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
				getProduct().then( res => {
				    console.log(res);
					this.bannerList = res;
					this.listLoading = false;
				} )
			},
			//删除
			handleDel: function (row) {
				this.$confirm('冻结后不再展示，确认要冻结吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeProduct(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '已冻结',
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
                    status:1,
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
							editProduct(para).then((res) => {
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
							addProduct(para).then((res) => {
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
		      this.$router.push({path:`/productList/${row.id}`});
		    }
		},
		mounted() {
			this.chapterId = this.$route.params.id;
			this.classId = this.$route.params.id;
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
	.btn{
		margin:5px 0;
	}
</style>	