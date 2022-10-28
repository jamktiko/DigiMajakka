import {expect} from 'chai';
import {describe} from 'mocha';

import request from 'supertest';
import app from '../src/app';

describe('Joblisting controller test', () => {
	it('Return all jobs', (done) => {
		request(app)
			.get('/joblistings/findAll')
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
