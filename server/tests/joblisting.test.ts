import {expect} from 'chai';
import {describe} from 'mocha';

import request from 'supertest';
import app from '../src/app';

describe('Joblisting controller test', () => {
  it('Create jobadvert', (done) => {
    request(app)
      .post('/joblistings/')
      .send({
        firstname: 'Pekka',
        familyname: 'Pekkanen',
        company: null,
        startdate: null,
        email: 'pekka@gmail.com',
        phonenumber: '0446529844',
        jobtitle: 'Töitä',
        description: 'Menkää töihin',
        salary: 'No ei nyt semmosia',
        validuntil: '2022-12-31',
        isvalid: true,
        accepted: false,
        city: 'Muurame',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done;
        }

        expect(JSON.parse(res.text).success).to.be.true;

        return done();
      });
  });
  it('Return all jobs', (done) => {
    request(app)
      .get('/joblistings/')
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
