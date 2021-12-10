const PostedThread = require('../PostedThread');

describe('a PostedThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      body: '',
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new PostedThread(payload)).toThrowError('POSTED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-1',
      title: 'Thread Title',
      body: {},
      owner: 'user-1',
    };

    // Act & Assert
    expect(() => new PostedThread(payload)).toThrowError('POSTED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create PostedThread entities correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'a thread',
      owner: 'user-1',
    };

    // Act
    const postedThread = new PostedThread(payload);

    // Assert
    expect(postedThread.id).toEqual(payload.id);
    expect(postedThread.title).toEqual(payload.title);
    expect(postedThread.body).toEqual(payload.body);
    expect(postedThread.owner).toEqual(payload.owner);
  });
});
