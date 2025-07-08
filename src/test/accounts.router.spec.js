// validation.spec.js
import { isValidUsername } from './usernameValidation.js';
import { isValidPassword } from './passwordValidation.js';
import { isValidNickname } from './nickNameValidation.js';

test('아이디는 4~20자 사이여야 한다.', async () => {
  expect(await isValidUsername("liha28")).toEqual(true);
  expect(await isValidUsername("li")).toEqual(false);
});

test('이미 등록된 아이디를 사용하면 가입이 되지 않는다.', async () => {
  expect(await isValidUsername("liha2929")).toEqual(true);
  expect(await isValidUsername("liha27")).toEqual(false);
});

test('아이디는 한글, 영대소문자, 숫자, 하이픈, 언더스코어, 구두점 으로 구성되어야 한다.', async () => {
  expect(await isValidUsername("liha_27")).toEqual(true);
  expect(await isValidUsername("liha!27")).toEqual(false);
  expect(await isValidUsername("l i h a 27")).toEqual(false);
});


test('패스워드는 6~20자 사이여야 한다.', async () => {
  expect(await isValidPassword("liha1234")).toEqual(true);
  expect(await isValidPassword("liha!@#$")).toEqual(true);
  expect(await isValidPassword("liha")).toEqual(false);
});

test('패스워드는 공백을 허용하지 않는다.', async () => {
  expect(await isValidPassword("liha5678")).toEqual(true);
  expect(await isValidPassword("l i h a 1 2 3 4")).toEqual(false);
});

test('닉네임은 한글, 영대소문자, 숫자로 구성되어야 한다.', async () => {
  expect(await isValidNickname("리하바보")).toEqual(true);
  expect(await isValidNickname("리$하!는천재az")).toEqual(false);
});

test('닉네임은 공백을 허용하지 않는다.', async () => {
  expect(await isValidNickname("리하liha")).toEqual(true);
  expect(await isValidNickname("리 하 짱 이 야")).toEqual(false);
});


