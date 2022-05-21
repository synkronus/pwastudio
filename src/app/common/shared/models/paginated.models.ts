export class PagingParams {
    pageNumber: number = 1;
    pageSize: number = 10000;
}

export interface IPaginatedModel<T> {
    items?: T[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export  class PaginatedListDto<T> implements IPaginatedModel<T> {
    items?: T[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;

    constructor(data?: IPaginatedModel<T>) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(item);
            }
            this.pageNumber = _data["pageNumber"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            this.hasPreviousPage = _data["hasPreviousPage"];
            this.hasNextPage = _data["hasNextPage"];
        }
    }

    static fromJS<T>(data: any): any {
        let result = new PaginatedListDto<T>();
        result.init(data);
        return result;
    }

}

  export function BuildQueryParams(data: {[s:string]:any}): string {
        let url_ = "";
        if (data.pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (data.pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + data.pageNumber) + "&";
        if (data.pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (data.pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + data.pageSize) + "&";
        return url_.replace(/[?&]$/, "");
  }

//   export function BuildQueryParams(data: any): any {
//     let params:{ [s:string]:any } = {};
//     Object.keys(data).forEach((key, index) => {
//       const prop = Object.getOwnPropertyNames(data)[index];
//       if (data[key] || data[key] === 0) {
//         params[prop] = data[key];
//       }
//     });
//     return params;
//   };
  