const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const PostedComment = require('../../Domains/comments/entities/PostedComment');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(postComment) {
    const { content, owner, thread } = postComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, owner, thread',
      values: [id, content, owner, thread],
    };

    const result = await this._pool.query(query);

    return new PostedComment({ ...result.rows[0] });
  }

  async deleteCommentById(id) {
    const query = {
      text: 'UPDATE comments set "isDelete" = true WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async getCommentsByThreadId(id) {
    const query = {
      text: 'SELECT *, comments.id as id, username FROM comments JOIN users ON owner = users.id WHERE thread = $1 ORDER BY date ASC ',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async verifyCommentAvaibility(verifyComment) {
    const { comment: id, owner, thread } = verifyComment;

    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND thread = $2',
      values: [id, thread],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }

    // validate ownership
    const comment = result.rows[0];
    if (comment.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = CommentRepositoryPostgres;
