
module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

    const Articles = app.model.define('articles', {
      id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: STRING(255)
        },
        tag: {
            type: STRING(255)
        },
        content: {
            type: TEXT,
        },
        hash: {
            type: STRING(100),
        },
        is_top: {
            type: INTEGER,
        },
        create_time: {
            type: DATE,
        },
        update_time: {
            type: DATE,
        },
    }, {
        timestamps: false
    });

    return Articles;
  };