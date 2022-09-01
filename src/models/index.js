// 시퀄라이즈 생성하기위한 인덱스.js
export * from "./sequelize.js";
import sequelize from "./sequelize.js";

// 유저, 포스트, 댓글, 좋아요 임포트

import User from "./user.js";
import Ing from "./Ing.js";
import Lose from "./Lose.js";
import Done from "./done.js";
import Post from "./post.js";
import Comment from "./comment.js";

const db = {};

// 받아온 클래스들 사용
db.sequelize = sequelize;
db.User = User;
db.Ing = Ing;
db.Lose = Lose;
db.Done = Done;
db.Post = Post;
db.Comment = Comment;
// db.Like = Like;

// init한 부분 설정
User.init(sequelize);
Ing.init(sequelize);
Lose.init(sequelize);
Done.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
// Like.init(sequelize);

// 외래키 관계부분
User.associate(db);
Ing.associate(db);
Lose.associate(db);
Done.associate(db);
Post.associate(db);
Comment.associate(db);
// Like.associate(db);

export { db };
