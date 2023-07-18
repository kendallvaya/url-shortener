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

    // we can remove this validation to improve performance
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("The resource you are trying to delete does not exist in the DB");
    }

    await dynamoDb.delete(params);

    return {status: true};
});