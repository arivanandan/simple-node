import { getUserEmailFromToken, updatePassword } from '../queries/auth';
import { getUser, updateUsername } from '../queries/user';

import validateData from '../utils/validate-auth-data';

// include header Authorization
export const getProfileAction = async (req, res) => {
    const authToken = req.header('Authorization');
    try {
        const { data: { email } } = await getUserEmailFromToken(authToken);

        if (!email) res.status(403).json({ error: 'Your token is invalid. Please sign in again.' });

        const { data } = await getUser(email);

        return res.status(200).json({ data });
    } catch(error) {
        return res.status(500).json({ error: `Something went wrong - ${error}` });
    }
}

export const updateProfileAction = async (req, res) => {
    const { name, password } = req.body;
    const authToken = req.header('Authorization');

    const { isValid, invalidityReasons } = validateData({ name, password });

    if (!isValid) res.status(403).json({ error: invalidityReasons });

    try {
        const { data: { email } } = await getUserEmailFromToken(authToken);

        if (!email) res.status(403).json({ error: 'Your token is invalid. Please sign in again.' });

        await updateUsername(email, name);
        await updatePassword(email, password);

        return res.status(200).json({ data: 'Profile data updated!' });
    } catch(error) {
        return res.status(500).json({ error: `Something went wrong - ${error}` });
    }
}