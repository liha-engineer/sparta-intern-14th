// __tests__/unit/posts.repository.unit.spec.js

import { expect, jest } from '@jest/globals';
import { UserRepository } from '../src/repositories/user.repository.js';

// Prisma 클라이언트에서는 아래 5개의 메서드만 사용합니다.
let mockPrisma = {
    users: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

let userRepository = new UserRepository(mockPrisma);

describe('User Repository Unit Test', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('findUser Method', async () => {
        const mockReturn = 'findFirst String';
        mockPrisma.users.findFirst.mockReturnValue(mockReturn);

        const user = await userRepository.findUser();
        expect(user).toBe(mockReturn);

    });


    test('createUser Method', async () => {
        const mockReturn = 'creatUser Return String';
        mockPrisma.users.create.mockReturnValue(mockReturn)
        const createUserParams = {
            username: 'createUserName',
            password: 'createUserPassword',
            nickname: 'createUserNickName',
        }


    });

});