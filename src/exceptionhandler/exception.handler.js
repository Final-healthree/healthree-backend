import { CustomException, UnknownException } from "../exception/custom.exception.js";

/**
 *
 * @param { Error } err
 * @returns { CustomException }
 */
export const exception_handler = (err) => {
    if (err instanceof CustomException) return err;
    else if (err instanceof Error) return new UnknownException(err.message); // stack 가능
    else return new UnknownException(`알 수 없는 에러가 발생하였습니다`);
};
