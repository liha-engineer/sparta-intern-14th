import joi from 'joi';

const textValidation = {
  account: joi.object({
    username: joi
      .string()
      .pattern(new RegExp('^[A-Za-z0-9-_.\s+]+$'))
      .min(4)
      .max(12)
      .required()
      .messages({
        'string.pattern.base': '아이디는 영문 및 숫자로 구성해 주세요.',
        'string.empty': '아이디를 입력해 주세요.',
        'string.min': '아이디를 4자 이상 입력해 주세요.',
        'string.max': '아이디를 12자 이하로 입력해 주세요.',
      }),

    nickname: joi.string().pattern(new RegExp('^[가-힣A-Za-z0-9]+$')).min(2).max(8).required().messages({
      'string.pattern.base': '닉네임은 한글 또는 영문과 숫자의 조합으로 만들어주세요.',
      'string.empty': '닉네임을 입력해 주세요.',
      'string.min': '닉네임을 2자 이상 입력해 주세요.',
      'string.max': '닉네임을 8자 이하로 입력해 주세요.',
    }),

    password: joi.string().min(6).max(20).required().messages({
      'stirng.empty': '비밀번호를 입력해 주세요.',
      'string.min': '비밀번호를 6자 이상 입력해 주세요.',
      'string.max': '비밀번호를 20자 이하로 입력해 주세요.',
    }),
  }),
};

export default textValidation;
