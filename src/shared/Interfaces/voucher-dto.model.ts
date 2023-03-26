export interface IVoucherDto {
    id: number;
    code: string,
    voucherType: number;
    startDate: Date;
    endDate: Date;
    eventId: number;
    isPublished: boolean;
}

export class VoucherDto implements IVoucherDto {
    static fromJS(data: any): VoucherDto {
      data = typeof data === 'object' ? data : {};
      const result = new VoucherDto();
      result.init(data);
      return result;
    }
  
    id: number;
    code: string;
    voucherType: number;
    startDate: Date;
    endDate: Date;
    eventId: number;
    isPublished: boolean;

    constructor(data?: IVoucherDto) {
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
        this.code = _data['code'];
        this.voucherType = _data['voucherType'];
        this.startDate = _data['startDate'];
        this.endDate = _data['endDate'];
        this.eventId = _data['eventId'];
        this.isPublished = _data['isPublished'];
        this.id = _data['id'];
      }
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data['code'] = this.code;
      data['voucherType'] = this.voucherType;
      data['startDate'] = this.startDate;
      data['endDate'] = this.endDate;
      data['eventId'] = this.eventId;
      data['isPublished'] = this.isPublished;
      data['id'] = this.id;

      return data;
    }
  
    clone(): VoucherDto {
      const json = this.toJSON();
      const result = new VoucherDto();
      result.init(json);
      return result;
    }
  }
  
  /// Paging
  
  export interface IVoucherPagedResultDto {
    totalCount: number;
    items: VoucherDto[] | undefined;
  }
  export class VoucherPagedResultDto implements IVoucherPagedResultDto {
    static fromJS(data: any): IVoucherPagedResultDto {
      data = typeof data === 'object' ? data : {};
      const result = new VoucherPagedResultDto();
      result.init(data);
      return result;
    }
    totalCount: number;
    items: VoucherDto[] | undefined;
  
    constructor(data?: IVoucherPagedResultDto) {
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
            this.items.push(VoucherDto.fromJS(item));
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
  
    clone(): VoucherPagedResultDto {
      const json = this.toJSON();
      const result = new VoucherPagedResultDto();
      result.init(json);
      return result;
    }
  }
