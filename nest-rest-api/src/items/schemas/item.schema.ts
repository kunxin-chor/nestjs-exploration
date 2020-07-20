import {Schema}  from 'mongoose'


export const ItemSchema = new Schema({
  name: String,
  qty: Number,
  description: String,
});