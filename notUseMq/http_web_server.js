// var express = require('express')

var { express, request, globalUserId, timeOut, url, port1 } = require('../util')
var app = express()



app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/buy', (req, res) => {
    var userId = globalUserId++
    // 利用request库发送http请求
    request({
        method: 'GET',
        timeout: timeOut,
        uri: url + userId

    }, (err, req_res, body) => {

        if (err) return res.status(500).send(err)
        if (req_res.statusCode !== 200) return res.status(500).send(req_res.statusCode)
        res.send(body)

    })
})

app.listen(port1, () => {
    console.log(`运行在http://localhost:${port1}...`)
})