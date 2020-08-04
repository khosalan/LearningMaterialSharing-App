class Post {
  constructor(
    id,
    owner,
    ownerName,
    time,
    title,
    imageUrl,
    description,
    links,
    like,
    avatar,
    document,
  ) {
    this.id = id;
    this.owner = owner;
    this.ownerName = ownerName;
    this.time = time;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.like = like;
    this.links = links;
    this.avatar = avatar;
    this.document = document;
  }
}

export default Post;
