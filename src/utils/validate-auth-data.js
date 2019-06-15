export default (authData) => {
    const { email, name, password } = authData;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if the keys aren't passed, they're considered valid;
    const isNameValid = authData.hasOwnProperty('name') ? name.length < 33 : true;
    const isPasswordValid = authData.hasOwnProperty('password') ? password.length < 33 && !/\s/.test(password) : true;
    const isEmailValid = authData.hasOwnProperty('email') ? emailRegex.test(String(email).toLowerCase()) : true;
    
    const isValid = isNameValid && isPasswordValid && isEmailValid;
    const invalidityReasons = [];
    if (!isNameValid) invalidityReasons.push('Name should be at most 32 characters long');
    if (!isPasswordValid) invalidityReasons.push('Password should be at most 32 characters long and shouldn\'t contain spaces');
    if (!isEmailValid) invalidityReasons.push('Invalid Email');
    return { isValid, invalidityReasons };
};

