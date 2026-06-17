const statusClass = {
  online: "good",
  healthy: "good",
  warning: "warn",
  degraded: "warn",
  offline: "bad",
  critical: "bad",
  info: "info"
};

function badge(value) {
  const key = String(value).toLowerCase();
  return `<span class="badge ${statusClass[key] || "info"}">${value}</span>`;
}

function bar(value) {
  return `<span class="mini-meter"><span style="width:${value}%"></span></span>${value}%`;
}

async function loadDemo() {
  const response = await fetch("./sample-data.json");
  const data = await response.json();

  document.querySelector("#nodes-online").textContent = `${data.summary.nodesOnline}/${data.summary.nodesTotal}`;
  document.querySelector("#services-healthy").textContent = `${data.summary.servicesHealthy}/${data.summary.servicesTotal}`;
  document.querySelector("#storage-used").textContent = `${data.summary.storageUsedPercent}%`;
  document.querySelector("#open-alerts").textContent = data.summary.openAlerts;
  document.querySelector("#storage-ring-value").textContent = `${data.summary.storageUsedPercent}%`;
  document.querySelector("#storage-meter").style.width = `${data.summary.storageUsedPercent}%`;

  document.querySelector("#node-table").innerHTML = data.nodes.map((node) => `
    <tr>
      <td><strong>${node.name}</strong></td>
      <td>${node.role}</td>
      <td><code>${node.address}</code></td>
      <td>${badge(node.status)}</td>
      <td>${bar(node.cpu)}</td>
      <td>${bar(node.memory)}</td>
      <td>${node.uptime}</td>
    </tr>
  `).join("");

  document.querySelector("#services-list").innerHTML = data.services.map((service) => `
    <div class="list-row">
      <div>
        <strong>${service.name}</strong>
        <span>${service.target}</span>
      </div>
      <div>
        ${badge(service.status)}
        <small>${service.latencyMs === null ? "no response" : `${service.latencyMs} ms`}</small>
      </div>
    </div>
  `).join("");

  document.querySelector("#alerts-list").innerHTML = data.alerts.map((alert) => `
    <div class="alert-row ${statusClass[alert.severity] || "info"}">
      <strong>${alert.title}</strong>
      <span>${alert.detail}</span>
    </div>
  `).join("");

  document.querySelector("#events-list").innerHTML = data.events.map((event) => `<li>${event}</li>`).join("");
}

loadDemo().catch((error) => {
  document.body.innerHTML = `<main class="app"><h1>Demo failed to load</h1><p>${error.message}</p></main>`;
});
