let selectedIncident = null;
let harmfulAnswer = null;

const severitySlider = document.getElementById("severity");
const severityValue = document.getElementById("severityValue");
const resultBox = document.getElementById("result");

severitySlider.addEventListener("input", () => {
  severityValue.textContent = severitySlider.value;
});

document.querySelectorAll(".incident-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedIncident = btn.dataset.incident;
  });
});

document.querySelectorAll(".decision").forEach(btn => {
  btn.addEventListener("click", () => {
    harmfulAnswer = btn.dataset.result;
  });
});

document.getElementById("recommendBtn").addEventListener("click", () => {
  const severity = Number(severitySlider.value);

  if (!selectedIncident) {
    resultBox.innerHTML = "Select an incident first.";
    return;
  }

  if (harmfulAnswer === "no") {
    resultBox.innerHTML = `
      <h3>IGNORE</h3>
      <p>No action needed.</p>
    `;
    return;
  }

  if (severity === 1) {
    resultBox.innerHTML = `
      <h3>WARN</h3>
      <p>Give a gentle reminder. Great for beginners.</p>
    `;
  } else if (severity === 2) {
    resultBox.innerHTML = `
      <h3>DELETE MESSAGE</h3>
      <p>Remove message and monitor user behavior.</p>
    `;
  } else if (severity === 3) {
    resultBox.innerHTML = `
      <h3>TIMEOUT</h3>
      <p>Timeout user for 10 minutes.</p>
      <code>/timeout username 600</code>
    `;
  } else {
    resultBox.innerHTML = `
      <h3>BAN + ESCALATE</h3>
      <p>Critical incident. Alert streamer/admin.</p>
      <code>/ban username</code>
    `;
  }
});

document.getElementById("panicBtn").addEventListener("click", () => {
  resultBox.innerHTML = `
    <h2>PANIC MODE</h2>
    <p>Recommended emergency actions:</p>
    <ul>
      <li>/followers 10m</li>
      <li>/slow 30</li>
      <li>/emoteonly</li>
    </ul>
  `;
});