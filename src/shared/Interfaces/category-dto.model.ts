import { TranslationEditDto } from '@shared/Interfaces/translation-edit-dto.model';
import { EventCategoryMappingDto } from './event-category-mapping-dto.model';

export interface ICategoryDto {
  abbreviation: string | undefined;
  isPublished: boolean;
  displayOrder: number;
  status: boolean;
  tenantId: number;
  venueId: number ;
  eventCategoryMappings: EventCategoryMappingDto[];
  translations: TranslationEditDto[];
  id: number;
}
export class CategoryDto implements ICategoryDto {
  
  abbreviation: string | undefined;
  isPublished: boolean;
  displayOrder: number;
  status: boolean;
  tenantId: number;
  venueId: number ;
  eventCategoryMappings: EventCategoryMappingDto[];
  translations: TranslationEditDto[];
  id: number;
  
  static fromJS(data: any): CategoryDto {
    data = typeof data === 'object' ? data : {};
    const result = new CategoryDto();
    result.init(data);
    return result;
  }

  constructor(data?: ICategoryDto) {
    if (data) {
      // tslint:disable-next-line:prefer-const
      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
    if (!data) {
      this.translations = [];
      this.eventCategoryMappings = [];

    }
  }
  init(_data?: any) {
    if (_data) {
      this.abbreviation = _data['abbreviation'];
      this.isPublished = _data['isPublished'];
      this.displayOrder = _data['displayOrder'];
      this.tenantId = _data['tenantId'];
      this.venueId = _data['venueId'];

      if (Array.isArray(_data['translations'])) {
        this.translations = [] as any;
        for (const item of _data['translations']) {
          this.translations.push(TranslationEditDto.fromJS(item));
        }
      }
      if (Array.isArray(_data['eventCategoryMappings'])) {
        this.eventCategoryMappings = [] as any;
        for (const item of _data['eventCategoryMappings']) {
          this.eventCategoryMappings.push(EventCategoryMappingDto.fromJS(item));
        }
      }
      this.id = _data['id'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['abbreviation'] = this.abbreviation;
    data['isPublished'] = this.isPublished;
    data['displayOrder'] = this.displayOrder;
    data['status'] = this.status;
    data['tenantId'] = this.tenantId;
    data['venueId'] = this.venueId;
 
    data['id'] = this.id;
    if (Array.isArray(this.translations)) {
      data['translations'] = [];
      for (const item of this.translations) {
        data['translations'].push(item.toJSON());
      }
    }
    if (Array.isArray(this.eventCategoryMappings)) {
        data['eventCategoryMappings'] = [];
        for (const item of this.eventCategoryMappings) {
          data['eventCategoryMappings'].push(item.toJSON());
        }
      }
    return data;
  }

  clone(): CategoryDto {
    const json = this.toJSON();
    const result = new CategoryDto();
    result.init(json);
    return result;
  }
}

/// Paging

export interface ICategoryPagedResultDto {
  totalCount: number;
  items: CategoryDto[] | undefined;
}
export class CategoryPagedResultDto implements ICategoryPagedResultDto {
  static fromJS(data: any): ICategoryPagedResultDto {
    data = typeof data === 'object' ? data : {};
    const result = new CategoryPagedResultDto();
    result.init(data);
    return result;
  }
  totalCount: number;
  items: CategoryDto[] | undefined;

  constructor(data?: ICategoryPagedResultDto) {
    if (data) {
      // tslint:disable-next-line:prefer-const
      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.totalCount = data['totalCount'];
      if (Array.isArray(data['items'])) {
        this.items = [] as any;
        for (const item of data['items']) {
          this.items.push(CategoryDto.fromJS(item));
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['totalCount'] = this.totalCount;
    if (Array.isArray(this.items)) {
      data['items'] = [];
      for (const item of this.items) {
        data['items'].push(item.toJSON());
      }
    }
    return data;
  }

  clone(): CategoryPagedResultDto {
    const json = this.toJSON();
    const result = new CategoryPagedResultDto();
    result.init(json);
    return result;
  }
}


