export const userDefaultState = {
	signedIn: false,
	email: null,
	authorId: null,
}

const userReducer = (state, action) => {
	switch (action.type) {
	case "SIGN_IN": {
		// console.log(action.payload)
		return {
			...state,
			signedIn: true,
			authorId: action.payload.authorId,
		}
	}
	case "SIGN_OUT": {
		return {
			...state,
			signedIn: false,
			authorId: null
		}
	}
	default: {
		throw new Error("No matching type.")
	}
	}
}
export default userReducer
