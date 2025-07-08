import { UserRepository } from "../repositories/user.repository.js"

export class UserService {
    userRepository = new UserRepository();

    findUser = async (username) => {
        const foundUser = await this.userRepository.findUser(username);
            return foundUser;
    }



    createUser = async (username, password, nickname) => {
        const createdUser = await this.userRepository.createUser(username, password, nickname);
        return createdUser;
    }

    login = async (username, password) => {

    }

    getUserInfo = async (requestedUser, username) => {
        const foundUser = await this.userRepository.getUserInfo(username);
        return {
            userUniqueId: foundUser.userUniqueId,
            username: username,
            nickname: foundUser.nickname,
            createdAt: foundUser.createdAt
        }
    }


}