# N3RDIUM
Hey there! This is my portfolio website and blog. Not much to see here, I guess.
The website is [here](https://n3rdium.dev).

TODOs:
- [ ] (Maybe) Use the sass preprocessor. Add the cmd to the deploy workflow.
- [ ] Make tech stack boxes clickable.
- [ ] All scripts will be deferred as a rule. Nothing essential to UX in the first 14kb transferred should require JS anyways.
- [ ] Make use of obsidian md for the blog system. Posts go in /blog/md_posts/ (open this in obsidian). During build, build an HTML file from it and put it in /blog/posts/slug-here/index.html. Any linked assets that are not common will be in /blog/posts/slug-here/assetname.ext as well.
- [ ] The astro gallery index will be pure json, with title/alt, img url, and linked blog post.
- [ ] Instead of making entire panels for them, turn the "Piano addict." and "Amateur astronomer." themselves into links to these pages.
- [ ] Make an HTML preprocessor that strips all comments and minifies.
- [ ] HTML preprocessor integration. Into /dist/ and deploy to ghp from there.
- [ ] Keep non-inline stuff for devx, enclose with delimiters and remove during the preprocessor stage.
- [ ] An `includes.json` file will specify external repos to include during the build along with their root slug. The repos themselves will contain build scripts that build into their /dist/, which will be moved to the corresponding path by the builder.

## Thanks and Citations
- The site uses the [gruvbox theme](https://github.com/morhetz/gruvbox).

