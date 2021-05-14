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
    public imageUrl:string = "https://cdn.discordapp.com/attachments/582696736963821569/842824373509423135/default-profile.png",
    public roleId?: number,
    public  id?: number
    
  ){

  };
}


