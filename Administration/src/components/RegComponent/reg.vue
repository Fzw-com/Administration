<template>
    <div class="reg">
        <div class="form-horizontal">
            <div class="form-group">
                <h3>后台管理系统</h3>
                <label for="username" class="col-sm-2 control-label">用户名：</label>
                <div class="col-sm-10">
                    <i class="glyphicon glyphicon-user"></i>
                    <input type="text" class="form-control" id="username" @blur='lose' v-model='username' placeholder="请输入用户名">
                </div>
            </div>
            <p class="user" v-text='user'></p>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">密码：</label>
                <div class="col-sm-10">
                    <i class="glyphicon glyphicon-lock"></i>
                    <input type="password"  class="form-control" id="password" v-model='password' placeholder="请输入密码">
                </div>
            </div>
            <p class="pass"></p>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" class="btn btn-default btn-reg" @click='reg'>注册</button>
                    <button type="button" class="btn btn-default" @click='clear'>清空</button>
                </div>
            </div>
        </div>
        <spinner v-show="show"></spinner>
    </div>
</template>
<script>
    //引入样式或vue
    import './reg.scss'
    import http from '../../utils/reqAjax.js'
    import spinner from '../spinner/spinner.vue'
    
    export default{
        data:function(){
            return {
                username: '',
                password:'',
                show:false,
                user:''
            }
        },
        components:{
            spinner:spinner
        },
        methods:{
            lose:function(){
                var url = 'verify?username='+this.username;

                http.get({url:url}).then(res=>{
                    if(res.data == 'no'){
                        this.user='此用户已被注册';
                        return false;
                    }else{
                        this.user='';
                    }
                })
            },
            reg:function(){
                if(this.username == ''||this.password == ''){
                    this.$alert('用户名或密码不能为空', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                    return false;
                }
                if(!/^[^\s]{5,19}$/.test(this.password)){
                    this.$alert('请设置五位以上的密码', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                    return false;
                }
                this.show = true;
                var url = 'reg?username='+this.username +'&password='+this.password;
                http.get({url:url}).then(res=>{
                    this.show = false;
                    if(res.data == 'yes'){
                        this.$alert('注册成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                               this.$router.push({name:'login'});
                            }
                        });

                    }else{
                        this.$alert('输入有误', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                })
            },
            clear:function(){
                this.username = '';
                this.password = '';
                this.user = '';
            }
        },
        mounted:function(){

        }
    }
</script>