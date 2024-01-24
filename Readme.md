# Nest Winston GrayLog Transport

Winston Transport for NestJs to send logs to Graylog server.

## Usage

Install npm dependencies

```
npm install --save winston winston-transport gelf-pro
```

Then add this transport in NestJs bootstrap function like this.

```
const app: NestExpressApplication = await NestFactory.create(AppModule, {
    logger: createNestWinstonLogger({
      transports: [
        GraylogTransporter.getTransporter()
      ],
    }),
  });
```
