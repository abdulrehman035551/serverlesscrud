const AWS=require("aws-sdk")
const dynamodb=new AWS.DynamoDB.DocumentClient()

const updateTodo=async(event)=>
{
    try{
         
        const { completed }=JSON.parse(event.body)
        const { id }=event.pathParameters
      let updatedata=  await dynamodb.update({
            TableName:"TodoTable",
            Key:{
                id
            },
            UpdateExpression:' set completed = :completed',
            ExpressionAttributeValues: {
                ':completed': completed
            },
            ReturnValues:"ALL_NEW"
        }).promise()
    }catch(err){
        throw err
    }
   
}

exports.handler=async(event)=>
{
    try{
        await updateTodo(event)
        return {
            statusCode:200,
           
            body: JSON.stringify("updated"),
        };
    }catch(err)
    {
        return {statusCode:500,
            error: err
        }
    }
}
