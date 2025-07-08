import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import textValidation from '../utils/joi/textValidation.js';
import { prisma } from '../utils/prisma/index.js';
import { UserService } from "../services/user.service.js";

export class UserController {
    userService = new UserService();


    signup = async (req, res, next) => {
        try {
            const accountTextValidation = await textValidation.account.validateAsync(req.body);
            const { username, password, nickname } = accountTextValidation;
            const foundUser = this.userService.findUser(username);

            if (foundUser)
                return res.status(409).json({
                    error: {
                        code: 'USER_ALREADY_EXISTS',
                        message: '이미 가입된 사용자입니다.',
                    },
                });

            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await this.userService.createUser(username, hashedPassword, nickname)

            return res.status(201).json({
                username: `${createdUser.username}`,
                nickname: `${createdUser.nickname}`,
            });

        } catch (e) {
            next(e);
        }
    }

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const foundUser = this.userService.findUser(username);

            if (!foundUser)
                return res.status(404).json({
                    error: {
                        code: 'USER_NOT_FOUND',
                        message: '사용자가 존재하지 않습니다.',
                    },
                });

            await this.userService.login(username, password)
            const accessToken = jwt.sign({ accountId: username }, process.env.ACCESSTOKEN_KEY, {
                expiresIn: '3m',
            });

            return res.status(200).header('authorization', `Bearer ${accessToken}`).json({ token: accessToken });
        } catch (e) {
            next(e);
        }
    }

    getUserInfo = async (req, res, next) => {
        try {
            const { username } = req.params;
            const requestedUser = req.user;
            const foundUser = await prisma.accounts.findFirst({
                where: { username: username },
                select: {
                    accountUniqueId: true,
                    username: true,
                    nickname: true,
                    createdAt: true,
                },
            });

            if (!foundUser)
                return res.status(404).json({
                    error: {
                        code: 'USER_NOT_FOUND',
                        message: '사용자가 존재하지 않습니다.',
                    },
                });

            if (requestedUser.username != foundUser.username)
                return res.status(403).json({
                    error: {
                        code: 'ACCESS_DENIED',
                        message: '접근 권한이 없습니다.',
                    },
                });

            return res.status(200).json({ account: foundUser });
        } catch (e) {
            next(e);
        }
    }

}