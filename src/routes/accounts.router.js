import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import textValidation from '../utils/joi/textValidation.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { prisma } from '../utils/prisma/index.js';
import { findUser } from '../utils/prisma/index.js';

dotenv.config();
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const accountTextValidation = await textValidation.account.validateAsync(req.body);
    const { username, password, nickname } = accountTextValidation;
    const foundUser = await findUser(username);

    if (foundUser) return res.status(409).json({
      "error": {
        "code": "USER_ALREADY_EXISTS",
        "message": "이미 가입된 사용자입니다."
      }
    })

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.accounts.create({
      data: {
        username,
        password: hashedPassword,
        nickname,
      }
    });

    return res.status(201).json({
      username: `${user.username}`,
      nickname: `${user.nickname}`
    })

  } catch (e) {
    console.error('에러 발생: ', e)
    return res.status(400).json(e.message)
  }
})


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await findUser(username);
  if (!foundUser) return res.status(404).json({
    error: {
      "code": "USER_NOT_FOUND",
      "message": "사용자가 존재하지 않습니다."
    }
  })

  const passwordCompare = await bcrypt.compare(password, foundUser.password);
  if (!passwordCompare) return res.status(401).json({
    "error": {
      "code": "INVALID_CREDENTIALS",
      "message": "아이디 또는 비밀번호가 올바르지 않습니다."
    }
  });

  const accessToken = jwt.sign(
    { accountId: username },
    process.env.ACCESSTOKEN_KEY,
    { expiresIn: '30s' });

  return res.status(200).header('authorization', `Bearer ${accessToken}`)
    .json({ token: accessToken });
})


router.get('/userinfo/:username', authMiddleware, async (req, res, next) => {
  const { username } = req.params;
  const requestedUser = req.user;
  const foundUser = await prisma.accounts.findFirst({
    where: { username: username },
    select: {
      accountUniqueId: true,
      username: true,
      nickname: true,
      createdAt: true,
    }
  });

  if (!foundUser) return res.status(404).json({
    error: {
      "code": "USER_NOT_FOUND",
      "message": "사용자가 존재하지 않습니다."
    }
  })

  if (requestedUser.username != foundUser.username) return res.status(403).json({
    error: {
      "code": "ACCESS_DENIED",
      "message": "접근 권한이 없습니다."
    }
  })

  return res.status(200).json({ account: foundUser });

})

export default router;