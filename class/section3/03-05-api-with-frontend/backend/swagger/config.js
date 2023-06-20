export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '뀨잉이의 API 설명서',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.Swagger.js'], // files containing annotations as above
};