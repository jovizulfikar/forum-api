const SayHelloUseCase = require('../SayHelloUseCase');
const UserRepository = require('../../../Domains/users/UserRepository');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');

describe('SayHelloUseCase', () => {
  it('should throw error if payload not contain user id', async () => {
    // Arrange
    const useCase = new SayHelloUseCase({});

    // Action & Assert
    await expect(useCase.execute({}))
      .rejects
      .toThrowError('SAY_HELLO_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if user id not string', async () => {
    // Arrange
    const payload = { userId: 1 };
    const useCase = new SayHelloUseCase({});

    // Action & Assert
    await expect(useCase.execute(payload))
      .rejects
      .toThrowError('SAY_HELLO_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the say hello action correctly', async () => {
    // Arrange
    const user = {
      id: 'user-123',
      fullname: 'Dicoding',
      username: 'dicoding',
    };

    const payload = { userId: user.id };
    const expected = `Hello ${user.fullname}!`;

    const mockUserRepository = new UserRepository();
    mockUserRepository.getById = jest.fn(() => Promise.resolve(new RegisteredUser(user)));

    const useCase = new SayHelloUseCase({
      userRepository: mockUserRepository,
    });

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(result).toStrictEqual(expected);
    expect(mockUserRepository.getById).toBeCalledWith(payload.userId);
  });
});
