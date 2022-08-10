export interface QueryError {
  name: any;
  status: any;
  detail: any;
  code: any;
}
export class QueryError extends Error {
  constructor(status: number, code: string, detail: string) {
      super(code);

      this.name = this.constructor.name;
      this.status = status || 400;
      this.detail = detail || "invalidQuery";
      this.code = code || "Unkown error";
  }

  statusCode() {
      return this.status;
  }
}
