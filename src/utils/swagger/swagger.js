import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: "Sparta intern report API - Swagger",
    description: "Description",
  },
  host: "0.0.0.0:3000",
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = "./swagger-output.json"; 
const endpointsFiles = ["../../app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);