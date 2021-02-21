var { ackQ, taskQ, express, uuid, amqplib, globalUserId, bail, db } = require('../util')
amqplib.connect('amqp://127.0.0.1', (err, conn) => {
    if (err) bail(err, conn)
    process.once('SIGINT', () => { conn.close() })
    conn.createChannel((err, ch) => {
        ch.assertQueue(taskQ, { durable: false })
        ch.prefetch(1)
        ch.consume(taskQ, (msg) => {
            // 收到生成订单的请求，开始处理任务
            var userId = msg.content.toString()
            db.order.count().then(total => {
                if (total >= 100) return null
                return db.order.create({ userId })
            }).then(result => {
                ackSend(msg, result ? '订购成功' : '已售完')
            })

        }, { noAck: false }, (err) => {
            if (err) bail(err, conn); console.log('等待请求...');
        })



        /**
         * 任务已处理（成功添加新订单，或告知已售完）后，用于返回处理结果的方法
         * @param {*} msg 从http_web_server(生产任务的)发过来的消息
         * @param {*} data 要回复的消息
         */
        function ackSend(msg, data) {
            ch.sendToQueue(msg.properties.replyTo, Buffer.from(data.toString()), { correlationId: msg.properties.correlationId })
            // 确认已处理收到的 msg 
            ch.ack(msg)
        }

    })

})