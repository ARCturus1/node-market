// import Koa from 'koa';
const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const db = require('./database');
const config = require('./config');

const app = new Koa();
const router = new Router();

db.connect(config.databaseUrl);

router
    .get('/', async (ctx, next) => {
        ctx.body = 'Hello!';
    });
const products = require('./controllers/product.controller').ProductController;
new products(router);

app.use(logger('tiny')).use(router.routes()).listen(3000);