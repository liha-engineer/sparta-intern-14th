import { UserRepository } from "../repositories/user.repository.js";

// 4~20자 한글, 영대소문자, 숫자, 하이픈, 언더스코어, 구두점
export const isValidUsername = async (value) => {
    const username = (value || '');
    const userRepository = new UserRepository();
    const foundUser = await userRepository.findUser(username);

    if (username.length < 4 || username.length > 20) {
        return false;
    } else if (username.includes(' ')) {
        return false;
    } else if (/[^A-Za-z0-9\-_.]/g.test(username)) {
        return false;
    }
    else if (foundUser) {
        return false;
    }
    return true;
}
