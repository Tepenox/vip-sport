export class User {
    
    constructor(
    
    public username: string,
    public firstName: string,
    public lastName: string,
    public  age: string,
    public email: string,
    public password: string,
    public description: string,
    public isAdmin: boolean = false,
    public  id?: number
    
  ){

  };
}


