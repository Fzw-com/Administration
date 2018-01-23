var db = require('../db/db');
var qs = require('qs')

module.exports ={
	register:function(app){
		// 详情页点击添加购物车，传参数为用户的id，该商品的id和购买数量(如未登录，客户端应跳转到注册页面)
		app.post('/addcar',function(req,res){
			var userId = req.body.userid;
			var gid = req.body.gid;
			var qty = req.body.qty;
			console.log(gid,qty);

	       	var sql = `
		           	SELECT
						*


					FROM	
						car	
					INNER JOIN user on car.userid = user.id 
					where userid = ${userId}
					;
	           `;
	       	db.select(sql, function(data){//查询该用户是否已存在car数据库
		       		
		       	var result = eval(data.data.results);
		       	var addgoods = {gid:gid,qty:qty};

		       	if(results.length > 0){
		       		//用户存在，获取底下的goodid
			       	var cargoods = results[0].goodsid;//goodsid字符串形式
			       	var _cargoods = eval(cargoods);
	
			       	// 遍历商品信息，查询是否该商品已存在
			       	var idx;
			       	var bool = _cargoods.some(function(item,index){
			       		idx = index;
						return item['gid'] == gid;
			       	})

			       	//封装
			       	function _car(_cargoods){
			       		_cargoods = JSON.stringify(_cargoods);
			       		var sql=`
							UPDATE  car

							SET  goodsid = '${_cargoods}'

							WHERE  userid = ${userId};
						`;
						db.update(sql,function(data){

							console.log(sql,data);
							res.send(_cargoods);
						})
			       	}

			     
			       	if(bool){// 商品id存在，只改变数量qty
						_cargoods[idx].qty = qty;
						_car(_cargoods);

					}else{// 商品不存在，添加进数组
				     	
				     	_cargoods.push(addgoods);
				     	_car(_cargoods);
					}

		       	}else{//car表无该用户
		       		// 写入用户id和新添加的商品信息
		       		var goodsArray = [{gid:gid,qty:qty}];
		       		_goodsArray =JSON.stringify(goodsArray);
		       		var sql =`
						INSERT INTO car (id,userid,goodsid,date) VALUES (id=id+1,'${userId}', '${_goodsArray}',now());
		       		`;
		       		db.insert(sql,function(data){
		       			res.send('yes');

		       		})
		       	}
	       	})
		})

		// 进入购物车页面，响应该用户的购物车商品信息
		app.post('/carts',function(req,res){
			var _userid = req.body.userid;
			console.log(_userid);

			var sql=`
				select
					*
				FROM
					car
				where
					userid=${_userid}
			`;
			db.select(sql,function(data){
				var results = eval(data.data.results);
				var cargoods = results[0].goodsid;//goodsid字符串形式
			    var _cargoods = eval(cargoods);//转为object

			    // 遍历商品id，以获取相应的商品信息
			    var ids = [];
			    _cargoods.forEach(function(item,index){
			    	ids.push(item['gid']);//数组
			    	
			    })
				res.send(ids);

			    
			})
		})
	}
}