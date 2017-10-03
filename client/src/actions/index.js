import * as rewards from "./rewards";
import * as student from "./student";
import * as task from "./task";
import * as user from "./user";

export const START_REQUEST = "START_REQUEST";
export const FAILURE_REQUEST = "FAILURE_REQUEST";

export const loginTeacher = () => async dispatch => {
	try {
		const response = await fetch("/sessions", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: "teacher1@teach.com", password: "foo" })
		});

		const teacher = await response.json();
		console.log("Teacher: ", teacher);
		if (!teacher.success) {
			throw new Error("Something went wrong with your request.");
		}

		const userObj = {
			id: teacher.apiData._id,
			displayName: teacher.apiData.profile.displayName
		};

		dispatch(user.setUser(userObj));
	} catch (error) {
		console.log(error);
	}
};
