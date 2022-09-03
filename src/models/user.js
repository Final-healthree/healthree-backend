import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true /* unique 설정하지 않을 시 "unique violation" 에러 발생 */,
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
        db.User.hasMany(db.Goal, { foreignKey: "user_id", sourceKey: "user_id" });
        db.User.belongsToMany(db.Post, { through: "Like" });
    }
}
