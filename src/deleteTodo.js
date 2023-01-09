const AWS=require("aws-sdk")
const dynamodb=new AWS.DynamoDB.DocumentClient()

const deleteTodo=async(event)=>
{
    try{
         
        const {id}=event.pathParameters
        await dynamodb.delete({
            TableName:"TodoTable",
            Key:{
                id
            },
          
        }).promise()
    }catch(err){
        throw err
    }
}

exports.handler=async(event)=>
{
    try{
        await deleteTodo(event)
        return {
            statusCode:200,
           
            body: JSON.stringify("item deleted"),
        };
    }catch(err)
    {
        return {statusCode:500,
            error: err
        }
    }
}
