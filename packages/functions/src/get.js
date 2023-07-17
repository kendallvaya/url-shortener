import locationHandler from "@url-shortener/core/locationHandler";
import dynamoDb from "@url-shortener/core/dynamodb";
import { Table } from "sst/node/table";

export const main = locationHandler(async (event) => {
    const params = {
    TableName: Table.Urls.tableName,
        Key: {
            urlId: event.pathParameters.id, // The id of the shortened url from the path
        },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("There is no related url for this short url");
    }

    return result.Item.originalUrl;
});