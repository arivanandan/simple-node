import connection from '../db';

export const signupUser = (email, password) => {
    return new Promise((resolve, reject) => {
            connection.query('INSERT INTO auth (email, password) VALUES (?, ?)', [email, password], (error, data) => {
            if (error) reject(error);
            else resolve({ data });
        });
    });
}

export const getUserFromEmailPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM auth WHERE email = ? AND password = ?', [email, password], (error, data) => {
        if (error) reject(error);
        else resolve({ data: data[0] });
    });
});
}

export const signinUser = (email, token) => {
    return new Promise((resolve, reject) => {
            connection.query('INSERT INTO token (email, token) VALUES (?, ?)', [email, token], (error, data) => {
            if (error) reject(error);
            else resolve({ data });
        });
    });
}

export const getUserEmailFromToken = (token) => {
    return new Promise((resolve, reject) => {
            connection.query('SELECT email FROM token WHERE token = ?', [token], (error, data) => {
            if (error) reject(error);
            else resolve({ data: data[0] });
        });
    });
}

export const updatePassword = (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE auth SET password = ? WHERE email = ?', [password, email], (error, data) => {
            if (error) reject(error);
            else resolve({ data });
        });
    });
}