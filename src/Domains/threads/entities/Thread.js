class Thread {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, title, body, date, username,
    } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
  }

  _verifyPayload(payload) {
    const {
      id, title, body, date, username,
    } = payload;

    if (!id || !title || !body || !date || !username) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if ((typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || !(date instanceof Date) || typeof username !== 'string')) {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Thread;
