export default app => {
    const { STRING, INTEGER, TEXT, BIGINT } = app.Sequelize;
    const ArticlesModel = app.model.define('articles', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: STRING(100),
            allowNull: false,
        },
        content: {
            type: TEXT,
            allowNull: true,
        },
        tag: {
            type: STRING(100),
            allowNull: false,
        },
        summary: {
            type: TEXT,
            allowNull: true,
        },
        created_at: {
            type: BIGINT,
            allowNull: true,
            defaultValue: null,
        },
        updated_at: {
            type: BIGINT,
            allowNull: true,
            defaultValue: null,
        }
    });

    return ArticlesModel;
};
