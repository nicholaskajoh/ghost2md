const fs = require('fs');
const TurndownService = require('turndown');

var argv = require('minimist')(process.argv.slice(2));
const ghostData = require(argv.path);

function getTags(postId) {
  // return a stringified array of tag names belonging to a given post
  const tags = [];
  const allTags = ghostData.db[0].data.tags;
  let postsTags = ghostData.db[0].data.posts_tags;
  postsTags = postsTags.filter(tag => tag.post_id === postId);
  for (let postTag of postsTags) {
    let tag = allTags.find(t => t.id === postTag.tag_id);
    if (tag) tags.push(tag.name);
  }
  return tags.length == 0 ? null : JSON.stringify(tags);
}

function getAuthor(authorId) {
  // return an author name given an id
  const authors = ghostData.db[0].data.users;
  const author = authors.find(a => a.id === authorId);
  return author.name ? author.name : null;
}

function getFrontMatter(post) {
  // return the front matter text for a post
  const author = getAuthor(post.author_id);
  const tags = getTags(post.id);

  let fm = `${argv.frontMatterTokenId}\n`;
  if (author) fm += `author = "${author}"\n`;
  if (post.published_at) fm += `date = ${post.published_at}\n`;
  if (post.meta_description) fm += `description = "${post.meta_description}"\n`;
  fm += `draft = ${post.status == 'published' ? false : true}\n`;
  fm += `image = "${post.feature_image}"\n`;
  fm += `slug = "${post.slug}"\n`;
  if (tags) fm += `tag = ${tags}\n`;
  fm += `title = "${post.title}"\n`;
  fm += `\n${argv.frontMatterTokenId}\n\n\n`;

  return fm;
}

// generate markdown files
const posts = ghostData.db[0].data.posts;
for (let post of posts) {
  const frontMatter = getFrontMatter(post);
  const turndownService = new TurndownService();
  const content = turndownService.turndown(post.html);
  
  const output = frontMatter + content;
  const outputFileName = `./posts/${post.slug}.md`;
  fs.writeFileSync(outputFileName, output);
  console.log(`Created ${outputFileName}`);
}