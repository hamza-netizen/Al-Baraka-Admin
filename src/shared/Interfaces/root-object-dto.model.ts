import { IResultDto } from "./result-dto.model";

export interface IRootObjectDto<T> {
    
    totalCount: number;
    result: IResultDto<T>;
    resultA: T;
    targetUrl?: any;
    success: boolean;
    error?: any;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

export interface IRootObjectLoginDto<T> {    
    result: T;
    targetUrl?: any;
    success: boolean;
    error?: any;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
