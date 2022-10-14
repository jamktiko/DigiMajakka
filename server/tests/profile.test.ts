//import {expect} from 'chai';

// import {expect} from 'chai';
import {describe} from 'mocha';
import request from 'supertest';
import app from '../app';

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
				phone: '050-2342343',
				description: 'Olen anneli',
				whatlookingfor: 'Jotain töitä emt.',
				fieldOfStudy: 'En oo ihan varma',
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
			.end(done);
	});
});
