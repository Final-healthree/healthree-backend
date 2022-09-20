import Sequelize from "sequelize";

export default class Video extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                video_id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER(),
                    unique: true /* unique 설정하지 않을 시 "unique violation" 에러 발생 */,
                    allowNull: false,
                    autoIncrement: true,
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
                modelName: "Video",
                tableName: "video",
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.Video.belongsTo(db.Goal, { foreignKey: "goal_id", targetKey: "goal_id" });
        db.Video.belongsTo(db.Goal, { foreignKey: "user_id", targetKey: "user_id" });
        db.Video.belongsTo(db.Goal, {
            foreignKey: "status",
            targetKey: "status",
            onUpdate: "CASCADE",
        });
    }
}
