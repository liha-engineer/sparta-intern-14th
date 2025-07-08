// validation.spec.js
import { isValidUsername } from './usernameValidations.js';
import { isValidPassword } from './passwordValidations.js';
import { isValidNickname } from './nicknameValidations.js';

test('아이디는 4~20자 사이로 지어야 한다.', async () => {
  expect(await isValidUsername("liha28")).toEqual(true);
  expect(await isValidUsername("li")).toEqual(false);
});

test('이미 등록된 아이디를 사용하면 가입이 되지 않는다.',async() => {
  expect(await isValidUsername("liha2929")).toEqual(true);
  expect(await isValidUsername("liha27")).toEqual(false);
});

test('아이디는 한글, 영대소문자, 숫자, 하이픈, 언더스코어, 구두점 으로 구성되어야 한다.', async () => {
  expect(await isValidUsername("liha_27")).toEqual(true);
  expect(await isValidUsername("liha!27")).toEqual(false);
  expect(await isValidUsername("l i h a 27")).toEqual(false);
});
