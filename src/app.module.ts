import { Injectable, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import commonConfig from './config/common.config';
import databaseConfig from './config/database.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';


@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'playground',
      autoLoadEntities: true,
      synchronize: true
    }
  }
}

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [commonConfig, databaseConfig]
    }),
    TypeOrmModule.forRootAsync({ 
      // Use imports: [COnfigModule], useExisting: ConfigService
      useClass: TypeOrmConfigService 
    }), 
    AuthModule, UsersModule, CatsModule, PhotosModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer
          .apply(LoggerMiddleware)
          .forRoutes('cats');
  }
}
