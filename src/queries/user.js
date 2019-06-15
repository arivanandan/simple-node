import connection from '../db';

export const getUser = (email) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email = ?', [email], (error, data) => {
            if (error) reject(error);
            else resolve({ data: data[0] });
        });
    });
}

export const putUser = (email, name) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO user (email, name) VALUES (?, ?)', [email, name], (error, data) => {
            if (error) reject(error);
            else resolve({ data });
        });
    });
}

export const updateUsername = (email, name) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE user SET name = ? WHERE email = ?', [name, email], (error, data) => {
            if (error) reject(error);
            else resolve({ data });
        });
    });
}