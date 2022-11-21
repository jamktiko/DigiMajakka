import {expect} from 'chai';
import {describe} from 'mocha';

import request from 'supertest';
import app from '../src/app';

describe('School controller test', () => {
  it('Return all schools', (done) => {
    request(app)
      .get('/schools/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done;
        }

        expect(JSON.parse(res.text)).to.be.an('array').to.be.not.empty;

        return done();
      });
  });
  it('Return city by name', (done) => {
    request(app)
      .get('/schools/Orja opisto')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done;
        }

        expect(JSON.parse(res.text)).to.be.an('array').to.be.not.empty;

        return done();
      });
  });
});
