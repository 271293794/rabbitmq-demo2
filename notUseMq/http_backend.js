

var { express, db } = require('../util')
var app = express()
app.get('/', (req, res) => { res.send('hello world') })
app.get('/buy/:userId', async (req, res) => {
    var { userId } = req.params
    let orderCount = await db.order.count()
    if (orderCount >= 100) return res.send('已售完')
    await db.order.create({ userId })
    res.send('订购成功')
})
app.listen(3000, () => { console.log(`运行在3000端口上...`) })