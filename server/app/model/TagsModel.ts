export default app => {
    const { INTEGER, STRING } = app.Sequelize;
    const tagsModel = app.model.define('tags', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: STRING(100),
            allowNull: false,
        },
    });

    return tagsModel;
};
