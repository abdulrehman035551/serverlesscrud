const AWS=require("aws-sdk")
const {v4}=require('uuid')
const docClient = new AWS.DynamoDB.DocumentClient();


async function addTodo(event){
  
  try {
  const {todo}=JSON.parse(event.body)
  const createdAt=new Date().toISOString();
  const id= v4();
  const newTodo={
    todo,
    createdAt,
    id,
    completed:false
  }
    const params = {
  
      TableName : 'TodoTable',
      Item:newTodo
       
      
    }
    
   let res= await docClient.put(params).promise();
   return res
  } catch (err) {
    console.log(err)
    return err;
  }
}

exports.handler = async (event) => {
  try {
  let addeditem=  await addTodo(event)
  console.log("hekki",addeditem)
    return {
      statusCode:200,
     
      body: JSON.stringify(addeditem),
  };
  } catch (err) {
    console.log(err)
    return {statuscode:500, error: err }
  }
};