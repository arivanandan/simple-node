import express from 'express';

import { signupAction, signinAction } from './actions/auth';
import { getProfileAction, updateProfileAction } from './actions/user';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/user/signup', signupAction);

app.post('/user/signin', signinAction);
// include header Authorization
app.get('/user/profile', getProfileAction);

app.post('/user/profile/update', updateProfileAction);

app.listen(3000);
