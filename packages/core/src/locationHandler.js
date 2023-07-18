export default function locationHandler(lambda) {
    return async function (event, context) {
      let location, body, statusCode;
  
      try {
        // Run the Lambda
        location = await lambda(event, context);
        statusCode = 301;
      } catch (e) {
        body = { error: e.message };
        statusCode = 500;
      }

      // update the location to redirect the page to the original url
      const response = {
        statusCode: statusCode,
        body: body.error,
        headers: {
            Location: location
        }
      };
      // Return HTTP response
      return response;
    };
}