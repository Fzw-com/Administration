var db = require('../db/db')

module.exports = {
    register: function(app){
        app.get('/getgoodslist', function(req, res){
            var keyword = req.query.keyword;
            var limit = req.query.limit * 1;
             var page = req.query.page * 1;
            console.log(keyword)
            var sql = `
            select
               *
            from
                goods
                where type = '${keyword}'
            `;
            db.select(sql, function(data){
                res.send(data);
            })
        })

        app.get('/getdetails',function(req, res){
            console.log(req.query)
            var goodid = req.query.goodid;
            console.log(req.query,req.query.goodid)
            var sql = `
            select
               *
            from
                goods
                where id = '${goodid}'
            `;
            db.select(sql, function(data){
                res.send(data);
            })
        })

    }
}