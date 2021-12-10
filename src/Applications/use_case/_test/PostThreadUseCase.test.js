const PostThread = require('../../../Domains/threads/entities/PostThread');
const PostedThread = require('../../../Domains/threads/entities/PostedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const PostThreadUseCase = require('../PostThreadUseCase');

describe('PostThreadUseCase', () => {
  it('should orchestrating the post thread action correctly', async () => {
    // Arrange
    const payload = {
      title: 'title',
      body: 'body',
      owner: 'user-1',
    };

    const expectedResult = new PostedThread({
      id: 'thread-1',
      title: payload.title,
      body: payload.body,
      owner: payload.owner,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(expectedResult));

    /** creating use case instance */
    const postThreadUseCase = new PostThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    const result = await postThreadUseCase.execute(payload);

    // Assert
    expect(result).toStrictEqual(expectedResult);
    expect(mockThreadRepository.addThread).toBeCalledWith(new PostThread(payload));
  });
});
