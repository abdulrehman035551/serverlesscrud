const AWS= require('aws-sdk')

const { v4 }=require("uuid")

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.addTodo = async (event) => {
try{

  const {todo}=JSON.parse(event.body)
  const createdAt=new Date();
  const id= v4();
  const newTodo={
    todo,
    createdAt,
    id,
    completed:false
  }
console.log("> param:",newTodo)
 const addData = await  docClient.put({
    TableName:"TodoTable",
    Item:newTodo
  }).promise();
  

console.log("> Record Added:", addData);
  return {
    statusCode: 200,
    body: JSON.stringify("added"),
  };
}catch(error){
  throw error
}
};
