import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    pasword: String,
    role:{
      type:String,
      enum:['admin','user','supervisor'],
      default:'user',
      index:true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);
const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);

schemaComposer.Query.addFields({
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userFindMany:UserTC.getResolver('findMany')
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver("createOne"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne")
});

const schema = schemaComposer.buildSchema();
export default schema;
