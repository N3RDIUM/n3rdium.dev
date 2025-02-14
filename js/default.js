const quotes = [
    // Real quotes
    "Fourty Two.",
	"I'd rather keep my face completely blank than wear a fake smile.",
    "The best time to start learning piano was several years ago. The second best time is now.",
    "Mankind Was Born On Earth. It Was Never Meant To Die Here. - Cooper",
    "People worry about artificial intelligence taking over the world, but they don't realise that natural stupidity already has.",

    // Jokes
    "Aim for the stars. You'll probably miss. Seriously, try it right now with a laser pointer!",
    "I have a joke about HTTP, but you probably wouldn't GET it.",
    "In Order to Play the Joker, Joaquin Phoenix had to use both tabs AND spaces at once.",

    // What?!
    "The future sounds like Synthwave. The work needed to get there sounds like [neo]classical piano (with some violin).",
    "The realisation that you're currently playing the most realistic open-world game known to mankind is just...",
    "Who else is still distro-hoppin'?",
    "Fira Code has great ligatures <=> >= ||",
    "NixOS + Hyprland + Astal + Neovim = <3",
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

document.addEventListener("DOMContentLoaded", () => {
	const elements = document.getElementsByClassName("insert-quote-here");
	for(const element of elements) {
		element.innerHTML = generateQuote();
	}
});
