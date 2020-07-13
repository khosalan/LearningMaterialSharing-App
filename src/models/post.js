class Post {
  constructor(
    id,
    ownerId,
    ownerName,
    time,
    title,
    imageUrl,
    description,
    like,
    dislike,
    comment,
    links,
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.time = time;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.like = like;
    this.dislike = dislike;
    this.comment = comment;
    this.links = links;
  }
}

export default Post;
