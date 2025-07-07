
export default app => {
    const { STRING, INTEGER, TEXT, BIGINT } = app.Sequelize;
    const articlesModel = app.model.define('articles', {
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
        createdAt: {
            type: BIGINT,
            allowNull: true,
            defaultValue: null,
            field: 'created_at',
        },
        updatedAt: {
            type: BIGINT,
            allowNull: true,
            defaultValue: null,
            field: 'updated_at',
        },
    }, {
        tableName: 'articles',
        sequelize: app.model,
        underscored: true,
        timestamps: true,
    });

    return articlesModel;
};
