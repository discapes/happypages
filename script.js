class replacePair {
	constructor(re, str) {
		this.re = re;
		this.str = str;
	}
}

function isUpper(t) {
	return t === t.toUpperCase();
}

function casePreserveReplace(str, a, b) {
	return str
		.replace(a.toLowerCase(), b.toLowerCase())
		.replace(a.toUpperCase(), b.toUpperCase());
}
function thisCase(a, b) {
	return isUpper(a) ? b.toUpperCase() : b.toLowerCase();
}

function uwufy2(text) {
	if (!text || text.replace(/[^\w]/g, "").length <= 3) return text;
	// console.log(`original text:\n${text}`);
	const pairs = [
		// new replacePair(/you/gi, m => thisCase(m, "u")),
		// new replacePair(/thanks/gi, m => thisCase(m, "tnx")),
		// new replacePair(/like/gi, m => thisCase(m, "lik")),
		// new replacePair(/ok/gi, m => thisCase(m, "oki")),
		// new replacePair(/because/gi, m => thisCase(m, "cuz")),
		// new replacePair(/(?<![a-zA-Z])cry(?![a-zA-Z])/gi, m =>
		// 	thisCase(m, "cri " + randomChoice([";-;", "😭", ":c"]))
		// ),
		// new replacePair(
		// 	/((?![aeiounwy])\w)([aeiou])(?!l)/gi,
		// 	m => m[0] + (Math.random() > 0.5 ? thisCase(m[0], "w") : "") + m[1]
		// ),
		new replacePair(/(?<=\w)[rl](?=\w)/gi, (m) => thisCase(m, "w")),
		new replacePair(/is/gi, (m) =>
			casePreserveReplace(
				m,
				"s",
				thisCase(m, "z") /*.repeat(Math.floor(1 + Math.random() * 3))*/
			)
		),
		new replacePair(/a(nd)/gi, "$1"),
		new replacePair(/v/gi, (m) => thisCase(m, "w")),
		new replacePair(/(h)(i)/gi, "$1$2$2$2$2"),
		// new replacePair(/([a-zA-Z?!~])\s+$/i, "$1$1$1"),
		new replacePair(/\s+$/i, ""),
	];
	pairs.forEach((rp) => {
		text = text.replace(rp.re, rp.str);
	});
	const emojiPatch = "🥰😍😘😻💌💘💝💖💗💓💞💕💟❣️❤️🧡💛💚💙💜";
	const emojis = [];
	for (const ch of emojiPatch) {
		emojis.push(ch);
	}
	function buildWholesome() {
		let final = "";
		if (text.length < 10) {
			Math.random() < 0.02 && (final += randomChoice(emojis));
		} else {
			for (
				let i = 0;
				i < Math.min(5, text.length / 10, Math.floor(Math.random() * 5));
				i++
			) {
				final += randomChoice(emojis);
			}
		}
		return final;
	}
	// console.log(`output:\n${text}`);
	return (
		text.replace(/([.?!~]\s+|$)/g, () => " " + buildWholesome() + " ") +
		(Math.random() < 0.15
			? randomChoice(["uwu", "owo", ":3", "xd", "c:", "^o^"])
			: "")
	);
}

function randomChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
	if (["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) continue;
	node.data = uwufy2(node.data);
}
