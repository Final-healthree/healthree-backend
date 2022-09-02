import Sequelize from "sequelize";

export default class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                post_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true,
                    allowNull: false,
                    autoIncrement: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Post",
                tableName: "post",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Post.belongsTo(db.Done, { foreignKey: "done_id", targetKey: "done_id" });
        db.Post.hasMany(db.Comment, { foreignKey: "post_id", sourceKey: "post_id" });
        db.Post.belongsToMany(db.User, { through: "Like" });
    }
}
