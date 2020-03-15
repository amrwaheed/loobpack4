import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Phones} from '../models';
import {PhonesRepository} from '../repositories';

export class PhoneNumberController {
  constructor(
    @repository(PhonesRepository) public phonesRepository: PhonesRepository,
  ) {}

  @post('/phones', {

    responses: {
      '200': {
        description: 'Phones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Phones)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phones, {
            title: 'NewPhones',
            
          }),
        },
      },
    })
    phones: Omit<Phones, 'id'>,
  ): Promise<Phones | object> {
  
   const phoneExists = await this.phonesRepository.findOne({where:{phoneNumber:phones.phoneNumber}})
   if(phoneExists){
 
    return {
      code:402,
      error:"phone exists"
    }
   }
    return this.phonesRepository.create(phones);
  }

  @get('/phones/count', {
    responses: {
      '200': {
        description: 'Phones model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Phones) where?: Where<Phones>,
  ): Promise<Count> {
    return this.phonesRepository.count(where);
  }

  @get('/phones', {
    responses: {
      '200': {
        description: 'Array of Phones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Phones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Phones) filter?: Filter<Phones>,
  ): Promise<Phones[]> {

    return this.phonesRepository.find(filter);
  }



  @get('/phones/{id}', {
    responses: {
      '200': {
        description: 'Phones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Phones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Phones, {exclude: 'where'}) filter?: FilterExcludingWhere<Phones>
  ): Promise<Phones> {
    return this.phonesRepository.findById(id, filter);
  }

  @put('/phones/{id}', {
    responses: {
      '204': {
        description: 'Phones PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() phones: Phones,
  ): Promise<void> {
    await this.phonesRepository.replaceById(id, phones);
  }

  @del('/phones/{id}', {
    responses: {
      '204': {
        description: 'Phones DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.phonesRepository.deleteById(id);
  }
}
