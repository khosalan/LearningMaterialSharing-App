class Post {
  constructor(
    id,
    ownerId,
    ownerName,
    time,
    title,
    imageUrl,
    description,
    links,
    like,
    dislike,
    comment,
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
