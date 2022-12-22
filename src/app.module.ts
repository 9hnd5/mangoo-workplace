import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContextModule } from 'mangoo-core';
import { AuthorizeGuard } from 'src/guards/authorize.guard';
import { ProjectModule } from 'src/modules/project/project.module';
import { WorkplaceModule } from 'src/modules/workplace/workplace.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    WorkplaceModule,
    ProjectModule,
    HttpModule,
    ContextModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'workplace-service',
      entities: [__dirname + '/modules/**/**.entity.{ts,js}'],
      synchronize: false,
      retryAttempts: 3,
      retryDelay: 1000,
      entitySkipConstructor: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
  ],
})
export class AppModule {}
