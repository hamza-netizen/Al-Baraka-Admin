export interface IEventCategoryMappingDto {
    id: number;
    categoryId: number;
    eventId: number;
    price: number;
    noOfSeats: number;
    }

export class EventCategoryMappingDto implements IEventCategoryMappingDto {
static fromJS(data: any): EventCategoryMappingDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventCategoryMappingDto();
    result.init(data);
    return result;
}

    id: number;
    categoryId: number;
    eventId: number;
    price: number;
    noOfSeats: number;

    constructor(data?: IEventCategoryMappingDto) {
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
        this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['categoryId'] = this.categoryId;
        data['eventId'] = this.eventId;
        data['price'] = this.price;
        data['noOfSeats'] = this.noOfSeats;
        data['id'] = this.id;

        return data;
    }

    clone(): EventCategoryMappingDto {
        const json = this.toJSON();
        const result = new EventCategoryMappingDto();
        result.init(json);
        return result;
    }
    }

/// Paging

export interface IEventCategoryMappingPagedResultDto {
totalCount: number;
items: EventCategoryMappingDto[] | undefined;
}
export class EventCategoryMappingPagedResultDto implements IEventCategoryMappingPagedResultDto {
static fromJS(data: any): IEventCategoryMappingPagedResultDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventCategoryMappingPagedResultDto();
    result.init(data);
    return result;
}
totalCount: number;
items: EventCategoryMappingDto[] | undefined;

constructor(data?: IEventCategoryMappingPagedResultDto) {
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
        this.items.push(EventCategoryMappingDto.fromJS(item));
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

clone(): EventCategoryMappingPagedResultDto {
    const json = this.toJSON();
    const result = new EventCategoryMappingPagedResultDto();
    result.init(json);
    return result;
}
}
