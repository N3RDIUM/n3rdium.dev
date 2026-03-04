var content = {};

fetch("/blog/index.json").then(async res => {
    content = await res.json().catch(() => alert("/blog/index.json: Bad JSON format!"));
    console.log(content);
}).catch(() => alert("Couldn't load blog posts! Please try again."));
