export interface IApiError {
  keyword: string;
  dataPath: string;
  schemaPath: string;
  // One day this could be a generic
  params: any;
  message: string;
}

export interface IApiErrorPayload {
  id: string;
  status: string;
  title: string;
  detail: string;
  meta: {
    errors: IApiError[];
    stack: string;
  };
}
export interface IApiErrorResponse {
  errors: IApiErrorPayload[];
}

// Example
// {
//   "errors": [
//     {
//       "id": "8060d814-308f-4e53-a17c-3d56367327eb",
//       "status": "400",
//       "title": "Bad Request",
//       "meta": {
//         "errors": [
//           {
//             "keyword": "minLength",
//             "dataPath": ".data.attributes.termsAndConditions",
//             "schemaPath": "#/properties/data/properties/attributes/properties/termsAndConditions/minLength",
//             "params": {
//               "limit": 1
//             },
//             "message": "should NOT be shorter than 1 characters"
//           }
//         ],
//         "stack": "Error: Request validation failed\n    at _callee$ (/var/task/dist/utils/schemaValidator/index.js:96:23)\n    at tryCatch (/var/task/node_modules/regenerator-runtime/runtime.js:45:40)\n    at Generator.invoke [as _invoke] (/var/task/node_modules/regenerator-runtime/runtime.js:271:22)\n    at Generator.prototype.(anonymous function) [as next] (/var/task/node_modules/regenerator-runtime/runtime.js:97:21)\n    at asyncGeneratorStep (/var/task/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)\n    at _next (/var/task/node_modules/@babel/runtime/helpers/asyncToGenerator.js:25:9)\n    at /var/task/node_modules/@babel/runtime/helpers/asyncToGenerator.js:32:7\n    at Promise._execute (/var/task/node_modules/bluebird/js/release/debuggability.js:384:9)\n    at Promise._resolveFromExecutor (/var/task/node_modules/bluebird/js/release/promise.js:518:18)\n    at new Promise (/var/task/node_modules/bluebird/js/release/promise.js:103:10)\n    at /var/task/node_modules/@babel/runtime/helpers/asyncToGenerator.js:21:12\n    at /var/task/dist/utils/schemaValidator/index.js:117:21\n    at Layer.handle [as handle_request] (/var/task/node_modules/express/lib/router/layer.js:95:5)\n    at next (/var/task/node_modules/express/lib/router/route.js:137:13)\n    at /var/task/dist/services/authentication/middleware.js:49:14\n    at Layer.handle [as handle_request] (/var/task/node_modules/express/lib/router/layer.js:95:5)\n    at next (/var/task/node_modules/express/lib/router/route.js:137:13)\n    at Route.dispatch (/var/task/node_modules/express/lib/router/route.js:112:3)\n    at Route.r.dispatch (/var/task/serverless_sdk/index.js:16:17742)\n    at Layer.handle [as handle_request] (/var/task/node_modules/express/lib/router/layer.js:95:5)\n    at /var/task/node_modules/express/lib/router/index.js:281:22\n    at param (/var/task/node_modules/express/lib/router/index.js:354:14)"
//       },
//       "detail": "Request validation failed"
//     }
//   ]
// }
