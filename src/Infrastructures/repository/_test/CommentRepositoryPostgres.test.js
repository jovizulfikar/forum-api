const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const PostComment = require('../../../Domains/comments/entities/PostComment');
const PostedComment = require('../../../Domains/comments/entities/PostedComment');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const VerifyComment = require('../../../Domains/comments/entities/VerifyComment');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist comment and return posted comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});

      const thread = {
        id: 'thread-h_2FkLZhtgBKY2kh4CC02',
        title: 'sebuah thread',
        body: 'sebuah body thread',
        owner: 'user-123',
      };

      await ThreadTableTestHelper.addThread(thread);

      const postComment = new PostComment({
        content: 'a comment',
        owner: 'user-123',
        thread: thread.id,
      });

      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(postComment);

      // Assert
      const threads = await CommentTableTestHelper.findCommentsById('comment-123');
      expect(threads).toHaveLength(1);
    });

    it('should return posted comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});

      const thread = {
        id: 'thread-h_2FkLZhtgBKY2kh4CC02',
        title: 'sebuah thread',
        body: 'sebuah body thread',
        owner: 'user-123',
      };

      await ThreadTableTestHelper.addThread(thread);

      const postComment = new PostComment({
        content: 'a comment',
        owner: 'user-123',
        thread: thread.id,
      });

      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const postedComment = await commentRepositoryPostgres.addComment(postComment);

      // Assert
      expect(postedComment).toStrictEqual(new PostedComment({
        ...postComment,
        id: 'comment-123',
      }));
    });
  });

  describe('deleteCommentById function', () => {
    it('should update comment content correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});

      const thread = {
        id: 'thread-123',
        title: 'twitter',
        body: 'a thread',
        owner: 'user-123',
      };

      await ThreadTableTestHelper.addThread(thread);

      const payload = {
        comment: 'comment-123',
      };

      await CommentTableTestHelper.addComment({
        id: payload.comment,
        content: 'comment-123',
        owner: 'user-123',
        thread: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await commentRepositoryPostgres.deleteCommentById(payload.comment);

      // Assert
      const deletedComment = await CommentTableTestHelper.findCommentsById('comment-123');
      expect(deletedComment[0].isDelete).toEqual(true);
    });
  });

  describe('getCommentsByThreadId function', () => {
    it('should return comments data correctly', async () => {
      // Arrange
      const thread = {
        id: 'thread-123',
        title: 'twitter',
        body: 'a thread',
        owner: 'user-123',
      };

      const comment1 = {
        id: 'comment-1',
        content: 'a comment',
        owner: 'user-123',
        thread: thread.id,
      };

      const comment2 = {
        id: 'comment-2',
        content: 'a comment',
        owner: 'user-123',
        thread: thread.id,
        isDelete: true,
      };

      await UsersTableTestHelper.addUser({});
      await ThreadTableTestHelper.addThread(thread);
      await CommentTableTestHelper.addComment(comment1);

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsByThreadId(thread.id);

      // Assert
      expect(comments[0].id).toEqual(comment1.id);
      expect(comments[0].username).toEqual('dicoding');
      expect(comments[0].content).toEqual(comment1.content);
    });
  });

  describe('verifyThreadAvailability', () => {
    it('should throw NotFound when comment not found', async () => {
      // Arrange
      const payload = new VerifyComment({
        thread: 'thread-123',
        comment: 'comment-123',
        owner: 'user-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentAvaibility(payload))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should throw AuthorizationError when user not owning the comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await UsersTableTestHelper.addUser({ id: 'user-456', username: 'dicoding2' });

      const thread = {
        id: 'thread-123',
        title: 'twitter',
        body: 'a thread',
        owner: 'user-123',
      };

      await ThreadTableTestHelper.addThread(thread);

      const payload = new VerifyComment({
        thread: 'thread-123',
        comment: 'comment-123',
        owner: 'user-123',
      });

      await CommentTableTestHelper.addComment({
        id: payload.comment,
        content: 'a comment',
        owner: 'user-456',
        thread: payload.thread,
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentAvaibility(payload))
        .rejects
        .toThrowError(AuthorizationError);
    });

    it('should verified successfully', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await UsersTableTestHelper.addUser({ id: 'user-456', username: 'dicoding2' });

      const thread = {
        id: 'thread-123',
        title: 'twitter',
        body: 'a thread',
        owner: 'user-123',
      };

      await ThreadTableTestHelper.addThread(thread);

      const payload = new VerifyComment({
        thread: 'thread-123',
        comment: 'comment-123',
        owner: 'user-123',
      });

      await CommentTableTestHelper.addComment({
        id: payload.comment,
        content: 'a comment',
        owner: 'user-123',
        thread: payload.thread,
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentAvaibility(payload))
        .resolves.not.toThrow(Error);
    });
  });
});
