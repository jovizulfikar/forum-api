const VerifyComment = require('../../Domains/comments/entities/VerifyComment');

class DeleteCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const verifyComment = new VerifyComment(payload);
    await this._commentRepository.verifyCommentAvaibility(verifyComment);
    await this._commentRepository.deleteCommentById(verifyComment.comment);
  }
}

module.exports = DeleteCommentUseCase;
