
export class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    createUser = async (username, password, nickname) => {
        const foundUser = await this.findUser(username);
        if (foundUser) return {

        }
        const createdUser = await this.prisma.accounts.create({
            data: {
                username,
                password,
                nickname,
            }
        })

        return {
            username: `${createdUser.username}`,
            nickname: `${createdUser.nickname}`,
        }

    }

    findUser = async (username) => {
        const foundUser = await this.prisma.accounts.findFirst({
            where: { username: username }
        });
        if(!foundUser) return false;

        return foundUser;
    }

    getUserInfo = async (requestedUser, username) => {
        const foundUser = await this.prisma.accounts.findFirst({
            where: { username: requestedUser.username },
            select: {
                accountUniqueId: true,
                username: true,
                nickname: true,
                createdAt: true,
            },
        });
        return foundUser;
    }

}