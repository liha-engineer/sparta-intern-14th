import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';
import dotenv from 'dotenv';

dotenv.config();


const loginAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(404).json({message : '토큰이 존재하지 않습니다.'})

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESSTOKEN_KEY);
    if (!decodedToken)
      return res.status(403).json({message : '유효하지 않은 토큰입니다.'})

    const username = decodedToken.username;
    const user = await prisma.accounts.findFirst ({
        where : { username : username }, 
    }); 
    if (!user)
      return res.status(404).json({message : '토큰 사용자가 존재하지 않습니다.'})

    // req.user에 조회된 사용자 정보를 할당
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({message : '토큰이 만료되었습니다.'})
    if (err.name === 'JsonWebTokenError')
        return res.status(401).json({message : '토큰이 손상되었습니다.'})

    return res.status(400).json({ message: err.message });
  }
};

export default loginAuth;