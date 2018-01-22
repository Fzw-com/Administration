<template>
  <div id="home"> 
        <div class="home-top">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff">
                <el-menu-item index="1">后台管理平台</el-menu-item>
                <el-menu-item index='2'>欢迎<span>{{username}}</span>登录</el-menu-item>
                <i class="glyphicon glyphicon-off"></i>
            </el-menu>
        </div>
        <div class="home-centent clearfix">
            <div class="home-left">
                <el-row class="tac">
                    <el-col >
                        <el-menu default-active="2" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>商品管理</span>
                                </template>
                                    <el-submenu index="7">
                                        <template slot="title">
                                            <i class="el-icon-location"></i>
                                            <span>商品列表</span>
                                        </template>
                                    </el-submenu>
                                    <el-submenu index="6">
                                        <template slot="title">
                                            <i class="el-icon-location"></i>
                                            <span>商品类别</span>
                                        </template>
                                        <el-menu-item-group>
                                            <el-menu-item index="1-1" @click='classify($event)'>男士</el-menu-item>
                                            <el-menu-item index="1-2" @click='classify($event)'>女士</el-menu-item>
                                            <el-menu-item index="1-3" @click='classify($event)'>儿童</el-menu-item>
                                        </el-menu-item-group>
                                    </el-submenu>
                            </el-submenu>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">权限管理</span>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <i class="el-icon-setting"></i>
                                <span slot="title">订单管理</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-setting"></i>
                                <span slot="title">库存管理</span>
                            </el-menu-item>
                            <el-menu-item index="5">
                                <i class="el-icon-setting"></i>
                                <span slot="title">客户管理</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div class="home-right">
                <div class="home-right-top">
                    <!-- <div class="form-group">
                        <div class="col-sm-3">
                            <label>日期</label>
                            <input type="text"/>
                        </div>
                        <div class="col-sm-1"><input type="button" value="搜索" class="btn" /></div>
                    </div> -->
                </div>
                <div class="home-right-center">
                    <datagrid api="getgoodslist" :filterCols='filterCols' :kind='kind' limit='10'></datagrid>
                </div>
                <div class="home-right-bottom"></div>
            </div>
        </div>
  </div>
</template>
<script>
    import './home.scss'
    import spinner from '../spinner/spinner.vue'
    // import http from '../../utils/reqAjax.js'
    import datagrid from '../datagrid/datagrid.vue'
    export default{
        data:function(){
            return{
                kind:'男士',
                username:sessionStorage.getItem("username"),
                filterCols:['brand','color','price','saleprice','saleqty','title','type','title']
            }
        },
        components:{
            spinner:spinner,
            datagrid:datagrid
        },
        methods:{
            classify:function(e){
                this.kind = e.$el.innerText;
                // console.log(this.kind)
                this.$children[2].aa(this.kind);
            }
        },
        mounted:function(){

        }
    }
</script>