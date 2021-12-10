const Comment = require('../../comments/entities/Comment');

class ThreadDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, title, body, date, username, comments,
    } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
    this.comments = comments.map((comment) => new Comment(comment));
  }

  _verifyPayload(payload) {
    const {
      id, title, body, date, username, comments,
    } = payload;

    if (!id || !title || !body || !date || !username || !comments) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if ((typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || !(date instanceof Date) || typeof username !== 'string' || !Array.isArray(comments))) {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ThreadDetail;
