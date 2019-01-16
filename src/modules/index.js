import meetupsRouter from './meetups';
import questionRouter from './questions';
import commentRouter from './comments';
import userRouter from './users';
import authRouter from './auth';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, meetupsRouter);
  app.use(apiPrefix, questionRouter);
  app.use(apiPrefix, commentRouter);
  app.use(apiPrefix, userRouter);
  app.use(apiPrefix, authRouter);
};

export default routes;
