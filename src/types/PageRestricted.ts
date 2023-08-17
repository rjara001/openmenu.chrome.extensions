export class PageRestricted {
    host: string;
    date: string;
    constructor(host:string){
        this.host = host;
        this.date = (new Date()).toISOString();
    }
  } 