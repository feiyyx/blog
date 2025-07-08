import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    tracer: {
        enable: true,
        package: '@eggjs/tracer',
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },
};

export default plugin;
