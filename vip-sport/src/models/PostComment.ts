export class Post {
    title: String;
    userName: String;
    content: String;
    image:HTMLImageElement;
    comments:Post[];
  }

export class Comment {
  userName: String;
  content: String;
  image:HTMLImageElement;
}
