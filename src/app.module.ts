import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Customer } from './customers/customer.entity';
import { CustomerModule } from './customers/customer.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'logiflow_hmg',
      entities: [Customer],
      synchronize: true,
    }),
    CustomerModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }, {
    provide: APP_INTERCEPTOR ,
     useClass: ZodSerializerInterceptor
  }],
})
export class AppModule { }
