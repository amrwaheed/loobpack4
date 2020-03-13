import {DefaultCrudRepository} from '@loopback/repository';
import {Phones, PhonesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhonesRepository extends DefaultCrudRepository<
  Phones,
  typeof Phones.prototype._id,
  PhonesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Phones, dataSource);
  }
}
