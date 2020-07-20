import { Injectable } from '@nestjs/common';
import { ItemModel } from './schemas/item.schema';
import  Item  from './interfaces/item.interface';
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import { CreateItemDto } from './dto/create-item.dto';
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
