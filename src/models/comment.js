import Sequelize from "sequelize";

export default class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                comment_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                comment: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Comment",
                tableName: "comment",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Comment.belongsTo(db.Post, {
            foreignKey: "post_id",
            targetKey: "post_id",
            onDelete: "cascade",
        });
        db.Comment.belongsTo(db.User, {
            foreignKey: "user_id",
            targetKey: "user_id",
            onDelete: "cascade",
        });
    }
}
