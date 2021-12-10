const PostedComment = require('../../../Domains/comments/entities/PostedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const PostCommentUseCase = require('../PostCommentUseCase');
const PostComment = require('../../../Domains/comments/entities/PostComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('PostCommentUseCase', () => {
  it('should orchestrating the post thread action correctly', async () => {
    // Arrange
    const payload = {
      content: 'a comment',
      thread: 'thread-1',
      owner: 'user-1',
    };

    const expectedResult = new PostedComment({
      id: 'comment-1',
      content: payload.content,
      thread: payload.thread,
      owner: payload.owner,
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(expectedResult));
    mockThreadRepository.verifiyThreadAvaibility = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const postCommentUseCase = new PostCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Act
    const result = await postCommentUseCase.execute(payload);

    // Assert
    expect(result).toStrictEqual(expectedResult);
    expect(mockCommentRepository.addComment).toBeCalledWith(new PostComment(payload));
    expect(mockThreadRepository.verifiyThreadAvaibility).toBeCalledWith(payload.thread);
  });
});
