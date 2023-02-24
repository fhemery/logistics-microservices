import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PingController } from './ping/ping.controller';
import { RefModule } from '@log/ref';
import { environment } from '../environments/environment';
import { ClientsModule } from '@log/clients';
import { SupplyModule } from '@log/supply';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoUrl),
    RefModule,
    ClientsModule,
    SupplyModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController, PingController],
  providers: [AppService],
})
export class AppModule {}
