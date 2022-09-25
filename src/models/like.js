import Sequelize from "sequelize";

export default class Like extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                like_id: {
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
                modelName: "Like",
                tableName: "like",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // utf8mb4_unicode_ci
    static associate(db) {
        db.Like.belongsTo(db.Post, {
            foreignKey: "post_id",
            targetKey: "post_id",
            onDelete: "cascade",
        });
        db.Like.belongsTo(db.User, {
            foreignKey: "user_id",
            targetKey: "user_id",
            onDelete: "cascade",
        });
    }
}
