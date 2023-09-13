import { SwaggerRouter } from "koa-swagger-decorator";

const protectedRouter = new SwaggerRouter();

// USER ROUTES


// Swagger endpoint
protectedRouter.swagger({
    title: "node-typescript-koa-rest",
    description: "API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.",
    version: "1.8.0"
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { protectedRouter };
