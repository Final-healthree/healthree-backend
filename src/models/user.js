import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    allowNull: false,
                    autoIncrement: true,
                },
                kakao_id: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                nickname: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                profile_image: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "User",
                tableName: "user",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.User.hasOne(db.Ing, { foreignKey: "user_id", sourceKey: "user_id" });
        db.User.hasOne(db.Lose, { foreignKey: "user_id", sourceKey: "user_id" });
        db.User.hasOne(db.Done, { foreignKey: "user_id", sourceKey: "user_id" });
        db.User.belongsToMany(db.Post, { through: "Like" });
    }
}
