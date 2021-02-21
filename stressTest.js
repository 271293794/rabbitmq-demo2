// 并发测试
var siege = require('siege')
// 运行 cmd 的模块
var cmd = require('node-cmd');
/**
 * 要测试不使用mq的方案，port 应为5000（默认）
 * 测试使用mq的方案，port 应为5001
 */
var port = parseInt(process.argv[2]) || require('./util').port1
// 发现不使用mq的方案，订单数量会超过 100


switch (port) {
    case 5000:
        cmd.run('node notUseMq/http_web_server')
        cmd.run('node notUseMq/http_backend')
        break;
    case 5001:
        cmd.run('node useMq/http_web_server')
        cmd.run('node useMq/rabbit_backend')
        break;
    default:
        process.exit(1)
        break;
}

setTimeout(() => {
    siege()
        .on(port)
        .get('/buy')
        .concurrent(200)
        .for(10).times
        .attack()
}, 1000);



