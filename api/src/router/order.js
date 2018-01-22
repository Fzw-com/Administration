var db = require('../db/db');

module.exports = {
    register: function(app){
        // 提交订单，写入数据

        var now = new Date();
        var _now = now.toLocaleString();
       
        app.post('/order', function(req, res){
          
            var userId = req.body.userid;
            var gid = req.body.gid;
            var total = req.body.total;
            
            

            var sql = `
                INSERT INTO 
                    orders 
                    (id,userid,status,total,goodsid,date) 
                VALUES
                    (id=id+1,'${userId}',0,'${total}','${gid}','${_now}');
            
            `;
            db.insert(sql, function(data){
                
                // 发送该用户的时间订单信息
                res.send(_now);

            })
        }),
        // 支付页
       app.post('/pay', function(req, res){
            var status = req.body.status;
            var Date = req.body.now;
           
            if(Date == _now && status == 1){//确定为该时间编号订单并status为1已付款
                res.send('yes');
            }else if(status == 0){//未支付
                res.send('no');
            }

       })
    }
}