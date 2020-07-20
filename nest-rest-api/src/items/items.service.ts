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

  findOne(id: string): Item {
    return this.items.find(item => item.id === id);
  }
}
