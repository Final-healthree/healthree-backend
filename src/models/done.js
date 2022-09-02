import Sequelize from "sequelize";

export default class Done extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                done_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                video: {
                    type: Sequelize.STRING(300),
                    allowNull: false,
                },
                goal: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                date_one: {
                    type: Sequelize.DATE(),
                    allowNull: false,
                },
                is_social: {
                    type: Sequelize.BOOLEAN(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Done",
                tableName: "done",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Done.belongsTo(db.User, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
        db.Done.hasOne(db.Post, { foreignKey: "done_id", sourceKey: "done_id" });
    }
}
