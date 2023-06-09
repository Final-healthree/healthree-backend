import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
<<<<<<< HEAD
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
=======
                social_id: {
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
                score: {
                    type: Sequelize.INTEGER(),
                    allowNull: true,
                    defaultValue: 0,
>>>>>>> aae08e81cf3fd918b0b85247706e7237f73e0ee0
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: false,
                modelName: "User",
                tableName: "user",
<<<<<<< HEAD
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {}
=======
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            },
        );
    }
    // Post와 Comment 외래키로 넘겨주기 때문에 hasMany설정
    static associate(db) {
        db.User.hasMany(db.Goal, { foreignKey: "user_id", sourceKey: "user_id" });
        db.User.hasMany(db.Comment, {
            foreignKey: "user_id",
            sourceKey: "user_id",
            onDelete: "cascade",
        });
        db.User.hasMany(db.Like, {
            foreignKey: "user_id",
            sourceKey: "user_id",
            onDelete: "cascade",
        });
    }
>>>>>>> aae08e81cf3fd918b0b85247706e7237f73e0ee0
}
