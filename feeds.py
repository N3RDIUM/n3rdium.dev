import json
from feedgen.feed import FeedGenerator

BLOG = "./blog/posts/index.json"
ASTRO = "./astro/history/index.json"

# STAGE 1: Blog feed
blog_feed = FeedGenerator()
blog_feed.id('https://n3rdium.dev/blog/')
blog_feed.title("N3RDIUM's Blog")
blog_feed.author( {'name':'n3rdium','email':'n3rdium@n3rdium.dev'} )
blog_feed.logo('https://n3rdium.dev/img/n3rdium.png')
blog_feed.subtitle('Welcome to my blog! Find weekend projects, not-so-weekend ones, programming posts, random scientific banter and much more.')
blog_feed.link( href='https://n3rdium.dev/blog/' )
blog_feed.link( href='https://n3rdium.dev/blog/atom.xml', rel='self' )
blog_feed.link( href='https://n3rdium.dev/blog/rss.xml', rel='alternate' )
blog_feed.language('en')

with open(BLOG, "r") as f:
    blog_content = json.load(f)

def urlify(path):
    return "https://n3rdium.dev" + path

for post in blog_content:
    fe = blog_feed.add_entry()
    fe.id(post["url"])
    fe.title(post["title"])
    fe.link(href=urlify(post["url"]))

blog_feed.atom_file('./blog/atom.xml')
blog_feed.rss_file('./blog/rss.xml')

# STAGE 2: Astro feed
astro_feed = FeedGenerator()
astro_feed.id('https://n3rdium.dev/astro/')
astro_feed.title("N3RDIUM's Astro Gallery")
astro_feed.author( {'name':'n3rdium','email':'n3rdium@n3rdium.dev'} )
astro_feed.logo('https://n3rdium.dev/img/n3rdium.png')
astro_feed.subtitle('This is a gallery of all my latest astrophotography, in a pinterest-like bento grid format. Enjoy the spacey-ness!')
astro_feed.link( href='https://n3rdium.dev/astro/' )
astro_feed.link( href='https://n3rdium.dev/astro/atom.xml', rel='self' )
astro_feed.link( href='https://n3rdium.dev/astro/rss.xml', rel='alternate' )
astro_feed.language('en')

with open(ASTRO, "r") as f:
    astro_content = json.load(f)

def urlify(path):
    return "https://n3rdium.dev" + path

for post in astro_content:
    fe = astro_feed.add_entry()
    fe.id(post["url"])
    fe.title(post["title"])
    fe.link(href=urlify(post["url"]))

astro_feed.atom_file('./astro/atom.xml')
astro_feed.rss_file('./astro/rss.xml')

