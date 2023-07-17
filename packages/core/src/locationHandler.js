export default function locationHandler(lambda) {
    return async function (event, context) {
      let location, body, statusCode;
  
      try {
        // Run the Lambda
        location = await lambda(event, context);
        statusCode = 301;
      } catch (e) {
        console.error(e);
        body = { error: e.message };
        statusCode = 500;
      }

      const response = {
        statusCode: statusCode,
        body: body,
        headers: {
            Location: location
        }
    };
  
      // Return HTTP response
      return response;
    };
}