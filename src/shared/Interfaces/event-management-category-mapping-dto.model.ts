export interface IEventManagementCategoryMappingDto {
    id: number;
    categoryId: number;
    eventId: number;
    price: number;
    noOfSeats: number;
    tenantId: number;
    }

export class EventManagementCategoryMappingDto implements IEventManagementCategoryMappingDto {
static fromJS(data: any): EventManagementCategoryMappingDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventManagementCategoryMappingDto();
    result.init(data);
    return result;
}

    id: number;
    categoryId: number;
    eventId: number;
    price: number;
    noOfSeats: number;
    tenantId: number;


    constructor(data?: IEventManagementCategoryMappingDto) {
        if (data) {
        // tslint:disable-next-line:prefer-const
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
            (<any>this)[property] = (<any>data)[property];
            }
        }
        }
    }
    init(_data?: any) {
        if (_data) {
        this.categoryId = _data['categoryId'];
        this.eventId = _data['eventId'];
        this.price = _data['price'];
        this.noOfSeats = _data['noOfSeats'];
        this.tenantId = _data['tenantId'];
        this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['categoryId'] = this.categoryId;
        data['eventId'] = this.eventId;
        data['price'] = this.price;
        data['noOfSeats'] = this.noOfSeats;
        data['tenantId'] = this.tenantId;
        data['id'] = this.id;

        return data;
    }

    clone(): EventManagementCategoryMappingDto {
        const json = this.toJSON();
        const result = new EventManagementCategoryMappingDto();
        result.init(json);
        return result;
    }
    }

/// Paging

export interface IEventManagementCategoryMappingPagedResultDto {
totalCount: number;
items: EventManagementCategoryMappingDto[] | undefined;
}
export class EventManagementCategoryMappingPagedResultDto implements IEventManagementCategoryMappingPagedResultDto {
static fromJS(data: any): IEventManagementCategoryMappingPagedResultDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventManagementCategoryMappingPagedResultDto();
    result.init(data);
    return result;
}
totalCount: number;
items: EventManagementCategoryMappingDto[] | undefined;

constructor(data?: IEventManagementCategoryMappingPagedResultDto) {
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
        this.items.push(EventManagementCategoryMappingDto.fromJS(item));
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

clone(): EventManagementCategoryMappingPagedResultDto {
    const json = this.toJSON();
    const result = new EventManagementCategoryMappingPagedResultDto();
    result.init(json);
    return result;
}
}
