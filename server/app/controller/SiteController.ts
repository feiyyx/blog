
import { Controller } from 'egg';
import { HttpGet, Router } from '../../lib/decrators';

@Router('/')
export default class SiteController extends Controller {

    @HttpGet()
    async index() {
        this.logger.info('hello egg logger');
        this.ctx.body = await this.ctx.renderView('index.html');
    }
}
