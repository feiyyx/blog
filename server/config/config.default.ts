import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path from 'path';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1750646849658_6417';

    // add your egg config in here
    config.middleware = [];

    // change multipart mode to file
    // @see https://github.com/eggjs/multipart/blob/master/src/config/config.default.ts#L104
    config.multipart = {
        mode: 'file',
    };

    config.sequelize = {
        dialect: 'mysql',
        host: '192.168.3.116',
        port: 33066,
        database: 'test',
        user: 'root',
        password: 'admin',
    };

    config.view = {
        root: [
            path.join(appInfo.baseDir, 'dist'),
        ].join(','),
        mapping: {
            '.nj': 'nunjucks',
            '.html': 'nunjucks',
        },
    };

    config.static = {
        prefix: '/public/',
        dir: path.join(appInfo.baseDir, 'dist'),
    };

    // add your special config in here
    // Usage: `app.config.bizConfig.sourceUrl`
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
        test: 'test',
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        bizConfig,
    };
};
