import { Table } from "sst/constructs";

export function StorageStack({ stack, app }) {
  // Create the DynamoDB table
  const table = new Table(stack, "Urls", {
    fields: {
      urlId: "string",
      originalUrl: "string",
      createdAt: "number"
    },
    primaryIndex: { partitionKey: "urlId" },
  });

  return {
    table,
  };
}