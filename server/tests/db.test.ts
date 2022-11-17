import {expect} from 'chai';
import {describe} from 'mocha';
import querydb from '../src/db-connection'; // This will be your custom import

describe('Database connection test', () => {
	it('Testing connection', async () => {
		const data = await querydb('SELECT 1 + 1 AS answer;', []);
		console.log(data);

		const dataObject: Record<string, unknown> = data[0];
		console.log(dataObject);

		expect(dataObject).to.have.property('answer').to.equal(2);
	});
});

// describe('Database crud operations', () => {
// 	it('SELECT query', async () => {
// 		const data = await querydb(
// 			'SELECT firstname FROM UserProfile WHERE userprofileid=1;',

// 			[]
// 		);

// 		expect(data).to.not.be.empty;
// 		expect(data[0]).to.have.property('firstname').to.equal('Pekka');
// 	});
// 	it('INSERT query', async () => {
// 		const result = await querydb(
// 			'INSERT INTO UserAccount VALUES ("testi@gmail.com", true, "Orja opisto");',
// 			[]
// 		);
// 		const resultParsed = JSON.parse(JSON.stringify(result));

// 		expect(resultParsed).to.have.property('affectedRows').to.equal(1);
// 		expect(resultParsed).to.have.property('warningCount').to.equal(0);
// 	});
// 	it('DELETE query', async () => {
// 		const result = await querydb(
// 			'DELETE FROM UserAccount WHERE email = "testi@gmail.com";',
// 			[]
// 		);
// 		const resultParsed = JSON.parse(JSON.stringify(result));

// 		expect(resultParsed).to.have.property('affectedRows').to.equal(1);
// 		expect(resultParsed).to.have.property('warningCount').to.equal(0);
// 	});
// });
