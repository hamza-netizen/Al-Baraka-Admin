import { BoxOfficePaymentDto } from "./box-office-payment-dto.model";

export interface IBoxOfficeDto {
    id:number;
    eventId:number;
    userId:number;
    BoxOfficeId:number;
    categoryId: number;
    tenantId: number;
    seatNo: string;
    price:number;
    isScanned: boolean;
    paymentMode: number;
    eventWeekDayTimingId:number;
    boxOfficePayment: BoxOfficePaymentDto[];
    
}

export class BoxOfficeDto implements IBoxOfficeDto {
    static fromJS(data: any): BoxOfficeDto {
      data = typeof data === 'object' ? data : {};
      const result = new BoxOfficeDto();
      result.init(data);
      return result;
    }
  
    id:number;
    eventId:number;
    userId:number;
    BoxOfficeId:number;
    categoryId: number;
    tenantId: number;
    seatNo: string;
    price:number;
    isScanned: boolean;
    paymentMode: number;
    eventWeekDayTimingId:number;
    boxOfficePayment: BoxOfficePaymentDto[];
  
    constructor(data?: IBoxOfficeDto) {
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
        this.eventId = _data['eventId'];
        this.userId = _data['userId'];
        this.BoxOfficeId = _data['BoxOfficeId'];
        this.categoryId = _data['categoryId'];
        this.tenantId = _data['tenantId'];
        this.seatNo = _data['seatNo'];
        this.price = _data['price'];
        this.isScanned = _data['isScanned'];
        this.paymentMode = _data['paymentMode'];
        this.eventWeekDayTimingId = _data['eventWeekDayTimingId'];
        this.seatNo = _data['seatNo'];
  
        if (Array.isArray(_data['boxOfficePayment'])) {
          this.boxOfficePayment = [] as any;
          for (const item of _data['boxOfficePayment']) {
            this.boxOfficePayment.push(BoxOfficePaymentDto.fromJS(item));
          }
        }
  
        this.id = _data['id'];
      }
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data['eventId'] = this.eventId;
      data['userId'] = this.userId;
      data['BoxOfficeId'] = this.BoxOfficeId;
      data['categoryId'] = this.categoryId;
      data['tenantId'] = this.tenantId;
      data['seatNo'] = this.seatNo;
      data['price'] = this.price;
      data['isScanned'] = this.isScanned;
      data['paymentMode'] = this.paymentMode;
      data['eventWeekDayTimingId'] = this.eventWeekDayTimingId;
      data['id'] = this.id;
      
      if (Array.isArray(this.boxOfficePayment)) {
        data['boxOfficePayment'] = [];
        for (const item of this.boxOfficePayment) {
          data['boxOfficePayment'].push(item.toJSON());
        }
      }
     
      return data;
    }
  
    clone(): BoxOfficeDto {
      const json = this.toJSON();
      const result = new BoxOfficeDto();
      result.init(json);
      return result;
    }
  }
  
  /// Paging
  
  export interface IBoxOfficePagedResultDto {
    totalCount: number;
    items: BoxOfficeDto[] | undefined;
  }
  export class BoxOfficePagedResultDto implements IBoxOfficePagedResultDto {
    static fromJS(data: any): IBoxOfficePagedResultDto {
      data = typeof data === 'object' ? data : {};
      const result = new BoxOfficePagedResultDto();
      result.init(data);
      return result;
    }
    totalCount: number;
    items: BoxOfficeDto[] | undefined;
  
    constructor(data?: IBoxOfficePagedResultDto) {
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
            this.items.push(BoxOfficeDto.fromJS(item));
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
  
    clone(): BoxOfficePagedResultDto {
      const json = this.toJSON();
      const result = new BoxOfficePagedResultDto();
      result.init(json);
      return result;
    }
  }