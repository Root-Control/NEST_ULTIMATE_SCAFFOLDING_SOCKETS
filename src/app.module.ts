// nest
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TokenMiddleware } from './common/middlewares/token.middleware';
/* Events module */
import { EventsModule } from './modules/events/events.module';
/* Events module */

import { AppGateway } from './app.gateway';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    EventsModule
  ],
  providers: [AppGateway],
  controllers: []
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, TokenMiddleware)
      .forRoutes('*');
  }
}