<template>
    <div class="login">
        <div class="form-horizontal">
            <div class="form-group">
                <h3>后台管理系统</h3>
                <label for="username" class="col-sm-2 control-label">用户名：</label>
                <div class="col-sm-10">
                    <i class="glyphicon glyphicon-user"></i>
                    <input type="text" class="form-control" id="username" v-model = 'username' @blur = 'lose'placeholder="请输入用户名">
                </div>

            </div>
            <p class="user" v-text='user'></p>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">密码：</label>
                <div class="col-sm-10">
                    <i class="glyphicon glyphicon-lock"></i>
                    <input type="password"  class="form-control" id="password" v-model = 'password' placeholder="请输入密码">
                    <span></span>
                </div>
            </div>
            <p class="pass"></p>
           <!--  <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                        <label>
                          <input type="checkbox">七天免登录
                        </label>
                    </div>
                </div>
            </div> -->
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" class="btn btn-default btn-login" @click='login'>登录</button>
                    <button type="button" class="btn btn-default" @click='clear'>清空</button>
                </div>
            </div>
        </div>
        <spinner v-show="show"></spinner>
    </div>
</template>
<script>
    //引入样式或vue
    import './login.scss'
    import spinner from '../spinner/spinner.vue'
    import http from '../../utils/reqAjax.js'
    export default{
        data:function(){
            return {
                username: '',
                password:'',
                user:'',
                show:false
            }
        },
        components:{
            spinner:spinner
        },
        methods:{
            lose:function(){
                var url = 'verify?username='+this.username;
                http.get({url:url}).then(res=>{
                    console.log(res.data)
                    if(res.data == 'yes'){
                        this.user='用户未被注册';
                        return false;
                    }else{
                        this.user='';
                    }
                })
            },
            login:function(){
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
                http.post({'url':'login','params':{username:this.username,password:this.password}}).then(res=>{
                    this.show = false;
                    if(res.data =='yes'){
                        // var token = res.data.token;
                        // window.localStorage.setItem("token", token);
                        // 登录成功后存下用户名,跳转到主页;
                        window.sessionStorage.setItem("username",this.username);
                        this.$router.push({name:'home'});
                    }else{
                        this.$alert('输入用户名或密码有误', {
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