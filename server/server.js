const Koa = require('koa');
const logger = require('koa-morgan');
const helmet = require('koa-helmet');

const router = require('./router').router;
const db = require('./database');
const config = require('./config');
const app = new Koa();

db.connect(config.databaseUrl);

app.use(logger('tiny'))
    .use(helmet())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);