const PostedComment = require('../PostedComment');

describe('a PostedComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new PostedComment(payload)).toThrowError('POSTED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-1',
      content: {},
      owner: 'user-1',
      thread: 'thread-1',
    };

    // Act & Assert
    expect(() => new PostedComment(payload)).toThrowError('POSTED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create PostedComment entities correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-1',
      content: 'a comment',
      owner: 'user-1',
      thread: 'thread-1',
    };

    // Act
    const postedComment = new PostedComment(payload);

    // Assert
    expect(postedComment.id).toEqual(payload.id);
    expect(postedComment.content).toEqual(payload.content);
    expect(postedComment.owner).toEqual(payload.owner);
    expect(postedComment.thread).toEqual(payload.thread);
  });
});
