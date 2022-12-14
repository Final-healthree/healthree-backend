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
        db.Post.belongsTo(db.Goal, { foreignKey: "goal_id", targetKey: "goal_id" });
        db.Post.hasMany(db.Comment, {
            foreignKey: "post_id",
            sourceKey: "post_id",
            onDelete: "cascade",
        });
        db.Post.hasMany(db.Like, {
            foreignKey: "post_id",
            sourceKey: "post_id",
            onDelete: "cascade",
        });
    }
}
