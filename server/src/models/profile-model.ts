type Profile = {
	firstname: string;
	familyname: string;
	phonenumber: string;
	description: string;
	lookingfor: string;
	studyfield: string;
	yearofstudy: number;
	publicity: boolean | number;
	accountemail: string;
	schoolname: string;
	cityname: string;
	picturelink: string;
	email: string;
} & Record<string, unknown>;

export default Profile;
