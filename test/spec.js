const request = require('supertest');

describe('loading express', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('../bin/www')];
    server = require('../bin/www');
  });

  afterEach(done => {
    server.close(done);
  });

  it('responds to /', done => {
    request(server)
      .get('/stats/public')
      .expect(200, done);
  });

  it('404 everything else', done => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
