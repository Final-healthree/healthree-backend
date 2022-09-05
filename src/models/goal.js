import Sequelize from "sequelize";

export default class Goal extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                goal_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true /* unique 설정하지 않을 시 "unique violation" 에러 발생 */,
                    allowNull: false,
                    autoIncrement: true,
                },
                goal_name: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                status: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                is_social: {
                    type: Sequelize.BOOLEAN(),
                    allowNull: true,
                },
                day1: {
                    type: Sequelize.DATE(),
                    allowNull: false,
                },
                day2: {
                    type: Sequelize.DATE(),
                    allowNull: false,
                },
                day3: {
                    type: Sequelize.DATE(),
                    allowNull: false,
                },
                video1: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                video2: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                video3: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                final_video: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "Goal",
                tableName: "goal",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Goal.belongsTo(db.User, { foreignKey: "user_id", targetKey: "user_id" });
        db.Goal.hasOne(db.Post, { foreignKey: "goal_id", sourceKey: "goal_id" });
    }
}