/* eslint-disable @typescript-eslint/ban-types */
type Jobadvert = {
	advertid: string;
	firstname: string;
	familyname: string;
	company?: string | null;
	startdate?: string | null;
	email: string;
	phonenumber: string;
	jobtitle: string;
	description: string;
	salary: string;
	validuntil: string;
	isvalid: boolean;
	accepted: boolean;
	city: string;
};

export default Jobadvert;
