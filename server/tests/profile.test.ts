//import {expect} from 'chai';

// import {expect} from 'chai';
import {describe} from 'mocha';
import {expect} from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Profile controller test', () => {
	it('Return all profiles', (done) => {
		request(app)
			.get('/profiles/findAll')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});
	it('Return one profile', (done) => {
		request(app)
			.get('/profiles/findById/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});
	it('Insert profile', (done) => {
		request(app)
			.post('/profiles/create')
			.send({
				idprofile: 2,
				firstname: 'Anneli',
				surname: 'Auvikainen',
				phone: '050-234-2343',
				description: 'Olen anneli',
				whatlookingfor: 'Jotain töitä emt.',
				fieldOfStudy: 'joku',
				studyYear: 2,
				publicity: true,
				email: 'anneli@gmail.com',
				idschool: 1,
				idcity: 1,
				picture: 'anneli.photo',
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				if (err) {
					return done;
				}

				expect(JSON.parse(res.text).profile.affectedRows).to.be.equal(
					1
				);
				expect(JSON.parse(res.text).profile.insertId).to.be.equal(2);
				return done();
			});
	});
	it('Delete one profile', (done) => {
		request(app)
			.delete('/profiles/deleteOne/2')
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done;
				}

				expect(JSON.parse(res.text).del.affectedRows).to.be.equal(1);
				return done();
			});
	});

	it('Find profiles skills', (done) => {
		request(app)
			.get('/profiles/skills/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('Insert new skill', (done) => {
		request(app)
			.post('/profiles/insertSkill/1/aws')
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done;
				}
				res;
				return done();
			});
	});
});
