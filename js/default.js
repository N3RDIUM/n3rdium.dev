/*! instant.page v5.2.0 - (C) 2019-2023 Alexandre Dieulot - https://instant.page/license */
let t,e,n,o,i,a=null,s=65,c=new Set;const r=1111;function d(t){o=performance.now();const e=t.target.closest("a");m(e)&&p(e.href,"high")}function u(t){if(performance.now()-o<r)return;if(!("closest"in t.target))return;const e=t.target.closest("a");m(e)&&(e.addEventListener("mouseout",f,{passive:!0}),i=setTimeout(()=>{p(e.href,"high"),i=void 0},s))}function l(t){const e=t.target.closest("a");m(e)&&p(e.href,"high")}function f(t){t.relatedTarget&&t.target.closest("a")==t.relatedTarget.closest("a")||i&&(clearTimeout(i),i=void 0)}function h(t){if(performance.now()-o<r)return;const e=t.target.closest("a");if(t.which>1||t.metaKey||t.ctrlKey)return;if(!e)return;e.addEventListener("click",function(t){1337!=t.detail&&t.preventDefault()},{capture:!0,passive:!1,once:!0});const n=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1,detail:1337});e.dispatchEvent(n)}function m(o){if(o&&o.href&&(!n||"instant"in o.dataset)){if(o.origin!=location.origin){if(!(e||"instant"in o.dataset)||!a)return}if(["http:","https:"].includes(o.protocol)&&("http:"!=o.protocol||"https:"!=location.protocol)&&(t||!o.search||"instant"in o.dataset)&&!(o.hash&&o.pathname+o.search==location.pathname+location.search||"noInstant"in o.dataset))return!0}}function p(t,e="auto"){if(c.has(t))return;const n=document.createElement("link");n.rel="prefetch",n.href=t,n.fetchPriority=e,n.as="document",document.head.appendChild(n),c.add(t)}!function(){if(!document.createElement("link").relList.supports("prefetch"))return;const o="instantVaryAccept"in document.body.dataset||"Shopify"in window,i=navigator.userAgent.indexOf("Chrome/");i>-1&&(a=parseInt(navigator.userAgent.substring(i+"Chrome/".length)));if(o&&a&&a<110)return;const c="instantMousedownShortcut"in document.body.dataset;t="instantAllowQueryString"in document.body.dataset,e="instantAllowExternalLinks"in document.body.dataset,n="instantWhitelist"in document.body.dataset;const r={capture:!0,passive:!0};let f=!1,v=!1,g=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if(t.startsWith("mousedown"))f=!0,"mousedown-only"==t&&(v=!0);else if(t.startsWith("viewport")){const e=navigator.connection&&navigator.connection.saveData,n=navigator.connection&&navigator.connection.effectiveType&&navigator.connection.effectiveType.includes("2g");e||n||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(g=!0):"viewport-all"==t&&(g=!0))}else{const e=parseInt(t);isNaN(e)||(s=e)}}v||document.addEventListener("touchstart",d,r);f?c||document.addEventListener("mousedown",l,r):document.addEventListener("mouseover",u,r);c&&document.addEventListener("mousedown",h,r);if(g){let t=window.requestIdleCallback;t||(t=(t=>{t()})),t(function(){const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),p(n.href)}})});document.querySelectorAll("a").forEach(e=>{m(e)&&t.observe(e)})},{timeout:1500})}}();

// Quotes
const quotes = [
    // Real quotes
    "Fourty Two.",
    "The best time to start learning piano was when you were three. The second best time is now.",
    "Mankind Was Born On Earth. It Was Never Meant To Die Here. - Cooper",
    "People worry about artificial intelligence taking over the world, but they don't realise that natural stupidity already has.",

    // Jokes
    "Aim for the stars. You'll probably miss. Seriously, try it right now with a laser pointer!",
    "I have a joke about HTTP, but you probably wouldn't GET it.",
    "In Order to Play the Joker, Joaquin Phoenix had to use both tabs AND spaces at once.",
    "The Electron is light.<br>Physicists: Yes.<br>Developers: No.",
    "Wise old nerds proved Heliocentrism. It was a revolutionary achievement.",

    // What?!
    "The future sounds like Synthwave. The journey to it sounds like classical piano.",
    "The realisation that you're currently playing the most realistic open-world game known to mankind...",
    "Who else is still distro-hoppin'?",
    "Fira Code has great ligatures <=> >= ||",
    "NixOS + Hyprland + Astal + Neovim <3",
    "1/137 might be the 42 of real life.",
];

function generateQuote() {
    const index = Math.round(Math.random() * (quotes.length - 1))
    const quote = quotes[index];

    return `<div style="max-width: 420px">
        <i>"${quote}"</i>
        <p style="float: right">
            - n3rdium
        </p>
    </div>
    <br /><br />`
}

// https://stackoverflow.com/questions/20084513/detect-search-crawlers-via-javascript
var botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
var re = new RegExp(botPattern, 'i');
var userAgent = navigator.userAgent; 

if (!re.test(userAgent)) {
    document.addEventListener("DOMContentLoaded", () => {
	    const elements = document.getElementsByClassName("insert-quote-here");
    	for(const element of elements) {
	    	element.innerHTML = generateQuote();
        }
    });
}

