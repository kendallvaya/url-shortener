import handler from "@url-shortener/core/handler";
import dynamoDb from "@url-shortener/core/dynamodb";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Urls.tableName,
        Key: {
            urlId: event.pathParameters.id, // The id of the shortened url from the path
        },
    };
    await dynamoDb.delete(params);
    return {status: true};
});