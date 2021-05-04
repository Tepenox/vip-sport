export class Post {
    title: String;
    userName: String;
    content: String;
    image:HTMLImageElement;
    comments:Comment[];
  }

export class Comment {
  userName: String;
  content: String;
  image:HTMLImageElement;
}
