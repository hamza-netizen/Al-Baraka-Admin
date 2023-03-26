export interface IBoxOfficePaymentDto {
    id: number;
    boxOfficePaymentId: number;
    paymentMode: number;
    paymentStatus: number;
    transactionNo: string;
    referenceNo: string;
    paymentNo: string;
    udf1: string;
    udf2: string;
    udf3: string;
    udf4: string;
    udf5: string;
    tenantId: number;
}

export class BoxOfficePaymentDto implements IBoxOfficePaymentDto {
    static fromJS(data: any): BoxOfficePaymentDto {
      data = typeof data === 'object' ? data : {};
      const result = new BoxOfficePaymentDto();
      result.init(data);
      return result;
    }
  
    id: number;
    boxOfficePaymentId: number;
    paymentMode: number;
    paymentStatus: number;
    transactionNo: string;
    referenceNo: string;
    paymentNo: string;
    udf1: string;
    udf2: string;
    udf3: string;
    udf4: string;
    udf5: string;
    tenantId: number;
  
    constructor(data?: IBoxOfficePaymentDto) {
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
        this.boxOfficePaymentId = _data['boxOfficePaymentId'];
        this.paymentMode = _data['paymentMode'];
        this.paymentStatus = _data['paymentStatus'];
        this.transactionNo = _data['transactionNo'];
        this.referenceNo = _data['referenceNo'];
        this.paymentNo = _data['paymentNo'];
        this.udf1 = _data['udf1'];
        this.udf2 = _data['udf2'];
        this.udf3 = _data['udf3'];
        this.udf4 = _data['udf4'];
        this.udf5 = _data['udf5'];
        this.id = _data['id'];
      }
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data['boxOfficePaymentId'] = this.boxOfficePaymentId;
      data['paymentMode'] = this.paymentMode;
      data['paymentStatus'] = this.paymentStatus;
      data['transactionNo'] = this.transactionNo;
      data['referenceNo'] = this.referenceNo;
      data['paymentNo'] = this.paymentNo;
      data['udf1'] = this.udf1;
      data['udf2'] = this.udf2;
      data['udf3'] = this.udf3;
      data['udf4'] = this.udf4;
      data['udf5'] = this.udf5;
      data['id'] = this.id;

      return data;
    }
  
    clone(): BoxOfficePaymentDto {
      const json = this.toJSON();
      const result = new BoxOfficePaymentDto();
      result.init(json);
      return result;
    }
  }
  
  /// Paging
  
  export interface IBoxOfficePaymentPagedResultDto {
    totalCount: number;
    items: BoxOfficePaymentDto[] | undefined;
  }
  export class BoxOfficePaymentPagedResultDto implements IBoxOfficePaymentPagedResultDto {
    static fromJS(data: any): IBoxOfficePaymentPagedResultDto {
      data = typeof data === 'object' ? data : {};
      const result = new BoxOfficePaymentPagedResultDto();
      result.init(data);
      return result;
    }
    totalCount: number;
    items: BoxOfficePaymentDto[] | undefined;
  
    constructor(data?: IBoxOfficePaymentPagedResultDto) {
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
            this.items.push(BoxOfficePaymentDto.fromJS(item));
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
  
    clone(): BoxOfficePaymentPagedResultDto {
      const json = this.toJSON();
      const result = new BoxOfficePaymentPagedResultDto();
      result.init(json);
      return result;
    }
  }
