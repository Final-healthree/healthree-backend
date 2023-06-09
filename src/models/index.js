// 시퀄라이즈 생성하기위한 인덱스.js
export * from "./sequelize.js";
import sequelize from "./sequelize.js";

// 유저, 포스트, 댓글, 좋아요 임포트

import User from "./user.js";
<<<<<<< HEAD
=======
import Goal from "./goal.js";
import Video from "./video.js";
import Post from "./post.js";
import Comment from "./comment.js";
import Like from "./like.js";
>>>>>>> aae08e81cf3fd918b0b85247706e7237f73e0ee0

const db = {};

// 받아온 클래스들 사용
db.sequelize = sequelize;
db.User = User;
<<<<<<< HEAD

// init한 부분 설정
User.init(sequelize);

// 외래키 관계부분
=======
db.Goal = Goal;
db.Video = Video;
db.Post = Post;
db.Comment = Comment;
db.Like = Like;

// init한 부분 설정
User.init(sequelize);
Goal.init(sequelize);
Video.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);

// 외래키 관계부분
User.associate(db);
Goal.associate(db);
Video.associate(db);
Post.associate(db);
Comment.associate(db);
Like.associate(db);
>>>>>>> aae08e81cf3fd918b0b85247706e7237f73e0ee0

export { db };
