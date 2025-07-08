import bcrypt from 'bcrypt'

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    findUser = async (username) => {
        const foundUser = await this.userRepository.findUser(username);
        if (!foundUser) throw new Error('유저가 존재하지 않습니다.');
        return foundUser;
    }

    createUser = async (username, password, nickname) => {
        const createdUser = await this.userRepository.createUser(username, password, nickname);
        if (!createdUser) throw new Error('유저가 존재하지 않습니다.');
        return createdUser;
    }

    login = async (username, password) => {
        const foundUser = await this.userRepository.findUser(username);
        if (!foundUser) throw new Error('유저가 존재하지 않습니다.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const passwordValidation = await bcrypt.compare(password, hashedPassword);
        if(!passwordValidation) throw new Error('아이디 또는 비밀번호가 유효하지 않습니다.');
        
    }

    getUserInfo = async (requestedUser, username) => {
        const foundUser = await this.userRepository.getUserInfo(username);
        if (!foundUser) throw new Error('유저가 존재하지 않습니다.');
        return {
            userUniqueId: foundUser.userUniqueId,
            username: username,
            nickname: foundUser.nickname,
            createdAt: foundUser.createdAt
        }
    }


}