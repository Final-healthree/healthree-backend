// 시퀄라이즈 생성하기위한 인덱스.js
export * from "./sequelize.js";
import sequelize from "./sequelize.js";

// 유저, 포스트, 댓글, 좋아요 임포트

import User from "./user.js";

const db = {};

// 받아온 클래스들 사용
db.sequelize = sequelize;
db.User = User;

// init한 부분 설정
User.init(sequelize);

// 외래키 관계부분

export { db };
