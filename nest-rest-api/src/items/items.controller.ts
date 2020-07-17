import { Controller, Get, Post, Body } from '@nestjs/common';
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

    @Post()
    create(@Body() createItemDto: CreateItemDto) : object {
        return {"status":"Item created OK!", created: createItemDto}
    }

}
