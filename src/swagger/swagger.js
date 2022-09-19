import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

// Swagger definition
// can set every attribute except paths and swagger
export const swaggerDefinition = {
    info: {
        // API information (required all)
        title: "Healthree",
        version: "1.0.0",
        description: "Healthree API",
    },
    // optional
    host: `localhost:${process.env.PORT}`,
    basePath: "/",
};

// Options for the swagger docs
export const options = {
    swaggerDefinition, // Import SwaggerDefinitions
    components: {
        res: {
            BadRequest: {
                description: "잘못된 요청.",
            },
            Forbidden: {
                description: "권한이 없음.",
            },
            NotFound: {
                description: "없는 리소스 요청.",
            },
        },
        errorResult: {
            Error: {
                type: "object",
                properties: {
                    errMsg: {
                        type: "string",
                        description: "Error.",
                    },
                },
            },
        },
    },
    schemes: ["http", "https"], // 사용 가능한 통신 방식
    // 모델 정의 (User 모델에서 사용되는 속성 정의)
    definitions: {
        User: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                },
                age: {
                    type: "integer",
                },
                addr: {
                    type: "string",
                },
            },
        },
    },
    apis: ["./routes/*.js", "./swagger/*"],
};

// Initialize swagger-jsDoc => returns validated swagger spec in json format
export const specs = swaggerJSDoc(options);
