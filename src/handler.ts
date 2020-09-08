import { APIGatewayProxyResult,APIGatewayProxyEvent,Callback,Context } from 'aws-lambda';
import {ApolloServer} from 'apollo-server-lambda';
import 'reflect-metadata'
import * as TypeGraphQL from 'type-graphql';
import resolvers from './resolvers';


const createHandler = async() =>{
  (global as any).schema = (global as any).schema || (await TypeGraphQL.
    buildSchema({
    resolvers,
    validate: true,
  }));
  const schema = (global as any).schema;
  

  const server = new ApolloServer({
    schema,
    playground:true
  })

  return server.createHandler({cors:{origin:'*',credentials:true}});
}

exports.graphql = (event:APIGatewayProxyEvent,context:Context,callback:Callback<APIGatewayProxyResult>) =>{
  createHandler().then((handler:any) =>{
    context.callbackWaitsForEmptyEventLoop = false;
    return handler(event,context,callback);
  })
}
