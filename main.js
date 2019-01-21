// reproduce error 'Variable "$_v1_sort" got invalid value {role: 1}; Expected type SortFindManyUserInput.'
import qs from 'querystring';
import { ApolloServer } from 'apollo-server';
import graphqlComposeGenSchema from './graphqlComposeGenSchema';
import  graphqlToolSchema  from './graphqlToolSchema';
import mongoose from 'mongoose';
//https://github.com/Automattic/mongoose/issues/6890#issuecomment-416218953
mongoose.set('useCreateIndex', true);
import { graphql } from 'graphql';
import MongoMemoryServer from 'mongodb-memory-server';
import { mergeSchemas } from 'graphql-tools';
const mongod = new MongoMemoryServer();

(async () => {
  try{
  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();
  //   console.log(uri, port, dbPath, dbName);

  mongoose
    .connect(
      uri,
      { useNewUrlParser: true },
    )
    .then(async () => {
      console.log('DB connected');
    });
  
  const mergedSchema = mergeSchemas({schemas:[graphqlComposeGenSchema, graphqlToolSchema]}, );
  const server = new ApolloServer({ schema:mergedSchema });

  const errorQueryStr = `query{
    userFindMany(sort:ROLE_ASC){
      _id
    }
  }`;
  const queryResult = await graphql(
    mergedSchema,
    errorQueryStr,
  );
  console.log('queryResult: ',queryResult);
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log('check it on graphql playground');
    console.log(`http://localhost:4000?query=${qs.escape(errorQueryStr)}`)
  }).catch(console.log)}
  catch(err){
    console.log(err);
  }
})();
