const VerifyComment = require('../VerifyComment');

describe('a DeleteComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new VerifyComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      thread: 'thread-123',
      comment: {},
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new VerifyComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeleteComment entities correctly', () => {
    // Arrange
    const payload = {
      thread: 'thread-123',
      comment: 'comment-1',
      owner: 'user-1',
    };

    // Act
    const deleteComment = new VerifyComment(payload);

    // Assert
    expect(deleteComment.thread).toEqual(payload.thread);
    expect(deleteComment.comment).toEqual(payload.comment);
    expect(deleteComment.owner).toEqual(payload.owner);
  });
});
