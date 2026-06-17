async function render(data) {
  const root = document.querySelector("#devices");
  root.innerHTML = data.devices.map((device) => `
    <div class="device">
      <div>
        <strong>${device.name}</strong>
        <small>${device.os} · ${device.addresses.join(", ")}</small>
        <small>Last seen ${device.lastSeen}</small>
      </div>
      <div>
        <span class="badge ${device.status === "online" ? "good" : "bad"}">${device.status}</span>
        <small>${device.tags.join(", ") || "no tags"}</small>
      </div>
    </div>
  `).join("");
}

document.querySelector("#load-sample").addEventListener("click", async () => {
  const response = await fetch("./tailscale-sample.json");
  await render(await response.json());
});

document.querySelector("#file").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const data = JSON.parse(await file.text());
  await render(data);
});

render({ devices: [] });
