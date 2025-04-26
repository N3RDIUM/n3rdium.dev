// Quicklink
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.quicklink={})}(this,function(e){function n(e){return new Promise(function(n,r,t){(t=new XMLHttpRequest).open("GET",e,t.withCredentials=!0),t.onload=function(){200===t.status?n():r()},t.send()})}var r,t=(r=document.createElement("link")).relList&&r.relList.supports&&r.relList.supports("prefetch")?function(e){return new Promise(function(n,r,t){(t=document.createElement("link")).rel="prefetch",t.href=e,t.onload=n,t.onerror=r,document.head.appendChild(t)})}:n,o=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},i=new Set,c=new Set,u=!1;function a(e){if(e){if(e.saveData)return new Error("Save-Data is enabled");if(/2g/.test(e.effectiveType))return new Error("network conditions are poor")}return!0}function s(e,r,o){var s=a(navigator.connection);return s instanceof Error?Promise.reject(new Error("Cannot prefetch, "+s.message)):(c.size>0&&!u&&console.warn("[Warning] You are using both prefetching and prerendering on the same document"),Promise.all([].concat(e).map(function(e){if(!i.has(e))return i.add(e),(r?function(e){return window.fetch?fetch(e,{credentials:"include"}):n(e)}:t)(new URL(e,location.href).toString())})))}function f(e,n){var r=a(navigator.connection);if(r instanceof Error)return Promise.reject(new Error("Cannot prerender, "+r.message));if(!HTMLScriptElement.supports("speculationrules"))return s(e),Promise.reject(new Error("This browser does not support the speculation rules API. Falling back to prefetch."));if(document.querySelector('script[type="speculationrules"]'))return Promise.reject(new Error("Speculation Rules is already defined and cannot be altered."));for(var t=0,o=[].concat(e);t<o.length;t+=1){var f=o[t];if(window.location.origin!==new URL(f,window.location.href).origin)return Promise.reject(new Error("Only same origin URLs are allowed: "+f));c.add(f)}i.size>0&&!u&&console.warn("[Warning] You are using both prefetching and prerendering on the same document");var l=function(e){var n=document.createElement("script");n.type="speculationrules",n.text='{"prerender":[{"source": "list","urls": ["'+Array.from(e).join('","')+'"]}]}';try{document.head.appendChild(n)}catch(e){return e}return!0}(c);return!0===l?Promise.resolve():Promise.reject(l)}e.listen=function(e){if(e||(e={}),window.IntersectionObserver){var n=function(e){e=e||1;var n=[],r=0;function t(){r<e&&n.length>0&&(n.shift()(),r++)}return[function(e){n.push(e)>1||t()},function(){r--,t()}]}(e.throttle||1/0),r=n[0],t=n[1],a=e.limit||1/0,l=e.origins||[location.hostname],d=e.ignores||[],h=e.delay||0,p=[],m=e.timeoutFn||o,w="function"==typeof e.hrefFn&&e.hrefFn,g=e.prerender||!1;u=e.prerenderAndPrefetch||!1;var v=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting)p.push((n=n.target).href),function(e,n){n?setTimeout(e,n):e()}(function(){-1!==p.indexOf(n.href)&&(v.unobserve(n),(u||g)&&c.size<1?f(w?w(n):n.href).catch(function(n){if(!e.onError)throw n;e.onError(n)}):i.size<a&&!g&&r(function(){s(w?w(n):n.href,e.priority).then(t).catch(function(n){t(),e.onError&&e.onError(n)})}))},h);else{var o=p.indexOf((n=n.target).href);o>-1&&p.splice(o)}})},{threshold:e.threshold||0});return m(function(){(e.el||document).querySelectorAll("a").forEach(function(e){l.length&&!l.includes(e.hostname)||function e(n,r){return Array.isArray(r)?r.some(function(r){return e(n,r)}):(r.test||r).call(r,n.href,n)}(e,d)||v.observe(e)})},{timeout:e.timeout||2e3}),function(){i.clear(),v.disconnect()}}},e.prefetch=s,e.prerender=f});
quicklink.listen();

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

