import { Application } from 'egg';
import { handleRouter } from '../lib/decrators/router';

export default (app: Application): void => {
    handleRouter(app);
};
