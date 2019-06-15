import getToken from 'basic-auth-token';

import { getUser, putUser } from '../queries/user';
import { getUserFromEmailPassword, signupUser, signinUser } from '../queries/auth';

import validateData from '../utils/validate-auth-data';
import trimStringsInObject from '../utils/trim-strings-in-object';

export const signupAction = async (req, res) => {
    const { email, name, password } = trimStringsInObject(req.body);

    const { isValid, invalidityReasons } = validateData({ email, name, password });
    if (!isValid) return res
        .status(403).json({ error: invalidityReasons });

    try {
        const { data: maybeUser } = await getUser(email);

        // checks for existence of user
        if (maybeUser) return res
            .status(403).json({ error: `User with email ${email} already exists` });

        // add user to auth table
        await signupUser(email, password, name);

        // adds user to user table
        await putUser(email, name);

        const token = getToken(email, password)

        // also add to token table
        await signinUser(email, token);

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: `Something went wrong - ${error}` });
    }
}

export const signinAction = async (req, res) => {
    const { email, password } = trimStringsInObject(req.body);

    try {
        const { data: userData } = await getUser(email);

        if (!userData)
            return res.status(403).json({ error: 'User does not exist. Please signup!' });

        const { data: userLoggedIn } = await getUserFromEmailPassword(email, password);

        if (!userLoggedIn)
            return res.status(403).json({ error: 'Check your password!' });

        const token = getToken(email, password)

        res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: `Something went wrong - ${error}` });
    }
}