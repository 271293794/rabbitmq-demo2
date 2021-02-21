var { ackQ, taskQ, express, uuid, amqplib, globalUserId, bail, port2 } = require('../util')

/** rabbitmq的连接，一会儿会被初始化的。 */
var conn;
var app = express()

var correlationId = uuid.v1()

app.get('/buy', (req, res) => {
    var userId = globalUserId++
    conn.createChannel((err, ch) => {
        if (err) return bail(err, conn)
        ch.assertQueue(ackQ, { durable: false }, (err, ok) => {
            if (err) return bail(err, conn)

            // 成功声明应答队列,从此队列中获取结果，并返回
            ch.consume(ackQ, (msg) => {
                res.send(msg.content.toString())
                ch.close()
            }, { noAck: true });

            ch.sendToQueue(
                taskQ,
                Buffer.from(userId.toString()),
                { replyTo: ackQ, correlationId }
            )

        })
    })


})

amqplib.connect('amqp://127.0.0.1', { noDelay: true }, (err, rabbit_conn) => { conn = rabbit_conn })
app.listen(port2, () => { console.log(`运行在http://localhost:${port2}...`) })