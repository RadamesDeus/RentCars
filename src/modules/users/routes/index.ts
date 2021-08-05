import { Router } from 'express';

import passwordroutes from './password.routes';
import profileroutes from './profile.routes';
import sessionsroutes from './sessions.routes';
import usersroutes from './users.routes';

const routes = Router();

routes.use(usersroutes);
routes.use(profileroutes);
routes.use(sessionsroutes);
routes.use(passwordroutes);

export default routes;
