async function main() {
  const data = await (await fetch("./sample-data.json")).json();
  const graph = document.querySelector("#graph");
  const nodes = data.nodes;

  graph.innerHTML = `
    <div class="row">
      <div class="node"><strong>${nodes[3].name}</strong><span>Gateway</span></div>
    </div>
    <div class="edge">connects to</div>
    <div class="row">
      <div class="node"><strong>${nodes[0].name}</strong><span>Virtualization host</span></div>
      <div class="node"><strong>${nodes[1].name}</strong><span>Container host</span></div>
    </div>
    <div class="edge">hosts services and storage</div>
    <div class="row">
      <div class="node"><strong>${nodes[4].name}</strong><span>Web service</span></div>
      <div class="node"><strong>${nodes[5].name}</strong><span>Monitoring</span></div>
      <div class="node"><strong>${nodes[2].name}</strong><span>Storage</span></div>
    </div>
  `;
}

main();
