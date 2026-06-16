let selectedIncident = null;
let harmfulAnswer = null;

const incidentList = document.getElementById("incidentList");
const searchInput = document.getElementById("search");
const severitySlider = document.getElementById("severity");
const severityValue = document.getElementById("severityValue");
const resultBox = document.getElementById("result");

const repeatOffense = document.getElementById("repeatOffense");
const newChatter = document.getElementById("newChatter");
const streamerEscalation = document.getElementById("streamerEscalation");

const evidenceFilters = document.querySelectorAll(".evidence-filter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

function getSelectedEvidence() {
  return Array.from(evidenceFilters)
    .filter((filter) => filter.checked)
    .map((filter) => filter.value);
}

function scoreIncident(incident) {
  const selectedEvidence = getSelectedEvidence();

  if (selectedEvidence.length === 0) {
    return 0;
  }

  const matchedEvidence = selectedEvidence.filter((item) =>
    incident.evidence.includes(item)
  );

  return Math.round(
    (matchedEvidence.length / selectedEvidence.length) * 100
  );
}

function likelihoodLabel(score) {
  if (score >= 75) {
    return {
      text: "High likelihood",
      className: "likelihood likelihood-high"
    };
  }

  if (score >= 40) {
    return {
      text: "Medium likelihood",
      className: "likelihood likelihood-medium"
    };
  }

  if (score > 0) {
    return {
      text: "Low likelihood",
      className: "likelihood likelihood-low"
    };
  }

  return {
    text: "No evidence match",
    className: "likelihood"
  };
}

function renderIncidentList(list = incidents) {
  incidentList.innerHTML = "";

  const selectedEvidence = getSelectedEvidence();

  let scoredList = list.map((incident) => {
    return {
      ...incident,
      score: scoreIncident(incident)
    };
  });

  if (selectedEvidence.length > 0) {
    scoredList.sort((a, b) => b.score - a.score);
  }

  if (scoredList.length === 0) {
    incidentList.innerHTML = `
      <p class="helper-text">
        No matching incident found. Try a broader word like “spam,” “raid,” or “promo.”
      </p>
    `;
    return;
  }

  scoredList.forEach((incident) => {
    const btn = document.createElement("button");

    btn.className = `incident-card border-${incident.color}`;

    if (selectedIncident && selectedIncident.id === incident.id) {
      btn.classList.add("selected");
    }

    const likelihood = likelihoodLabel(incident.score);

    btn.innerHTML = `
      <strong>${incident.title}</strong>
      <small>${incident.category} • Suggested severity ${incident.severity}</small>
      ${
        selectedEvidence.length > 0
          ? `<span class="${likelihood.className}">
              ${likelihood.text} • ${incident.score}%
            </span>`
          : ""
      }
    `;

    btn.addEventListener("click", () => {
      selectedIncident = incidents.find((item) => item.id === incident.id);

      severitySlider.value = selectedIncident.severity;
      severityValue.textContent = selectedIncident.severity;

      renderIncidentList(getFilteredIncidents());
      showIncidentDetails(selectedIncident);
    });

    incidentList.appendChild(btn);
  });
}

function getFilteredIncidents() {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    return incidents;
  }

  return incidents.filter((incident) => {
    const searchable = [
      incident.title,
      incident.category,
      incident.keywords.join(" "),
      incident.examples.join(" "),
      incident.signs.join(" "),
      incident.actions.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });
}

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function badgeClass(color) {
  return `badge badge-${color}`;
}

function getMatchedEvidence(incident) {
  const selectedEvidence = getSelectedEvidence();

  return selectedEvidence.filter((item) =>
    incident.evidence.includes(item)
  );
}

function getMissingEvidence(incident) {
  const selectedEvidence = getSelectedEvidence();

  return selectedEvidence.filter((item) =>
    !incident.evidence.includes(item)
  );
}

function formatEvidenceName(item) {
  const labels = {
    "new-account": "New account",
    repeat: "Repeated behavior",
    "spam-burst": "Spam burst",
    "personal-info": "Personal info",
    threats: "Threats",
    "promo-links": "Promo links",
    "emotional-pressure": "Emotional pressure",
    spoilers: "Spoilers / backseating"
  };

  return labels[item] || item;
}

function showIncidentDetails(incident) {
  resultBox.className = "result-card";

  const score = scoreIncident(incident);
  const matchedEvidence = getMatchedEvidence(incident);
  const missingEvidence = getMissingEvidence(incident);
  const selectedEvidence = getSelectedEvidence();

  resultBox.innerHTML = `
    <span class="${badgeClass(incident.color)}">
      ${incident.category}
    </span>

    <h3>${incident.title}</h3>

    ${
      selectedEvidence.length > 0
        ? `
          <h4>Evidence Match</h4>
          <p><strong>Likelihood:</strong> ${score}%</p>

          <p><strong>Matched:</strong></p>
          <ul>
            ${
              matchedEvidence.length > 0
                ? matchedEvidence
                    .map((item) => `<li>✓ ${formatEvidenceName(item)}</li>`)
                    .join("")
                : "<li>No matching evidence</li>"
            }
          </ul>

          <p><strong>Missing / Not a Match:</strong></p>
          <ul>
            ${
              missingEvidence.length > 0
                ? missingEvidence
                    .map((item) => `<li>✕ ${formatEvidenceName(item)}</li>`)
                    .join("")
                : "<li>No conflicting evidence</li>"
            }
          </ul>
        `
        : ""
    }

    <h4>Examples</h4>
    <ul>${listItems(incident.examples)}</ul>

    <h4>Common Signs</h4>
    <ul>${listItems(incident.signs)}</ul>

    <h4>Recommended Actions</h4>
    <ul>${listItems(incident.actions)}</ul>

    <h4>Useful Command</h4>
    <code>${incident.command}</code>
    <button class="copy-btn" data-copy="${incident.command}">
      Copy Command
    </button>

    <h4>Beginner Tip</h4>
    <p>${incident.beginnerTip}</p>
  `;
}

function recommendationName(level) {
  if (level <= 1) {
    return "Warn / Redirect";
  }

  if (level === 2) {
    return "Delete Message / Monitor";
  }

  if (level === 3) {
    return "Timeout";
  }

  return "Ban + Escalate";
}

function recommendationCommand(level, incident) {
  if (incident && incident.command) {
    return incident.command;
  }

  if (level <= 1) {
    return "Friendly reminder in chat";
  }

  if (level === 2) {
    return "/delete <message>";
  }

  if (level === 3) {
    return "/timeout username 600";
  }

  return "/ban username";
}

function getWhy(level, incident) {
  const reasons = [];

  if (incident) {
    reasons.push(
      `${incident.title} is usually treated as severity ${incident.severity}.`
    );
  }

  if (harmfulAnswer === "no") {
    reasons.push(
      "You marked the message as not harmful, so no punishment is needed."
    );
  }

  if (harmfulAnswer === "maybe") {
    reasons.push(
      "You marked it as uncertain, so a measured response is safest."
    );
  }

  if (harmfulAnswer === "yes") {
    reasons.push(
      "You marked it as harmful, so intervention is appropriate."
    );
  }

  if (repeatOffense.checked) {
    reasons.push("Repeated behavior increases the response level.");
  }

  if (newChatter.checked) {
    reasons.push("A new or suspicious chatter may need closer monitoring.");
  }

  if (streamerEscalation.checked) {
    reasons.push(
      "You marked this as something the streamer/admin should know about."
    );
  }

  return reasons;
}

function getFinalSeverity() {
  let level = Number(severitySlider.value);

  if (repeatOffense.checked) {
    level += 1;
  }

  if (streamerEscalation.checked && level < 4) {
    level += 1;
  }

  return Math.min(level, 4);
}

severitySlider.addEventListener("input", () => {
  severityValue.textContent = severitySlider.value;
});

document.querySelectorAll(".decision").forEach((btn) => {
  btn.addEventListener("click", () => {
    harmfulAnswer = btn.dataset.result;

    document.querySelectorAll(".decision").forEach((b) => {
      b.classList.remove("selected");
    });

    btn.classList.add("selected");
  });
});

searchInput.addEventListener("input", () => {
  renderIncidentList(getFilteredIncidents());
});

evidenceFilters.forEach((filter) => {
  filter.addEventListener("change", () => {
    renderIncidentList(getFilteredIncidents());

    if (selectedIncident) {
      showIncidentDetails(selectedIncident);
    }
  });
});

clearFiltersBtn.addEventListener("click", () => {
  evidenceFilters.forEach((filter) => {
    filter.checked = false;
  });

  renderIncidentList(getFilteredIncidents());

  if (selectedIncident) {
    showIncidentDetails(selectedIncident);
  }
});

document.getElementById("recommendBtn").addEventListener("click", () => {
  if (!selectedIncident) {
    resultBox.innerHTML = `
      Select an incident first, or search for one above.
    `;
    return;
  }

  if (harmfulAnswer === "no") {
    resultBox.innerHTML = `
      <span class="badge badge-green">Low Risk</span>

      <h3>Ignore / Observe</h3>

      <p>
        No action needed unless the behavior continues or starts disrupting chat.
      </p>

      <h4>Why this recommendation?</h4>
      <ul>${listItems(getWhy(1, selectedIncident))}</ul>
    `;
    return;
  }

  const finalSeverity = getFinalSeverity();
  const name = recommendationName(finalSeverity);
  const command = recommendationCommand(finalSeverity, selectedIncident);

  let color = "yellow";

  if (finalSeverity === 2 || finalSeverity === 3) {
    color = "orange";
  }

  if (finalSeverity === 4) {
    color = "red";
  }

  resultBox.innerHTML = `
    <span class="${badgeClass(color)}">
      Severity ${finalSeverity}
    </span>

    <h3>${name}</h3>

    <p>
      <strong>Incident:</strong> ${selectedIncident.title}
    </p>

    <h4>Suggested command/action</h4>
    <code>${command}</code>
    <button class="copy-btn" data-copy="${command}">
      Copy Command
    </button>

    <h4>What to do</h4>
    <ul>${listItems(selectedIncident.actions)}</ul>

    <h4>Why this recommendation?</h4>
    <ul>${listItems(getWhy(finalSeverity, selectedIncident))}</ul>

    <h4>Beginner Tip</h4>
    <p>${selectedIncident.beginnerTip}</p>
  `;
});

document.getElementById("panicBtn").addEventListener("click", () => {
  resultBox.classList.add("panic-active");

  resultBox.innerHTML = `
    <span class="badge badge-red">Emergency</span>

    <h2>Panic Mode</h2>

    <p>
      Use this for bot raids, hate raids, doxxing, or chat moving too fast to control.
    </p>

    <h4>Stabilize chat first</h4>

    <code>/followers 10m
/slow 30
/emoteonly</code>

    <h4>Then clean up</h4>

    <ul>
      <li>Ban obvious bots or malicious accounts.</li>
      <li>Tell the streamer/admin what happened.</li>
      <li>Turn modes off once chat is safe again.</li>
    </ul>
  `;
});

const modal = document.getElementById("commandsModal");

document.getElementById("commandsBtn").addEventListener("click", () => {
  modal.classList.remove("hidden");
});

document.getElementById("closeCommands").addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
document.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("copy-btn")) {
    return;
  }

  const textToCopy = event.target.dataset.copy;

  try {
    await navigator.clipboard.writeText(textToCopy);

    event.target.textContent = "Copied!";
    event.target.classList.add("copied");

    setTimeout(() => {
      event.target.textContent = "Copy Command";
      event.target.classList.remove("copied");
    }, 1500);
  } catch (error) {
    event.target.textContent = "Copy failed";
  }
});
];
const positiveMoments = [
  {
    id: "big-raid",
    title: "Big Incoming Raid",
    category: "Community Moment",
    priority: "high",

    examples: [
      "A streamer raids in with a large group",
      "Chat suddenly gets active in a positive way",
      "Streamer wants the raider recognized publicly"
    ],

    actions: [
      "Welcome the raider and their community",
      "Use Twitch’s built-in shoutout command",
      "Encourage chat to check them out",
      "Help keep chat readable if excitement spikes"
    ],

    command: "/shoutout username",

    beginnerTip:
      "Many streamers prefer the official Twitch /shoutout command for bigger raids because it creates a more visible shoutout."
  }
];
renderIncidentList();
renderPositiveMoments();
