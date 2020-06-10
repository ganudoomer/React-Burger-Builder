export const updateObject = (oldState, updatedState) => {
	return {
		...oldState,
		...updatedState
	};
};
export const checkVaild = (value, rules) => {
	if (!rules) {
		return true;
	}
	let isVaild = true;
	if (rules.required) {
		isVaild = value.trim() !== '' && isVaild;
	}
	if (rules.minLength) {
		isVaild = value.length >= rules.minLength && isVaild;
	}
	if (rules.maxLength) {
		isVaild = value.length <= rules.maxLength && isVaild;
	}
	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isVaild = pattern.test(value) && isVaild;
	}

	return isVaild;
};
