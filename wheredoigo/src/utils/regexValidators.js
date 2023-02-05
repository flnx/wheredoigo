export const regex = {
    email: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,255}$/,
    username: /^[a-zA-Z0-9_-]{3,25}$/,
};

export const email = (email) => {
    return regex.email.test(email);
}

// Minimum eight characters, at least one letter and one number:
export const password = (password) => {
    return regex.password.test(password);
}

export const username = (username) => {
    return regex.username.test(username);
}

