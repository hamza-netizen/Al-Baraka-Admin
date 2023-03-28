import { TranslationEditDto } from '@shared/Interfaces/translation-edit-dto.model';
export interface IVenueDto {
    id: number;
    isPublished: boolean;
    displayOrder: number;
    tenantId: number;
    translations: TranslationEditDto[];
}

export class VenueDto implements IVenueDto {
    id: number;
    isPublished: boolean;
    displayOrder: number;
    tenantId: number;
    translations: TranslationEditDto[];

    static fromJS(data: any): VenueDto {
        data = typeof data === 'object' ? data : {};
        const result = new VenueDto();
        result.init(data);
        return result;
    }

    constructor(data?: IVenueDto) {
        if (data) {
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
            (<any>this)[property] = (<any>data)[property];
            }
        }}
        else{
            this.translations = [];
        }
    }
    init(_data?: any) {
        if (_data) {
        this.isPublished = _data['isPublished'];
        this.displayOrder = _data['displayOrder'];
        this.id = _data['id'];
        this.tenantId = _data['tenantId'];

        if (Array.isArray(_data['translations'])) {
            this.translations = [] as any;
            for (const item of _data['translations']) {
              this.translations.push(TranslationEditDto.fromJS(item));
            }
          }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data['isPublished'] = this.isPublished;
        data['displayOrder'] = this.displayOrder;
        data['id'] = this.id;
        data['tenantId'] = this.tenantId;

        if (Array.isArray(this.translations)) {
            data['translations'] = [];
            for (const item of this.translations) {
              data['translations'].push(item.toJSON());
            }
          }

          return data;
        }

    clone(): VenueDto {
        const json = this.toJSON();
        const result = new VenueDto();
        result.init(json);
        return result;
    }

}

export interface IVenuePagedResultDto {
    totalCount: number;
    items: VenueDto[] | undefined;
    }
    export class VenuePagedResultDto implements IVenuePagedResultDto {
    static fromJS(data: any): IVenuePagedResultDto {
        data = typeof data === 'object' ? data : {};
        const result = new VenuePagedResultDto();
        result.init(data);
        return result;
    }
    totalCount: number;
    items: VenueDto[] | undefined;
    
    constructor(data?: IVenuePagedResultDto) {
        if (data) {
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
                this.items.push(VenueDto.fromJS(item));
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
    
    clone(): VenuePagedResultDto {
        const json = this.toJSON();
        const result = new VenuePagedResultDto();
        result.init(json);
        return result;
    }
    }
    

    