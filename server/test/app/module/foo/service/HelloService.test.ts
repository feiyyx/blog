import { app } from '@eggjs/mock/bootstrap';
import { HelloService } from 'app/service/articleService';
import { strict as assert } from 'node:assert';

describe('test/app/module/foo/service/HelloService.test.js', () => {
    it('should hello work', async () => {
        const helloService = await app.getEggObject(HelloService);
        const msg = await helloService.hello('123456');
        assert.equal(msg, 'hello, 123456');
    });
});
