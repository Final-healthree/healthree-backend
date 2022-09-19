/**
 * @swagger
 *  /user/info:
 *    get:
 *      tags: [UserInfo]
 *      summary: User 정보 조회 API
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: Empty or Data
 *        schema:
 *            type: object
 *            properties:
 *                UserInfo:
 *                    type: object
 *                    properties:
 *                        Name:
 *                            type: string
 *                        studentID:
 *                            type: number
 *                        Department:
 *                            type: string
 *                        Grade:
 *                            type: number
 *                        PhoneNumber:
 *                            type: string
 *                        Email:
 *                            type: string
 *                        Part:
 *                            type: string
 *                        Status:
 *                            type: string
 *                        Warning:
 *                            type: number
 *                        Permission:
 *                            type: string
 *       500:
 *        description: Server Error
 */
/**
 * @swagger
 *  /user/test:
 *    post:
 *      tags: [UserTest]
 *      summary: User 정보 테스트 API
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: Empty or Data
 *        schema:
 *            type: object
 *            properties:
 *                UserInfo:
 *                    type: object
 *                    properties:
 *                        Name:
 *                            type: string
 *                        studentID:
 *                            type: number
 *                        Department:
 *                            type: string
 *                        Grade:
 *                            type: number
 *                        PhoneNumber:
 *                            type: string
 *                        Email:
 *                            type: string
 *                        Part:
 *                            type: string
 *                        Status:
 *                            type: string
 *                        Warning:
 *                            type: number
 *                        Permission:
 *                            type: string
 *       500:
 *        description: Server Error
 */
