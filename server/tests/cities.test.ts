import {expect} from 'chai';
import {describe} from 'mocha';

import request from 'supertest';
import app from '../src/app';

describe('City controller test', () => {
  it('Return all cities', (done) => {
    request(app)
      .get('/cities/')
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
      .get('/cities/name/Muurame')
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
