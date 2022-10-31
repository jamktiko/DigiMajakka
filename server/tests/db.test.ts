import {expect} from 'chai';
import {describe} from 'mocha';
import querydb from '../src/db-connection'; // This will be your custom import

describe('Database connection test', () => {
	it('Testing connection', async () => {
		const data = await querydb('SELECT 1 + 1 AS answer;', []);

		const dataObject: Record<string, unknown> = JSON.parse(
			JSON.stringify(data)
		)[0];
		expect(dataObject).to.have.property('answer').to.equal(2);
	});
});

describe('Database crud operations', () => {
	it('SELECT query', async () => {
		const data = await querydb(
			'SELECT firstname FROM UserProfile WHERE userprofileid=1;',

			[]
		);

		// Parse data so it can be used
		const dataObject: Record<string, unknown> = JSON.parse(
			JSON.stringify(data)
		)[0];

		expect(dataObject).to.not.be.empty;
		expect(dataObject).to.have.property('firstname').to.equal('Pekka');
	});
	it('INSERT query', async () => {
		const result = await querydb(
			'INSERT INTO UserAccount VALUES ("testi@gmail.com", true, 1);',
			[]
		);
		const resultParsed = JSON.parse(JSON.stringify(result));

		expect(resultParsed).to.have.property('affectedRows').to.equal(1);
		expect(resultParsed).to.have.property('warningCount').to.equal(0);
	});
	it('DELETE query', async () => {
		const result = await querydb(
			'DELETE FROM UserAccount WHERE email = "testi@gmail.com";',
			[]
		);
		const resultParsed = JSON.parse(JSON.stringify(result));

		expect(resultParsed).to.have.property('affectedRows').to.equal(1);
		expect(resultParsed).to.have.property('warningCount').to.equal(0);
	});
});
