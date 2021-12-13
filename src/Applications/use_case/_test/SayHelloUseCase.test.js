const SayHelloUseCase = require('../SayHelloUseCase');
const UserRepository = require('../../../Domains/users/UserRepository');

describe('SayHelloUseCase', () => {
  it('should throw error if payload not contain username', async () => {
    // Arrange
    const useCase = new SayHelloUseCase({});

    // Action & Assert
    await expect(useCase.execute())
      .rejects
      .toThrowError('SAY_HELLO_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if username not string', async () => {
    // Arrange
    const payload = { username: 1 };
    const useCase = new SayHelloUseCase(payload);

    // Action & Assert
    await expect(useCase.execute(payload))
      .rejects
      .toThrowError('SAY_HELLO_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the say hello action correctly', async () => {
    // Arrange
    const payload = { id: 'user-123' };
    const expected = 'Hello Dicoding!';

    const mockUserRepository = new UserRepository();
    mockUserRepository.getById = jest.fn(() => Promise.resolve('Dicoding'));

    const useCase = new SayHelloUseCase({ mockUserRepository });

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(result).toStrictEqual(expected);
    expect(mockUserRepository.getById).toBeCalledWith(payload.id);
  });
});
