import handler from "@url-shortener/core/handler";
import dynamoDb from "@url-shortener/core/dynamodb";
import { Table } from "sst/node/table";

const URL = require("url").URL;

export const main = handler(async (event) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    // check if the provided url is valid
    if(!checkIfUrlIsValid(data.originalUrl)) {
        throw new Error("Provided URL is not valid");
    }

    const urlId = await getUniqueShortUrl(data.originalUrl);

    const params = {
        TableName: Table.Urls.tableName,
        Item: {
            // The attributes of the item to be created
            urlId: urlId, // The of the shortened url
            originalUrl: data.originalUrl, // the original url
            createdAt: Date.now(), // Current Unix timestamp
        },
    };
  
    await dynamoDb.put(params);
    
    return params.Item;
  
});

/**
 * create a random string as the id for the shortened url
 * @param {*} originalUrl 
 * @returns 
 */
function createShortUrl(originalUrl) {
    let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shorturl = [];
    let charsInShortUrl = 7;

    for (let i = 0; i < charsInShortUrl; i++) {
        let randomIndex = Math.floor(Math.random() * 62);
        shorturl.push(charMap[randomIndex]);
    }
    return shorturl.join("");
}

/**
 * make sure the created random string does not exist as an id in the DB
 * @param {*} originalUrl 
 * @returns 
 */
async function getUniqueShortUrl(originalUrl) {
    console.log("getting unirque url");
    let urlIdIsUnique = false;
    let uniqueShortUrl;

    let params = {
        TableName: Table.Urls.tableName,
        Key: {
            urlId: uniqueShortUrl,
        }
    };

    while(!urlIdIsUnique) {
        uniqueShortUrl = createShortUrl(originalUrl);
        params.Key.urlId = uniqueShortUrl;
        let result = await dynamoDb.get(params);
        if (!result.Item) {
            urlIdIsUnique = true;
        }
    }

    return uniqueShortUrl;
}

/**
 * Check if the provided url is valid before creating a shortened url
 * @param {*} url 
 * @returns 
 */
function checkIfUrlIsValid(url) {
    try {
        new URL(url);
        return true;
      } catch (err) {
        return false;
      }
}