# N3RDIUM
Hey there! This is my portfolio website and blog. Not much to see here, I guess.
The website is [here](https://n3rdium.dev).

TODOs:
- [ ] Manage (deferred) JS modules. First thing to add is a responsive nav menu.
- [ ] (Maybe) Use the sass preprocessor. Add the cmd to the deploy workflow.
- [ ] Make tech stack boxes clickable.
- [ ] Parse obsidian-style metadata, convert it into json and update the template accordingly.
- [x] An `includes.json` file will specify external repos to include during the build along with their root slug. The repos themselves will contain build scripts that build into their /dist/, which will be moved to the corresponding path by the builder.
- [x] Keep non-inline stuff for devx, enclose with delimiters and remove during the preprocessor stage.
- [x] Instead of making entire panels for them, turn the "Piano addict." and "Amateur astronomer." themselves into links to these pages.
- [x] All scripts will be deferred as a rule. Nothing essential to UX in the first 14kb transferred should require JS anyways.
- [x] HTML preprocessor integration. Into /dist/ and deploy to ghp from there.
- [x] Make an HTML preprocessor that strips all comments and minifies.

## Thanks and Citations
- The site uses the [gruvbox theme](https://github.com/morhetz/gruvbox).

