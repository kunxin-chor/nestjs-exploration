import {Document}  from 'mongoose'
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateItemDto } from "../dto/create-item.dto";
import Item from "../interfaces/item.interface";

export class ItemModel extends Document implements Item {
    name: string;
    description?: string;
    qty: number;
    

}

export const ItemSchema = SchemaFactory.createForClass(ItemModel);
