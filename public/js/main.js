const btn = document.getElementById('keyword-btn');
btn.addEventListener('click', getMatches);

async function getMatches() {
	const keyword = document.querySelector('input').value;

	try {
		const res = await fetch('/api');
		const data = await res.json();
		const matches = data.filter(resource => resource.keywords.some(str => str.includes(keyword)));
		renderMatches(matches);
	} catch(err) {
		console.error(err);
	}
}

function renderMatches(matches) {
	const list = document.getElementById('result-list');
	list.innerHTML = '';

	matches.forEach(match => {
		const li = document.createElement('li');

		li.innerHTML = `
			<pre class="json"><code>{<div class="indent"><br>name: ${match.name},<br>url: ${match.url},<br class="middle-br">keywords: [${match.keywords.map(keyword => `'${keyword}'`).join(", ")}]</div><br>}</code>
			</pre>
		`;

		list.appendChild(li);
	});
}