import Sequelize from "sequelize";

export default class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                comment_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    allowNull: false,
                    autoIncrement: true,
                },
                comment: {
                    type: Sequelize.STRING(100),
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
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Comment.belongsTo(db.Post, { foreignKey: "post_id", targetKey: "post_id" });
    }
}
