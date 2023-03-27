import { WeekDayTimingsDto } from "./week-day-timings-dto.model";

export interface IEventManagementWeekDaysDto {
    id: number;
    eventWeekDayId: number;
    eventId: number;
    tenantId: number;
    weekDayTimings: WeekDayTimingsDto[];
    }

export class EventManagementWeekDaysDto implements IEventManagementWeekDaysDto {
static fromJS(data: any): EventManagementWeekDaysDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventManagementWeekDaysDto();
    result.init(data);
    return result;
}

    id: number;
    eventWeekDayId: number;
    eventId: number;
    tenantId: number;
    weekDayTimings: WeekDayTimingsDto[];


    constructor(data?: IEventManagementWeekDaysDto) {
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
        this.eventId = _data['eventId'];
        this.id = _data['id'];
        this.tenantId = _data['tenantId'];

        if (Array.isArray(_data['weekDayTimings'])) {
            this.weekDayTimings = [] as any;
            for (const item of _data['weekDayTimings']) {
              this.weekDayTimings.push(WeekDayTimingsDto.fromJS(item));
            }
          }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['eventWeekDayId'] = this.eventWeekDayId;
        data['eventId'] = this.eventId;
        data['id'] = this.id;
        data['tenantId'] = this.tenantId;
        if (Array.isArray(this.weekDayTimings)) {
            data['weekDayTimings'] = [];
            for (const item of this.weekDayTimings) {
              data['weekDayTimings'].push(item.toJSON());
            }
          }

        return data;
    }

    clone(): EventManagementWeekDaysDto {
        const json = this.toJSON();
        const result = new EventManagementWeekDaysDto();
        result.init(json);
        return result;
    }
    }

/// Paging

export interface IEventManagementWeekDaysPagedResultDto {
totalCount: number;
items: EventManagementWeekDaysDto[] | undefined;
}
export class EventManagementWeekDaysPagedResultDto implements IEventManagementWeekDaysPagedResultDto {
static fromJS(data: any): IEventManagementWeekDaysPagedResultDto {
    data = typeof data === 'object' ? data : {};
    const result = new EventManagementWeekDaysPagedResultDto();
    result.init(data);
    return result;
}
totalCount: number;
items: EventManagementWeekDaysDto[] | undefined;

constructor(data?: IEventManagementWeekDaysPagedResultDto) {
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
        this.items.push(EventManagementWeekDaysDto.fromJS(item));
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

clone(): EventManagementWeekDaysPagedResultDto {
    const json = this.toJSON();
    const result = new EventManagementWeekDaysPagedResultDto();
    result.init(json);
    return result;
}
}
