const PostComment = require('../../Domains/comments/entities/PostComment');

class PostCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const postComment = new PostComment({ ...payload });
    await this._threadRepository.verifiyThreadAvaibility(postComment.thread);
    return this._commentRepository.addComment(postComment);
  }
}

module.exports = PostCommentUseCase;
