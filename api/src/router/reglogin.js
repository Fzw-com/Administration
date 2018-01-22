var db = require('../db/db')
var jwt=require('jsonwebtoken')

module.exports = {
	 register: function(app){
	 	//验证客户端用户名的输入框失去焦点时而发起的请求，查询注册名是否已存在
	 	app.get('/verify', function(req, res){
			var username1 = req.query.username;
            console.log(username1);
			var sql = `
	            select
	               *
	            from
	                user
	            where
	           		username='${username1}';
	           `;
	           db.select(sql, function(data){
		           if(data.data.result.length <= 0){
		           		res.send('yes');
		           }else{
		           		res.send('no');
		           }
		      })
		})

	 	//客户端点击提交后，再一次验证
        app.get('/reg', function(req, res){
            var username1 = req.query.username;
            var password1 = req.query.password;
           
            var sql = `
	            select
	               *
	            from
	                user
	            where
	            	username='${username1}'
            `;
            // 再次查询注册名是否已存在
            db.select(sql, function(data){
                // console.log(data.data);
                // 不存在则注册成功，

                console.log(data.data.result);
                console.log(data.data.result.length);
                if(data.data.result.length == 0 ){
                    // 写入数据
                    var sql = `
                        INSERT INTO user (id,username,password,date) VALUES (id=id+1,'${username1}', '${password1}',now());
                    `;
                    db.insert(sql,function(data){
                        console.log(data);
                    })
                	res.send('yes');
                }else{
                	res.send('no');
                }
            })
        })
    
        // 登录页
        app.post('/login',function(req,res){

            var username1 = req.body.username;
            var password1 = req.body.password;
            console.log(username1,password1);
            var sql = `
                select
                   *
                from
                    user
               where
                	username='${username1}' and password='${password1}'
            `;
            // 查询登录账号和密码是否已注册
            db.select(sql, function(data){

            	if(data.data.result.length >0){
            		res.send('yes');//已注册
            	}else{
            		res.send('no');//未注册
            	}
            })
        })
        
    }


}