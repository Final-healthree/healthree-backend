import Sequelize from "sequelize";

export default class Ing extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                ing_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                goal: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                day1: {
                    type: Sequelize.BOOLEAN(),
                    allowNull: true,
                },
                day2: {
                    type: Sequelize.BOOLEAN(),
                    allowNull: true,
                },
                day3: {
                    type: Sequelize.BOOLEAN(),
                    allowNull: true,
                },
                date_one: {
                    type: Sequelize.DATE(),
                    allowNull: true,
                },
                date_two: {
                    type: Sequelize.DATE(),
                    allowNull: true,
                },
                date_three: {
                    type: Sequelize.DATE(),
                    allowNull: true,
                },
                video_one: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
                video_two: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
                video_three: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Ing",
                tableName: "ing",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Ing.belongsTo(db.User, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
    }
}
