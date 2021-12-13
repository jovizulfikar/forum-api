const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const pool = require('../../database/postgres/pool');

describe('/comments endpoint', () => {
  afterEach(async () => {
    await CommentTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST /comments', () => {
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const server = await createServer(container);

      const requestPayload = {};

      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-h_2FkLZhtgBKY2kh4CC02/comments',
        payload: requestPayload,
        auth: {
          strategy: 'jwt',
          credentials: {
            id: 'user-321',
          },
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('not contain needed property');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const server = await createServer(container);

      const requestPayload = {
        content: {},
      };

      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-h_2FkLZhtgBKY2kh4CC02/comments',
        payload: requestPayload,
        auth: {
          strategy: 'jwt',
          credentials: {
            id: 'user-321',
          },
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('not meet data type spesification');
    });

    it('should response 401 when header not contain auth token', async () => {
      // Arrange
      const server = await createServer(container);

      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-h_2FkLZhtgBKY2kh4CC02/comments',
      });

      // Assert
      expect(response.statusCode).toEqual(401);
    });

    it('should response 404 when thread not found', async () => {
      // Arrange
      const server = await createServer(container);

      const requestPayload = {
        content: 'a comment',
      };

      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: requestPayload,
        auth: {
          strategy: 'jwt',
          credentials: {
            id: 'user-321',
          },
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });

    it('should response 201 and persisted comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadTableTestHelper.addThread({});

      const server = await createServer(container);

      const requestPayload = {
        content: 'a comment',
      };

      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: requestPayload,
        auth: {
          strategy: 'jwt',
          credentials: {
            id: 'user-123',
          },
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment.id).toBeDefined();
      expect(responseJson.data.addedComment.content).toBeDefined();
      expect(responseJson.data.addedComment.owner).toBeDefined();
      expect(responseJson.data.addedComment.thread).toBeDefined();
    });
  });

  describe('when DELETE /comments', () => {
    it('should response 401 when header not contain auth token', async () => {
      // Arrange
      const server = await createServer(container);

      // Act
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123',
      });

      // Assert
      expect(response.statusCode).toEqual(401);
    });

    it('should response 404 when comment not found', async () => {
      // Arrange
      const server = await createServer(container);

      const requestPayload = {
        content: 'a comment',
      };

      // Act
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-h_2FkLZhtgBKY2kh4CC02/comments/comment-123',
        payload: requestPayload,
        auth: {
          strategy: 'jwt',
          credentials: {
            id: 'user-321',
          },
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('comment tidak ditemukan');
    });

    it('should response 200 and updated comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadTableTestHelper.addThread({});

      await CommentTableTestHelper.addComment({
        id: 'comment-123',
        content: 'a comment',
        owner: 'user-123',
        thread: 'thread-123',
      });

      const server = await createServer(container);

      const requestPayload = {
        content: 'a comment',
      };

      // Act
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123',
        payload: requestPayload,
        auth: {
          strategy: 'jwt',
          credentials: {
            id: 'user-123',
          },
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
  });
});
