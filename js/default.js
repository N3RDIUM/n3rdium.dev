const quotes = [
    // Real quotes
	"I'd rather keep my face completely blank than wear a fake smile.",
    "The best time to start learning piano was several years ago. The second best time is now.",

    // Jokes
    "Aim for the stars. You'll probably miss. Seriously, try it right now with a laser pointer!",
    "I have a joke about HTTP, but you probably wouldn't GET it.",

    // What?!
    "The future sounds like Synthwave. The work needed to get there sounds like [neo]classical piano (with some violin).",
    "The realisation that you're currently playing the most realistic open-world game known to mankind is just...",
    "Who else is still distro-hoppin'?",
    "Fira Code has great ligatures <=> >= ||"
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
