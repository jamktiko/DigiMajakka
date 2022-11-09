type User = {
	email: string;
	admin: boolean;
	schoolid: number;
};

// Const userFactor = ({email = '', admin = false, schoolid = -1} = {}) => ({
// 	email,
// 	admin,
// 	schoolid,
// });

// const userTypeChecker = (user: User) => {
// 	if (
// 		typeof user.email !== 'string' ||
// 		typeof user.admin !== 'boolean' ||
// 		typeof user.schoolid !== 'number'
// 	) {
// 		console.log('Object shows value true for key thats value is not valid');

// 		console.log({
// 			email: typeof user.email !== 'string',
// 			admin: typeof user.admin !== 'boolean',
// 			schoolid: typeof user.schoolid !== 'number',
// 		});

// 		return false;
// 	}

// 	return true;
// };

export default User;
