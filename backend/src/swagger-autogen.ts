import dotenv from 'dotenv';
import swaggerAutogen from 'swagger-autogen';

dotenv.config({ path: '/usr/src/.env'});

const domain = process.env.NODE_SWAGGER_DOMAIN;
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];
const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Dumbledore Chat API',
    description: ''
  },
  servers: [
    {
      url: domain,
      description: 'Produção'
    },
  ],
};

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);