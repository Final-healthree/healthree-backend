import Sequelize from "sequelize";

export default class Lose extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                lose_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    allowNull: false,
                },
                data_one: {
                    type: Sequelize.DATE(),
                    allowNull: true,
                },
                data_two: {
                    type: Sequelize.DATE(),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Lose",
                tableName: "lose",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Lose.belongsTo(db.User, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
    }
}
