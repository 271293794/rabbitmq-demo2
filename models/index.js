const { Sequelize, DataTypes } = require('sequelize');
var path = require('path')
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root123',
    database: 'test'

});
var db = { Sequelize, sequelize }

sequelize.sync().then(() => {
    console.log('数据库同步成功')
}, (err) => {
    console.log('数据库同步失败：', err)
})

db.order = sequelize.import(path.join(__dirname, 'order.js'));
module.exports = db
