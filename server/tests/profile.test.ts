//import {expect} from 'chai';

// import {expect} from 'chai';

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

        expect(JSON.parse(res.text)).to.be.an('array').to.not.be.empty;

        return done();
      });
  });

  it('Insert profile', (done) => {
    request(app)
      .post('/profiles')
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
        console.log(res.text);

        expect(JSON.parse(res.text).success).to.be.true;
        return done();
      });
  });
  // Testi ei toimi, virhe: Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.
  // Ilmeisesti testistä pitäisi palauttaa promise eikä kustua done() funktiota
  it('Update profile', async () => {
    const id = await request(app)
      .post('/profiles/email/')
      .send({email: 'testaus@gmail.com'});

    await request(app)
      .put('/profiles/' + JSON.parse(id.text)[0].userprofileid)
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
      .post('/profiles/email/')
      .send({email: 'testaus@gmail.com'});

    await request(app)
      .put('/links/' + JSON.parse(id.text)[0].userprofileid)
      .send({
        facebook: 'facebook.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Return profiles links', async () => {
    const id = await request(app)
      .post('/profiles/email/')
      .send({email: 'testaus@gmail.com'});

    await request(app)
      .get('/profiles/' + JSON.parse(id.text)[0].userprofileid)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

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

  it('Insert new skill', async () => {
    const id = await request(app)
      .post('/profiles/email/')
      .send({email: 'testaus@gmail.com'});

    await request(app)
      .post('/skills/profile/' + JSON.parse(id.text)[0].userprofileid)
      .send({
        skills: ['aws'],
      })
      .expect(201);
  });
  // Testi ei toimi, virhe: Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.
  // Ilmeisesti testistä pitäisi palauttaa promise eikä kustua done() funktiota
  it('Delete one profile', async () => {
    const id = await request(app)
      .post('/profiles/email/')
      .send({email: 'testaus@gmail.com'});

    await request(app)
      .delete('/profiles/' + JSON.parse(id.text)[0].userprofileid)
      .expect(200);
  });
});
