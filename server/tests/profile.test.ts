//import {expect} from 'chai';

// import {expect} from 'chai';

import {describe} from 'mocha';
import {expect} from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Profile controller test', () => {
  let token = '';
  it('Log user in', (done) => {
    request(app)
      .post('/users/signin')
      .send({
        email: 'testaus@gmail.com',
        password: 'Testi.1234',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done;
        }

        token = JSON.parse(res.text).accessToken;

        return done();
      });
  });
  it('Return all profiles', (done) => {
    request(app)
      .get('/profiles/')
      .set('Accept', 'application/json')
      .set('Authorization', token)
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
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done;
        }

        expect(JSON.parse(res.text)).to.be.an('array').to.not.be.empty;

        return done();
      });
  });

  it('Insert profile', (done) => {
    request(app)
      .post('/profiles')
      .set('Authorization', token)
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
  // Testi ei toimi, virhe: Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.
  // Ilmeisesti testistä pitäisi palauttaa promise eikä kustua done() funktiota
  it('Update profile', async () => {
    const id = await request(app)
      .get('/profiles/user/email/')
      .set('Authorization', token);

    const result = await request(app)
      .put('/profiles/' + JSON.parse(id.text)[0].userprofileid)
      .set('Authorization', token)
      .send({
        firstname: 'Anneli',
        familyname: 'Auvikainen',
        phonenumber: '0458263328',
        aboutme: 'Olen anneli',
        lookingfor: 'Jotain töitä emt.',
        studyfield: 'joku',
        yearofstudy: 2,
        public: true,
        picturelink: 'anneli.photo',
        email: 'anneli.anneli@gmail.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(JSON.parse(result.text).success).to.be.true;

    // .end((err, res) => {
    //   if (err) {
    //     return done;
    //   }

    //   expect(JSON.parse(res.text).success).to.be.true;

    //   return done();
    // });
  });

  it('Update profile links', async () => {
    const id = await request(app)
      .get('/profiles/user/email/')
      .set('Authorization', token);

    const result = await request(app)
      .put('/links/' + JSON.parse(id.text)[0].userprofileid)
      .set('Authorization', token)
      .send({
        facebook: 'facebook.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(JSON.parse(result.text).success).to.be.true;
  });

  it('Return profiles links', async () => {
    const id = await request(app)
      .get('/profiles/user/email/')
      .set('Authorization', token);

    const result = await request(app)
      .get('/profiles/' + JSON.parse(id.text)[0].userprofileid)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(JSON.parse(result.text)).to.be.an('array').to.be.not.empty;
  });

  it('Find profiles skills', (done) => {
    request(app)
      .get('/skills/profile/1')
      .set('Authorization', token)
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

  it('Insert new skill', async () => {
    const id = await request(app)
      .get('/profiles/user/email/')
      .set('Authorization', token);

    const result = await request(app)
      .post('/skills/profile/' + JSON.parse(id.text)[0].userprofileid)
      .set('Authorization', token)
      .send({
        skills: ['aws'],
      })
      .expect(201);

    expect(JSON.parse(result.text).success).to.be.true;
  });

  // it('Save image to profile', async () => {
  //   const id = await request(app)
  //     .get('/profiles/user/email/')
  //     .set('Authorization', token);

  //   const result = await request(app)
  //     .post('/images/' + JSON.parse(id.text)[0].userprofileid)
  //     .set('Authorization', token)
  //     .attach('image', '~/response.png')
  //     .expect(200);
  //   expect(JSON.parse(result.text).success).to.be.true;
  // });
  // Testi ei toimi, virhe: Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.
  // Ilmeisesti testistä pitäisi palauttaa promise eikä kustua done() funktiota
  it('Delete one profile', async () => {
    const id = await request(app)
      .get('/profiles/user/email/')
      .set('Authorization', token);

    const result = await request(app)
      .delete('/profiles/' + JSON.parse(id.text)[0].userprofileid)
      .set('Authorization', token)
      .expect(200);

    expect(JSON.parse(result.text).success).to.be.true;
  });
});
