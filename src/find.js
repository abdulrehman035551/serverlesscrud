const AWS=require('aws-sdk')
const dynamodb=new AWS.DynamoDB.DocumentClient()

async function find(event)
{
   
    try{
        const {id}=event.pathParameters
        let res= await dynamodb.get(
            {
                TableName: "TodoTable",
                Key: {
                    id
                }
            }
        ).promise()
       return res
    }catch(err){
        throw err
    }
}
exports.handler=async(event)=>
{
    try{
       let mydata= await find(event)
        return {
            statusCode:200,
            body: JSON.stringify( mydata),
        }

    }catch(err){
        console.log({
            statusCode:500,
            err
        })

    }
}