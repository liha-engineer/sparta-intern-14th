import { expect, jest } from '@jest/globals';
import { UserController } from '../src/controllers/user.controller.js';



const mockUserService = {
    signup: jest.fn(),
    login: jest.fn(),
    tokenValidation: jest.fn()
}

const mockRequest = {
    body: jest.fn(),
};

const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    header: jest.fn()
};

const mockNext = jest.fn();
const userController = new UserController(mockUSerService);

describe('User Controller Unit Test', () => {

    beforeEach(() => {
        jest.resetAllMocks(); 

       
        mockResponse.status.mockReturnValue(mockResponse);
    });

    test('signUp Method by Success', async () => {
        const req = mockRequest({
            username: 'liha2727',
            password: 'liha1234',
            nickname: 'pinkOtter',
        });

        const res = mockResponse();
        const mockUser = { username: 'liha27', nickname: 'pinkOtter' };
        mockUsersService.signUp.mockResolvedValue({
            status: 200,
            message: mockUser,
        });

        await usersController.signUp(req, res, mockNext);

        expect(mockUsersService.signUp).toHaveBeenCalledWith('liha27', 'liha1234', 'pinkOtter');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);

    });

  test('signUp Method by Failure (User Already Exists)', async () => {
    const req = mockRequest({
      username: 'lihaExist',
      password: 'liha1234',
      nickname: 'pinkOtter2',
    });
    const res = mockResponse();
    mockUserService.signUp.mockRejectedValue(new CustomError('User already exists', 409));

    await userController.signup(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
    expect(res.status).toHaveBeenCalledWith(409);
  });


  test('login method Success', async () => {
  process.env.ACCESSTOKEN_KEY = 'test-secret';

  const req = mockRequest({
    username: 'liha27',
    password: 'liha1234',
  });

  const res = mockResponse();

  const usersController = new UserController(mockUsersService);
  await usersController.login(req, res, mockNext);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.header).toHaveBeenCalledWith('authorization', 'Bearer mocked-token');
  expect(res.json).toHaveBeenCalledWith({ token: 'mocked-token' });
});


test('getUserInfo - success (보호된 API 접근)', async () => {
  const foundUser = {
    accountUniqueId: 1,
    username: 'liha27',
    nickname: 'pinkOtter',
    createdAt: new Date(),
  };

  const req = mockRequest({}, { username: 'liha' }, { username: 'liha' });
  const res = mockResponse();

  prisma.accounts.findFirst = jest.fn().mockResolvedValue(foundUser);

  const usersController = new UserController(mockUsersService);

  await usersController.getUserInfo(req, res, mockNext);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ account: foundUser });
});


test('getUserInfo -  Failure (보호된 API 접근)', async () => {
  const foundUser = {
    username: 'liha27',
  };

  const req = mockRequest({}, { username: 'liha27' }, { username: 'liha84353' });
  const res = mockResponse();

  prisma.accounts.findFirst = jest.fn().mockResolvedValue(foundUser);

  const usersController = new UserController(mockUsersService);

  await usersController.getUserInfo(req, res, mockNext);

  expect(res.status).toHaveBeenCalledWith(403);
  expect(res.json).toHaveBeenCalledWith({
    error: {
      code: 'ACCESS_DENIED',
      message: '접근 권한이 없습니다.',
    },
  });
});


});