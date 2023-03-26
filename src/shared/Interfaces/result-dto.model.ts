export interface IResultDto<T> {   
    items?: [T];
    totalCount: number;
    result: T;
}
