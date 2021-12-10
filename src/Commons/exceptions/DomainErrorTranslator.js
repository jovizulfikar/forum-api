const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'POST_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'POST_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'POSTED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'POSTED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'POST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'POST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'POSTED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'POSTED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'COMMENT_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'COMMENT_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('not contain needed property'),
  'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('not meet data type spesification'),
  'GET_THREAD_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('payload not contain needed property'),
  'GET_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('payload not meet data type spesification'),
};

module.exports = DomainErrorTranslator;
