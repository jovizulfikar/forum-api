const PostCommentUseCase = require('../../../../Applications/use_case/PostCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentsHandler = this.postCommentsHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentsHandler(request, h) {
    const postCommentUseCase = this._container.getInstance(PostCommentUseCase.name);
    const addedComment = await postCommentUseCase.execute({
      content: request.payload.content,
      thread: request.params.threadId,
      owner: request.auth.credentials.id,
    });

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    await deleteCommentUseCase.execute({
      thread: request.params.threadId,
      comment: request.params.commentId,
      owner: request.auth.credentials.id,
    });
    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
