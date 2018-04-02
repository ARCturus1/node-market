const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const User = require('./user');
const Token = require('./token');

router
    .post('/', koaBody(), async (ctx, next) => {
        ctx.status = 401;

        const isAuthorized = await User.isAuthorized(ctx.request.body);
        if (isAuthorized) {
            const token = await Token.generateTokens(ctx.request.body.username);

            ctx.status = 200;
            ctx.body = token;
        }
    })
    .get('/', async (ctx, next) => {
        ctx.status = 403;

        const { authorization } = ctx.header;
        if (!authorization || !authorization.match(/^Bearer\s/)) return; 
        const refreshToken = authorization.replace(/^Bearer\s/, '');
        const {username} = Token.getPayload(refreshToken);
        const hasValidRefreshToken = await User.hasValidRefreshTocken(refreshToken);

        if (hasValidRefreshToken) {
            const token = await Token.generateTokens(username);
            ctx.status = 200;
            ctx.body = token;
        }
    });
new(require('./controllers/product.controller').ProductController)(router);

exports.router = router;