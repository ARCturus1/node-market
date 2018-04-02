const koaBody = require('koa-body');
const db = require('../database');
const Product = require('../models/Product').Product;
const collectionName = 'products';
const ObjectId = db.ObjectId;

exports.ProductController = class ProductController {
    constructor(router) {
        this._route = 'products';

        router
            .post(`/${this._route}`, koaBody(), this.postCallback)
            .put(`/${this._route}/:id`, koaBody(), this.putCallback)
            .get(`/${this._route}`, this.getAllCallback)
            .get(`/${this._route}/:id`, this.getByIdCallback)
            .delete(`/${this._route}/:id`, this.deleteCallback);
    }
    async deleteCallback(context, next) {
        try {
            const result = await db.get()
                .collection(collectionName)
                .deleteOne({
                    _id: db.ObjectId(context.params.id)
                });
            context.sendStatus(200);
        } catch (error) {
            context.sendStatus(500);
        }
    };
    async getByIdCallback(context, next) {
        try {
            const id = context.params.id;
            context.body = await db.get()
                .collection(collectionName).findOne({
                    _id: ObjectId(id)
                });
        } catch (error) {
            context.body = error.message;
            context.status = 500;
        }
    };
    async getAllCallback(context, next) {
        try {
            context.body = await db.get()
                .collection(collectionName).find().toArray();
        } catch (error) {
            context.body = error.message;
            context.status = 500;
        }
    };
    async putCallback(context, next) {
        try {
            const product = new Product(context.request.data.name, context.request.data.description, context.request.data.imageUrl, context.request.data.cost);
            const result = await db.get()
                .collection(collectionName)
                .updateOne({
                    _id: ObjectId(context.params.id)
                }, product);
            context.sendStatus(200);
        } catch (error) {
            context.body = error.message;
            context.status = 500;
        }
    };
    async postCallback(context, next) {
        try {
            const product = new Product(context.request.body.data.name,
                context.request.body.data.description,
                context.request.body.data.imageUrl,
                context.request.body.data.cost);
            const result = await db.get()
                .collection(collectionName)
                .insert(product);
            context.body = result;
        } catch (error) {
            context.body = error.message;
            context.status = 500;
        }
    };
}