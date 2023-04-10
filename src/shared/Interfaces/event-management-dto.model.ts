import { EventManagementCategoryMappingDto } from './event-management-category-mapping-dto.model';
import { EventManagementWeekDaysDto } from './event-management-week-days-dto.model';
import { TranslationEditDto } from "./translation-edit-dto.model";

export interface IEventManagementDto {
    id: number;
    name: string;
    detail: string;
    banner: string;
    minimumSeats: number;
    maximumSeats: number;
    refundAllowed: boolean;
    isPublished: boolean;
    displayOrder: number;
    tenantId: number;
    folderPath: string;
    startDate: Date;
    endDate: Date;
    translations: TranslationEditDto[];
    eventManagementCategoryMappings: EventManagementCategoryMappingDto[];
    eventManagementWeekDays: EventManagementWeekDaysDto[];
    }

export class EventManagementDto implements IEventManagementDto {
static fromJS(data: any): EventManagementDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventManagementDto();
    result.init(data);
    return result;
}

    id: number;
    name: string;
    detail: string;
    banner: string;
    minimumSeats: number;
    maximumSeats: number;
    refundAllowed: boolean;
    isPublished: boolean;
    displayOrder: number;
    tenantId: number;
    folderPath: string;
    startDate: Date;
    endDate: Date;
    translations: TranslationEditDto[];
    eventManagementCategoryMappings: EventManagementCategoryMappingDto[];
    eventManagementWeekDays: EventManagementWeekDaysDto[];

    constructor(data?: IEventManagementDto) {
        if (data) {
        // tslint:disable-next-line:prefer-const
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
            (<any>this)[property] = (<any>data)[property];
            }
        }
        }
        else{
            this.translations = [];
            this.eventManagementCategoryMappings = [];
            this.eventManagementWeekDays = [];
        }
    }
    init(_data?: any) {
        if (_data) {
        this.name = _data['name'];
        this.detail = _data['detail'];
        this.banner = _data['banner'];
        this.minimumSeats = _data['minimumSeats'];
        this.maximumSeats = _data['maximumSeats'];
        this.refundAllowed = _data['refundAllowed'];
        this.isPublished = _data['isPublished'];
        this.displayOrder = _data['displayOrder'];
        this.startDate = _data['startDate'];
        this.endDate = _data['endDate'];
        this.id = _data['id'];
        this.folderPath = _data['folderPath'];
        this.tenantId = _data['tenantId'];
        

        if (Array.isArray(_data['translations'])) {
            this.translations = [] as any;
            for (const item of _data['translations']) {
              this.translations.push(TranslationEditDto.fromJS(item));
            }
          }

        if (Array.isArray(_data['eventManagementCategoryMappings'])) {
        this.eventManagementCategoryMappings = [] as any;
        for (const item of _data['eventManagementCategoryMappings']) {
            this.eventManagementCategoryMappings.push(EventManagementCategoryMappingDto.fromJS(item));
            }
        }

        if (Array.isArray(_data['eventManagementWeekDays'])) {
        this.eventManagementWeekDays = [] as any;
        for (const item of _data['eventManagementWeekDays']) {
            this.eventManagementWeekDays.push(EventManagementWeekDaysDto.fromJS(item));
            }
        }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['detail'] = this.detail;
        data['banner'] = this.banner;
        data['minimumSeats'] = this.minimumSeats;
        data['maximumSeats'] = this.maximumSeats;
        data['refundAllowed'] = this.refundAllowed;
        data['isPublished'] = this.isPublished;
        data['displayOrder'] = this.displayOrder;
        data['startDate'] = this.startDate;
        data['endDate'] = this.endDate;
        data['id'] = this.id;
        data['folderPath'] = this.folderPath;
        data['tenantId'] = this.tenantId;

        if (Array.isArray(this.translations)) {
            data['translations'] = [];
            for (const item of this.translations) {
              data['translations'].push(item.toJSON());
            }
          }
        if (Array.isArray(this.eventManagementCategoryMappings)) {
            data['eventManagementCategoryMappings'] = [];
            for (const item of this.eventManagementCategoryMappings) {
            data['eventManagementCategoryMappings'].push(item.toJSON());
            }
        }
        if (Array.isArray(this.eventManagementWeekDays)) {
            data['eventManagementWeekDays'] = [];
            for (const item of this.eventManagementWeekDays) {
            data['eventManagementWeekDays'].push(item.toJSON());
            }
        }


        return data;
    }

    clone(): EventManagementDto {
        const json = this.toJSON();
        const result = new EventManagementDto();
        result.init(json);
        return result;
    }
    }

/// Paging

export interface IEventManagementPagedResultDto {
totalCount: number;
items: EventManagementDto[] | undefined;
}
export class EventManagementPagedResultDto implements IEventManagementPagedResultDto {
static fromJS(data: any): IEventManagementPagedResultDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventManagementPagedResultDto();
    result.init(data);
    return result;
}
totalCount: number;
items: EventManagementDto[] | undefined;

constructor(data?: IEventManagementPagedResultDto) {
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
        this.items.push(EventManagementDto.fromJS(item));
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

clone(): EventManagementPagedResultDto {
    const json = this.toJSON();
    const result = new EventManagementPagedResultDto();
    result.init(json);
    return result;
}
}

