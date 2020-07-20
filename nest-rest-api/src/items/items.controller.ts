import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CreateItemDto } from "./dto/create-item.dto";

@Controller('items')
export class ItemsController {

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

    // Routes with parameters
    @Get(':id')
    findOne(@Param() param) : object {
        return {
            "id": param.id 
        }
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto) : object {
        return {"status":"Item created OK!", created: createItemDto}
    }

    @Delete()
    delete(@Param('id') id) : object {
        return {
            "status": `Object with ${id} has been deleted!`
        }
    }

    @Put()
    update(@Body() updateItemDto: CreateItemDto) : object {
        return {
            status:"Object has been updated!",
            updatedTo: updateItemDto
        }
    }

}
