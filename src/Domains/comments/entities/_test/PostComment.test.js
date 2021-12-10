const PostComment = require('../PostComment');

describe('a PostComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new PostComment(payload)).toThrowError('POST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      content: {},
      owner: 'user-1',
      thread: 'thread-1',
    };

    // Act & Assert
    expect(() => new PostComment(payload)).toThrowError('POST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create PostComment entities correctly', () => {
    // Arrange
    const payload = {
      content: 'a comment',
      owner: 'user-1',
      thread: 'thread-1',
    };

    // Act
    const postComment = new PostComment(payload);

    // Assert
    expect(postComment.content).toEqual(payload.content);
    expect(postComment.owner).toEqual(payload.owner);
    expect(postComment.thread).toEqual(payload.thread);
  });
});
