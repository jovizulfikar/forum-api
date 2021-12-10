const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');
const Comment = require('../../Domains/comments/entities/Comment');

class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    this._validatePayload(payload);
    const { id } = payload;

    const thread = await this._threadRepository.getThreadById(id);
    const comments = await this._commentRepository.getCommentsByThreadId(id);

    return new ThreadDetail({
      ...thread,
      comments: comments.map((comment) => {
        if (comment.isDelete) {
          // eslint-disable-next-line no-param-reassign
          comment.content = '**komentar telah dihapus**';
        }
        return new Comment(comment);
      }),
    });
  }

  _validatePayload(payload) {
    const { id } = payload;
    if (!id) {
      throw new Error('GET_THREAD_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string') {
      throw new Error('GET_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetThreadUseCase;
