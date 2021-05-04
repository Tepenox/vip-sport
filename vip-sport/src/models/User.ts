export class User {
    
    constructor(
    
    public userName: string,
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string,
    public password: string,
    public description: string,
    public sport: string,
    public weight: number,
    public height: number,
    public isAdmin: boolean = false,
    public imageUrl:string = "https://cdn.discordapp.com/attachments/782960399464398868/839125932651315230/3467-full.png",
    public  id?: number
    
  ){

  };
}


