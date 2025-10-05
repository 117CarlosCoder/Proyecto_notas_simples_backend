import { Module } from '@nestjs/common';
import { UsersModule } from './modulos/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modulos/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotasModule } from './modulos/notas/notas.module';
import { Nota } from './modulos/notas/entities/nota.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Nota],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    NotasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
