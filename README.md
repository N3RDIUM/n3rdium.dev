# N3RDIUM
My little corner of the internet. Not much to see here, I guess. The website is 
[here](https://n3rdium.dev).

TODOs:
- [ ] For repetitive class names, extract them, and rename them to short alphanumerics to save kb. Dict mapping find->replace in `findreplace.json`, reference in `doorknob.json`.
- [ ] Store lastmods and publisheds in date+time instead of just date. Modify metadata/feedgen accordingly. Also, the feeds' `updated` is supposed to be the max of the included posts' `updated`. Also, check that `updated` can never be before `published`.
- [ ] Blog index: lazy infinite scroll implementation.
- [ ] Use git submodules to handle doorknob and permafrost.
- [ ] Permafrost template
- [ ] Manage (deferred) JS modules. First thing to add is a responsive nav menu.
- [ ] Make tech stack boxes clickable.
- [ ] Automatic code syntax highlighting for all `code` tags
- [ ] (Maybe) Use the sass preprocessor. Add the cmd to the deploy workflow.
- [ ] (Maybe) Separate the builder into a separate repo.
- [x] Metatdata feed generation: "feeds" metadata (list) which handles file types, eg: [blog/idx.json, blog/rss.xml, blog/atom.xml]

## Thanks and Citations
- theme: [gruvbox](https://github.com/morhetz/gruvbox) by morhetz

