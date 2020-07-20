import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CreateItemDto } from "./dto/create-item.dto";
import { ItemsService } from './items.service';
import Item from './interfaces/item.interface';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService:ItemsService) {

    }

    // The @Get() operatorassociate '/items' with the findAll() method
    @Get()
    findAll() : Item[] {
        // JavaScript objects are automatically returned as JSON
        return this.itemsService.findAll();
    }

    // Routes with parameters
    @Get(':id')
    findOne(@Param() param) : Item {
        return this.itemsService.findOne(param.id);
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
