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

