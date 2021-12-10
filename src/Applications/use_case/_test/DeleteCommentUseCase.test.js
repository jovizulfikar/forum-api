const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const VerifyComment = require('../../../Domains/comments/entities/VerifyComment');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      thread: 'thread-123',
      comment: 'comment-123',
      owner: 'user-123',
    };

    const mockCommentRepository = new CommentRepository();

    mockCommentRepository.deleteCommentById = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentAvaibility = jest.fn(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    await expect(mockCommentRepository.verifyCommentAvaibility).toBeCalledWith(new VerifyComment({
      thread: useCasePayload.thread,
      comment: useCasePayload.comment,
      owner: useCasePayload.owner,
    }));
    await expect(mockCommentRepository.deleteCommentById).toBeCalledWith(useCasePayload.comment);
  });
});
