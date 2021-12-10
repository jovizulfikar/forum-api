const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');
const Thread = require('../../../Domains/threads/entities/Thread');
const Comment = require('../../../Domains/comments/entities/Comment');
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail');

describe('GetThreadUseCase', () => {
  it('should throw error if use case payload not contain id', async () => {
    // Arrange
    const useCasePayload = {};
    const getThreadUseCase = new GetThreadUseCase({});

    // Action & Assert
    await expect(getThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if id not string', async () => {
    // Arrange
    const useCasePayload = {
      id: 123,
    };
    const getThreadUseCase = new GetThreadUseCase({});

    // Action & Assert
    await expect(getThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const expectedThread = {
      id: 'thread-h_2FkLZhtgBKY2kh4CC02',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: new Date(),
      username: 'dicoding',
    };

    const expectedComments = [
      {
        id: 'comment-_pby2_tmXV6bcvcdev8xk',
        username: 'johndoe',
        date: new Date(),
        content: 'sebuah comment',
        isDelete: false,
      },
      {
        id: 'comment-_pby2_tmXV6bcvcdev123',
        username: 'johndoe',
        date: new Date(),
        content: 'sebuah comment',
        isDelete: true,
      },
    ];

    const expectedResult = new ThreadDetail({ ...expectedThread, comments: expectedComments });

    const useCasePayload = {
      id: expectedThread.id,
    };

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(expectedThread));
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(expectedComments));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    const result = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(result.id).toEqual(expectedResult.id);
    expect(result.title).toEqual(expectedResult.title);
    expect(result.body).toEqual(expectedResult.body);
    expect(result.date).toEqual(expectedResult.date);
    expect(result.username).toEqual(expectedResult.username);
    expect(result.comments[0]).toEqual(expectedResult.comments[0]);
    expect(result.comments[1]).toEqual(new Comment({ ...expectedResult.comments[1], content: '**komentar telah dihapus**' }));
    expect(mockThreadRepository.getThreadById)
      .toHaveBeenCalledWith(useCasePayload.id);
    expect(mockCommentRepository.getCommentsByThreadId)
      .toHaveBeenCalledWith(useCasePayload.id);
  });
});
