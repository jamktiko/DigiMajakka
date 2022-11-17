//import {expect} from 'chai';

// import {expect} from 'chai';
import queryDb from '../src/db-connection';
import {describe} from 'mocha';
import {expect} from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Profile controller test', () => {
  it('Return all profiles', (done) => {
    request(app)
      .get('/profiles/')
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
  it('Return one profile', (done) => {
    request(app)
      .get('/profiles/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done;
        }

        expect(JSON.parse(res.text)).to.be.an('array').length.to.equal(1);

        return done();
      });
  });

  it('Insert profile', (done) => {
    request(app)
      .post('/profiles/')
      .send({
        email: 'testaus@gmail.com',
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
  it('Update profile', async (done) => {
    const profileid = await queryDb(
      'SELECT userprofileid FROM UserProfile WHERE UserAccount_email = testaus@gmail.com;',
      [],
    );
    request(app)
      .put('/profiles/update/' + profileid[0].userprofileid)
      .send({
        firstname: 'Anneli',
        familyname: 'Auvikainen',
        phonenumber: '0458263328',
        description: 'Olen anneli',
        lookingfor: 'Jotain töitä emt.',
        studyfield: 'joku',
        yearofstudy: 2,
        publicity: true,
        picture: 'anneli.photo',
        email: 'anneli.anneli@gmail.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done;
        }

        expect(JSON.parse(res.text).success).to.be.true;

        return done();
      });
  });

  //   it('Delete one profile', (done) => {
  //     request(app)
  //       .delete('/profiles/2')
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           return done;
  //         }

  //         expect(JSON.parse(res.text).del.affectedRows).to.be.equal(1);
  //         return done();
  //       });
  //   });

  it('Find profiles skills', (done) => {
    request(app)
      .get('/skills/profile/1')
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

  //   it('Insert new skill', (done) => {
  //     request(app)
  //       .post('/profiles/insertSkill/1/aws')
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           return done;
  //         }
  //         res;
  //         return done();
  //       });
  //   });
});
