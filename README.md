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

## Services

Those are the **middle-man** between the controllers and the database.

Generate a service with:
```
nest g service items
```

The service has the ```@Injectable``` decorator. It just means the controller will automatically have
access to an instance of the service without needing us to create it.

### Filling in the service
Services help us to hide away the implementation details of accessing the database.

Below is an example of a service:

```
import { Injectable } from '@nestjs/common';
import Item from './interfaces/item.interface';
@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '12345A',
      name: 'ACME Anvils',
      qty: 100,
      description: "For dropping on roadrunner's heads",
    },
    {
      id: '4242B',
      name: 'ACME Hammers',
      qty: 100,
      description: "For any problems resemblancing a nail",
    },
  ];

  findAll(): Item[] {
      return this.items;
  }
}
```

### Using the service
To use the service, we will rely on Dependency Injection so that the
controller will have an instance of the service.

Add the a constructor to the `ItemsController` class like so:

```
export class ItemsController {

    constructor(private readonly itemsService:ItemsService) {

    }
```

In the constructor, we define that we need an arugment of the type `ItemsService`.
Nest will automatically create pass an instance of the specified type
to the constructor and store it inside the `ItemsController` so that we
can access it later using `this.itemsService`



## Modules
A module allows us to organise things into a neat package. It allows other
controllers to access the controllers and services.

### Create the module file
A module file defines the components of a module.

Create a file named `items.module.ts` in the `items` directory, and type in:

```
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemModule {}
```

### Using the module file
The "main module" is `app.module.ts`, inside the `src` folder. 

Import in the `ItemModule` and add it into the `imports` array. We can 
remove the references to the `ItemsController` and `ItemsServices` since
they will be available via `ItemModule` now.

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './items/items.module';

@Module({
  imports: [MongooseModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


## Using Mongoose
We can use Mongo and Mongoose to create the models for our database.


### Installation
First we need to install Mongo and Mongoose to our nodejs app.

```
npm install --save @nestjs/mongoose mongoose
npm install --save-dev @types/mongoose
```

Second, we need to register the module. Let's go to `app.module.ts` and
add in the Mongoose module.

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {}
```

Notice that we add the `MongooseModule` in the the `imports` array
and that we have to import in the `MongooseModule`.

### Storing private data in config
We created a `config` folder where we store the URI to our Mongo. Later we
will see how to use setting files to secure our mongo password away.

Inside the `config` folder, create a `keys.ts` file. Add in the following code:

```
export default {
    mongoRootURL:"mongodb+srv://root:rotiprata123@cluster0-rra3w.mongodb.net/?retryWrites=true&w=majority"
}
```

And now in `app.module.ts`, we can import in our `config` object:

```
export default {
    mongoRootURL:"mongodb+srv://root:rotiprata123@cluster0-rra3w.mongodb.net/?retryWrites=true&w=majority"
}
```

### Schema
Mongoose uses a `schema` as a blueprint for each document in a Mongo collection.
This ensures that our documents are consistent.

1. In the `src` folder, let's create a `schemas` folder.

2. Create a file named `item.schema.ts` in the `schemas` folder.

3. Enter the following code inside the file to create the ItemSchema:

```
import * as mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
    "name": String,
    "qty": Number,
    "description": String,
    
})
```

4. In the Items Module (`items.module.ts`), we have to import in Mongoose and the Item Schema,
so that we can associate the schema with the service.

Your updated `items.module.ts` file should look like this:
```
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule} from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';

@Module({
  imports: [MongooseModule.forFeature([
      {
          'name': 'Item',
          schema: ItemSchema
      }
  ])
],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemModule {}
```

5. Update the `Item` interface to extend from `mongoose.Document`

```
import { Document} from "mongoose"


export default interface Item extends Document {
    id?: string;
    name: string;
    description? : string;
    qty: number;
}
```

6. Associate the Item model in the service, and update all the services to use Mongoose:

```
import { Injectable } from '@nestjs/common';
import Item from './interfaces/item.interface';
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
@Injectable()
export class ItemsService {
 
constructor(@InjectModel('Item') private readonly itemModel : Model<Item>) {}

  async findAll(): Promise<Item[]> {
     return await this.itemModel.find()
  }

  async findOne(id: string): Promise<Item> {
     return await this.itemModel.findOne({
         _id: id
     })
  }
}
```

7. Update the `items.controller.ts` -- specifically the `findAll` and `findOne`
methods so that they return promises:

```
   // The @Get() operatorassociate '/items' with the findAll() method
    @Get()
    async findAll() : Promise<Item[]> {
        // JavaScript objects are automatically returned as JSON
        return this.itemsService.findAll();
    }

    // Routes with parameters
    @Get(':id')
    async findOne(@Param() param) : Promise<Item> {
        return this.itemsService.findOne(param.id);
    }
```