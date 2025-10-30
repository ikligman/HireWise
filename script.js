/* script.js */
const $ = (s, r = document) => r.querySelector(s);
const storeKey = 'hirewise-docs-v1';
const resumeEl = $('#resume'); const jdEl = $('#jd');
const msgEl = $('#messages'); const promptEl = $('#prompt');

function loadDocs() {
    try {
        return JSON.parse(localStorage.getItem(storeKey)) || { resume: '', jd: '' }
    } catch {
        return { resume: '', jd: '' }
    }
}
function saveDocs(d) {
    localStorage.setItem(storeKey, JSON.stringify(d))
}
function msg(role, text) {
    const div = document.createElement('div');
    div.className = 'msg';
    div.innerHTML = `<div class="avatar ${role === 'bot' ? 'bot' : ''}">${role === 'bot' ? 'AI' : 'You'}</div><div class="bubble ${role === 'bot' ? 'bot' : ''}">${text}</div>`;
    return div;
}
function scrollB() {
    msgEl.scrollTop = msgEl.scrollHeight;
}
function fakeAI(p) {
    return `Fake AI says: '${p}' — in the real app this would analyze resume & JD.`
}
$('#composer').addEventListener('submit', e => {
    e.preventDefault(); const t = promptEl.value.trim();
    if (!t) return;
    msgEl.append(msg('user', t)); promptEl.value = '';
    scrollB(); setTimeout(() => {
        msgEl.append(msg('bot', fakeAI(t)));
        scrollB();
    }, 400)
});
const d = loadDocs();
resumeEl.value = d.resume;
jdEl.value = d.jd;
resumeEl.oninput = () => saveDocs({ resume: resumeEl.value, jd: jdEl.value });
jdEl.oninput = () => saveDocs({ resume: resumeEl.value, jd: jdEl.value });
msgEl.append(msg('bot', 'Welcome to HireWise prototype! Paste resume and JD, then try chatting.'));