# NestJS Walkthrough

## Installing the CLI
```
npm i -g @nestjs/cli
```

Check with `nest --verison`

## Creating a new NestJS project

At the terminal, type in:
```
nest new <project-name>
```

## Create a new controller
Change into the project folder before going on!

At the terminal, type:
```
nest g controller items
```

This will create a folder named `items`, and all its associated files will be created.

## Running the project

Use the following command in the terminal:

```
npm run start:dev
```

## Add a GET endpoint to the controller
Add a method to the controller, and decorate it with `@Get()`:

```
  // The @Get() operatorassociate '/items' with the findAll() method
    @Get()
    findAll() : object {
        // JavaScript objects are automatically returned as JSON
        return {
            items:[
                {
                    id:1,
                    name:"The One Ring replica"
                }
            ]
        }
    }
```

## Add a POST endpoint to the controller
Add a method to the controller and decorate it with `@Post`

 @Post()
    create() : object {
        return {"status":"Item created OK!"}
    }

### Transfer data with Data Transfer Object (DTO)

Create a folder name `dto` inside the controller folder.

Add the file: `create-item.dto.ts` and specify its content:

```
export class CreateItemDto {
    readonly name: string;
    readonly desc: string;
    readonly qty:number
}
```