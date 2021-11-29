const articlesRouter = require('./articles.router');
const topicsRouter = require('./topics.router');

const apiRouter = require('express').Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);


module.exports = apiRouter;