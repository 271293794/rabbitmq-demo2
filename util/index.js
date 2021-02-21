const request = require('request')

module.exports = {
    /** 任务队列 */
    taskQ: 'taskQ',
    /** 应答队列 */
    ackQ: 'ackQ',
    /** 模拟参加抢购活动的用户ID */
    globalUserId: 1,
    amqplib: require('amqplib/callback_api'),
    express: require('express'),
    request: require('request'),
    uuid: require('node-uuid'),
    /** 判断已有订单数量（>=100时不再生成新订单），并生成新订单的api地址。我感
     * 觉写成一个方法就行了，不知道书中的例子里，为什么要单独写到另一个接口中
     */
    url: `http://localhost:3000/buy/`,
    /** 超时时间 */
    timeOut: 30 * 1000,
    /** 数据库 */
    db: require('../models'),
    /** 不使用mq的端口 */
    port1: 5000,
    /** 使用mq的端口 */
    port2: 5001,
    /** rabbit出错时的处理函数 */
    bail(err, conn) {
        console.error(err)
        if (conn) conn.close(() => {
            process.exit(1)
        })
    }
}