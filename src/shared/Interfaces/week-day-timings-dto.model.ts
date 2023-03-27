export interface IWeekDayTimingsDto {

    id: number;
    eventWeekDayId: number;
    startTime: string;
    endTime: string;
    interval: number;
    tenantId: number;
}
export class WeekDayTimingsDto implements IWeekDayTimingsDto {

    id: number;
    eventWeekDayId: number;
    startTime: string;
    endTime: string;
    interval: number;
    tenantId: number;

    static fromJS(data: any): WeekDayTimingsDto {
        data = typeof data === 'object' ? data : {};
        const result = new WeekDayTimingsDto();
        result.init(data);
        return result;
    }

    constructor(data?: IWeekDayTimingsDto) {
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
        this.eventWeekDayId = _data['eventWeekDayId'];
        this.startTime = _data['startTime'];
        this.endTime = _data['endTime'];
        this.interval = _data['interval'];
        this.id = _data['id'];
        this.tenantId = _data['tenantId'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['eventWeekDayId'] = this.eventWeekDayId;
        data['startTime'] = this.startTime;
        data['endTime'] = this.endTime;
        data['interval'] = this.interval;
        data['id'] = this.id;
        data['tenantId'] = this.tenantId;

        return data;
    }

    clone(): WeekDayTimingsDto {
        const json = this.toJSON();
        const result = new WeekDayTimingsDto();
        result.init(json);
        return result;
    }
}
    
    /// Paging
    
    export interface IEventManagementPagedResultDto {
    totalCount: number;
    items: WeekDayTimingsDto[] | undefined;
    }
    export class EventManagementPagedResultDto implements IEventManagementPagedResultDto {
    static fromJS(data: any): IEventManagementPagedResultDto {
        data = typeof data === 'object' ? data : {};
        const result = new EventManagementPagedResultDto();
        result.init(data);
        return result;
    }
    totalCount: number;
    items: WeekDayTimingsDto[] | undefined;
    
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
            this.items.push(WeekDayTimingsDto.fromJS(item));
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