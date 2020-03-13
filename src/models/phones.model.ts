import {Entity, model, property} from '@loopback/repository';

@model()
export class Phones extends Entity {
  @property({
    type: 'string',
    id: true,

  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 30,
      minLength: 3,
      errorMessage:
        'name must be at least 3 characters and maximum 30 characters',
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      index: {unique: true},
      maxLength: 15,
      minLength: 11,
      errorMessage:
        'Phone must be at least 11 digits and maximum 15 digits',
    }


  })
  phoneNumber: string;



  constructor(data?: Partial<Phones>) {
    super(data);
  }
}

export interface PhonesRelations {
  // describe navigational properties here
}

export type PhonesWithRelations = Phones & PhonesRelations;
