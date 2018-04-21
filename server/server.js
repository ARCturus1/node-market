import Koa from 'koa';
import logger from 'koa-morgan';
import helmet from 'koa-helmet';
import { router } from "./router";
import db from './database';
import config from './config';

const app = new Koa();

db.connect(config.databaseUrl);

app.use(logger('tiny'))
    .use(helmet())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);