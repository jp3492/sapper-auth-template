import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as sapper from '@sapper/server';

import authenticationMiddleware from './middlewares/authentication';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		cookieParser(),
		bodyParser.json(),
		authenticationMiddleware,
		sapper.middleware({
			session: (req, res) => ({
				user: req.user
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
