const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function fetchTodo() {
  try {
    let res = await docClient.scan({ TableName: "TodoTable" }).promise();
     console.log(res.Items);
    return  res.Items;
     
  } catch (err) {
    console.log(err);
  }
}
exports.handler = async (event) => {
  try {
   const records= await fetchTodo();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(records),
    };
  } catch (err) {
    console.log(err);
    return { statuscode: 500, error: err };
  }
};
