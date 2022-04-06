import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1643683603502_6100';

  // add your egg config in here
  config.middleware = [];

  config.sequelize = {
        // 单数据库信息配置
        dialect: 'mysql',
        host: '175.178.27.94',
        port: 3306,
        database: 'blog',
        username: 'feiyyx',
        password: 'uaeqnk55',
  };

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),

    mapping: {
      '.nj': 'nunjucks',
      '.njk': 'nunjucks',
      '.html': 'nunjucks',
    },

    defaultViewEngine: 'nunjucks',
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
