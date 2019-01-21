## Error reproduce repo

refer to this [issue](https://github.com/graphql-compose/graphql-compose-mongoose/issues/147#issuecomment-455115861)

when using `mergeSchemas` from `graphql-tools` with `graphql-tools` defined schema and `graphql-compose-mongoose` generated schema, there will get `Variable "$_v1_sort" got invalid value {role: 1}; Expected type SortFindManyUserInput.',` on enum field.

## start

`git clone https://github.com/JaosnHsieh/graphql-compose-mongoose-enum-issue-reproduce.git`

`npm i`

`npm run start`