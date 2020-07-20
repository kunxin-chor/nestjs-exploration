import { Injectable } from '@nestjs/common';
import  Item  from './interfaces/item.interface';
import { Model, Document } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import { CreateItemDto } from './dto/create-item.dto';

// for Mongoose models to work with interface
interface ItemModel extends Document, Item {};

@Injectable()
export class ItemsService {
 
constructor(@InjectModel('Item') private readonly itemModel : Model<ItemModel>) {}

  async findAll(): Promise<Item[]> {
     return await this.itemModel.find()
  }

  async findOne(id: string): Promise<Item> {
     return await this.itemModel.findOne({
         _id: id
     })
  }

  async create(dto: CreateItemDto) : Promise<Item> {
      let newDocument = new this.itemModel(dto);
      const newItem = new this.itemModel(newDocument);
      return await newItem.save();
  } 
}
