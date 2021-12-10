const PostThread = require('../PostThread');

describe('a PostThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      body: '',
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new PostThread(payload)).toThrowError('POST_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 'Thread Title',
      body: {},
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new PostThread(payload)).toThrowError('POST_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create PostThread entities correctly', () => {
    // Arrange
    const payload = {
      title: 'Thread Title',
      body: 'a thread',
      owner: 'user-1',
    };

    // Act
    const postThread = new PostThread(payload);

    // Assert
    expect(postThread.title).toEqual(payload.title);
    expect(postThread.body).toEqual(payload.body);
    expect(postThread.owner).toEqual(payload.owner);
  });
});
