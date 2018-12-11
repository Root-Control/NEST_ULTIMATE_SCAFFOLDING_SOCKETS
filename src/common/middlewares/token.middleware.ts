import { Injectable, NestMiddleware, MiddlewareFunction, Inject } from '@nestjs/common';
import * as chalk from 'chalk';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { IUser } from '../../modules/users/interfaces/user.interface';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
	constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>) {}
	resolve(...args: any[]): MiddlewareFunction {
		return async (req, res, next) => {
			req.user = {};
			let parsedToken = {};
			const token = req.headers.authorization || req.headers.Authorization;
			if (token) {
				parsedToken = verify(token, SERVER_CONFIG.jwtSecret);
				req.user =  await this.userModel.findById(parsedToken['_id']).select('-local.salt -local.hashedPassword');
			}
			
			next();
		};
	}
}