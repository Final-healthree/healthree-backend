import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                nickname: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                isSocial: {
                    type: Sequelize.BOOLEAN(),
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
    static associate(db) {}
}
