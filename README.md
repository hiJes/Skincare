# e-commerce-skincare

npx sequelize model:generate --name User --attributes userName:string,email:string,password:string,role:boolean

npx sequelize model:generate --name ProfileUser --attributes name:string,gender:string,addres:string,dateOfBirth:date,telephone:string,profilePicture:string

npx sequelize migration:create --name add-fk-to-profileuser

npx sequelize model:generate --name Category --attributes name:string

npx sequelize model:generate --name User --attributes userName:string,email:string,password:string,role:boolean

20230803030855-create-transaction.js
20230803031213-create-product.js
20230803032024-create-transaction-product.js
20230803032423-create-user.js
20230803032513-create-profile-user.js
20230803032553-add-fk-to-profileuser.js
20230803033413-create-category.js

20230803030855-create-user.js
20230803031213-create-category.js
20230803032024-create-profile-user.js
20230803032423-create-add-fk-to-profileuser.js
20230803032513-create-transaction.js
20230803032553-create-product.js
20230803033413-create-transaction-product.js
