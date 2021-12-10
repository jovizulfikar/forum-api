class PostedComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, content, owner, thread,
    } = payload;

    this.id = id;
    this.content = content;
    this.owner = owner;
    this.thread = thread;
  }

  _verifyPayload({
    id, content, owner, thread,
  }) {
    if (!id || !content || !owner || !thread) {
      throw new Error('POSTED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string' || typeof thread !== 'string') {
      throw new Error('POSTED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PostedComment;
