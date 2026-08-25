const SVG_NS = "http://www.w3.org/2000/svg";
const graph = document.getElementById("graph");
const groups = Object.fromEntries(["axes", "guides", "trails", "points", "labels"].map(id => [id, document.getElementById(id)]));
const originalCurve = document.getElementById("originalCurve");
const transformedCurve = document.getElementById("transformedCurve");
const bounds = { left: 40, right: 600, top: 20, bottom: 480, xMin: -5.6, xMax: 5.6, yMin: -1, yMax: 10.5 };
const sx = x => bounds.left + (x - bounds.xMin) / (bounds.xMax - bounds.xMin) * (bounds.right - bounds.left);
const sy = y => bounds.bottom - (y - bounds.yMin) / (bounds.yMax - bounds.yMin) * (bounds.bottom - bounds.top);
const el = (tag, attrs = {}, text = "") => {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text) node.textContent = text;
  return node;
};

const basePoints = [[-2,4],[-1,1],[0,0],[1,1],[2,4]];
const lessons = [
  {
    title: "What is scaling?",
    html: `<p class="definition">Scaling means changing the distance of every point of a graph from a fixed axis by the same scale factor.</p><ul class="lesson-list"><li>Moving <b>away</b> from the relevant axis means stretching.</li><li>Moving <b>toward</b> the relevant axis means compression.</li><li>Vertical scaling uses the <b>x-axis</b> as reference.</li><li>Horizontal scaling uses the <b>y-axis</b> as reference.</li></ul>`,
    equations: ["Basic function: y = x²"], hint: "The x-axis and y-axis are the fixed reference lines.", mode: "base"
  },
  {
    title: "Vertical scaling concept",
    html: `<p class="definition">In vertical scaling, the x-coordinate remains unchanged while the y-coordinate changes.</p><p>The dotted vertical guides show that each point stays directly above or below the same x-value.</p>`,
    equations: ["Original points: (−2,4), (−1,1), (0,0), (1,1), (2,4)"], hint: "Follow each vertical guide to see the unchanged x-coordinate.", mode: "verticalConcept"
  },
  {
    title: "Vertical stretch by factor 2",
    html: `<p>Multiply every output of the function by 2. Each point rises vertically while its x-coordinate stays fixed.</p>`,
    equations: ["y = f(x)  →  y = 2f(x)", "y = x²  →  y = 2x²", "(x,y) → (x,2y)"],
    conclusion: `The points move away from the x-axis; therefore, the graph is stretched vertically.<span class="note">The transformed parabola looks narrower, but it is called a vertical stretch because the vertical distances from the x-axis have increased.</span>`,
    fn: x => 2*x*x, transform: ([x,y]) => [x,2*y], points: basePoints.filter(([x]) => x !== 0), label: "y = 2x²", guide: "vertical", hint: "Same x, twice the vertical distance.", mode: "transform"
  },
  {
    title: "Vertical compression by factor 2",
    html: `<p>Start again with y = x², then halve every output. Each point moves vertically toward the x-axis.</p>`,
    equations: ["y = f(x)  →  y = ½f(x)", "y = x²  →  y = ½x²", "(x,y) → (x,y/2)"],
    conclusion: `The points move toward the x-axis; therefore, the graph is compressed vertically.`,
    fn: x => .5*x*x, transform: ([x,y]) => [x,y/2], points: basePoints.filter(([x]) => x !== 0), label: "y = ½x²", guide: "vertical", hint: "Same x, half the vertical distance.", mode: "transform"
  },
  {
    title: "Horizontal scaling concept",
    html: `<p class="definition">In horizontal scaling, the y-coordinate remains unchanged while the x-coordinate changes.</p><p>Corresponding points must be compared at the <b>same height</b>. The dotted horizontal guides make the equal y-values visible.</p>`,
    equations: ["Reference axis: the y-axis"], hint: "Compare left and right positions along the same horizontal guide.", mode: "horizontalConcept"
  },
  {
    title: "Horizontal compression by factor 2",
    html: `<p>Replacing x by 2x halves every x-coordinate. Points slide horizontally toward the y-axis while keeping the same height.</p>`,
    equations: ["y = f(x)  →  y = f(2x)", "y = x²  →  y = (2x)²", "(x,y) → (x/2,y)"],
    conclusion: `The points move toward the y-axis; therefore, the graph is compressed horizontally.`,
    fn: x => 4*x*x, transform: ([x,y]) => [x/2,y], points: basePoints.filter(([x]) => x !== 0), label: "y = (2x)²", guide: "horizontal", hint: "Same y, half the horizontal distance.", mode: "transform"
  },
  {
    title: "Horizontal stretch by factor 2",
    html: `<p>Replacing x by x/2 doubles every x-coordinate. Points slide horizontally away from the y-axis while keeping the same height.</p>`,
    equations: ["y = f(x)  →  y = f(x/2)", "y = x²  →  y = (x/2)²", "(x,y) → (2x,y)"],
    conclusion: `The points move away from the y-axis; therefore, the graph is stretched horizontally.`,
    fn: x => x*x/4, transform: ([x,y]) => [2*x,y], points: basePoints.filter(([x]) => x !== 0), label: "y = (x/2)²", guide: "horizontal", hint: "Same y, twice the horizontal distance.", mode: "transform"
  },
  {
    title: "Final comparison",
    html: `<div class="summary-wrap"><table class="summary"><thead><tr><th>Type</th><th>Equation</th><th>Point rule</th><th>Movement</th></tr></thead><tbody><tr><td>Vertical stretch</td><td>y = af(x)</td><td>(x,ay)</td><td>Away from x-axis</td></tr><tr><td>Vertical compression</td><td>y = ⅟ₐf(x)</td><td>(x,y/a)</td><td>Toward x-axis</td></tr><tr><td>Horizontal stretch</td><td>y = f(x/a)</td><td>(ax,y)</td><td>Away from y-axis</td></tr><tr><td>Horizontal compression</td><td>y = f(ax)</td><td>(x/a,y)</td><td>Toward y-axis</td></tr></tbody></table><p><small>In every rule above, a &gt; 1.</small></p></div>`,
    conclusion: `Vertical scaling changes y and measures distance from the x-axis. Horizontal scaling changes x and measures distance from the y-axis.`,
    equations: [], hint: "Ask: which coordinate changes, and from which axis is distance measured?", mode: "base"
  }
];

let current = 0;
let autoTimer = null;
let animationRun = 0;
const speeds = {
  slow:   { lead:1500, highlight:1500, guide:450, point:4000, curve:3000, eqGap:500, pause:4000 },
  normal: { lead:1000, highlight:1000, guide:350, point:2500, curve:2200, eqGap:350, pause:3000 },
  fast:   { lead:700,  highlight:700,  guide:250, point:1500, curve:1500, eqGap:250, pause:2000 }
};
const speed = () => speeds[document.getElementById("speedSelect").value];
const later = (fn, delay, run) => setTimeout(() => { if (run === animationRun) fn(); }, delay);

function drawAxes() {
  groups.axes.replaceChildren();
  groups.axes.append(el("line", { x1: sx(bounds.xMin+.15), y1: sy(0), x2: sx(bounds.xMax-.15), y2: sy(0), class: "axis" }));
  groups.axes.append(el("line", { x1: sx(0), y1: sy(bounds.yMin+.15), x2: sx(0), y2: sy(bounds.yMax-.15), class: "axis" }));
  for (let x=-5; x<=5; x++) {
    groups.axes.append(el("line", { x1:sx(x), y1:sy(0)-4, x2:sx(x), y2:sy(0)+4, class:"tick" }));
    if (x) groups.axes.append(el("text", { x:sx(x), y:sy(0)+19, "text-anchor":"middle", class:"tick-label" }, String(x)));
  }
  for (let y=0; y<=10; y+=2) {
    groups.axes.append(el("line", { x1:sx(0)-4, y1:sy(y), x2:sx(0)+4, y2:sy(y), class:"tick" }));
    if (y) groups.axes.append(el("text", { x:sx(0)-10, y:sy(y)+4, "text-anchor":"end", class:"tick-label" }, String(y)));
  }
  groups.axes.append(el("text", { x:sx(5.35), y:sy(0)-10, class:"axis-label" }, "x"));
  groups.axes.append(el("text", { x:sx(0)+10, y:sy(10.15), class:"axis-label" }, "y"));
  groups.axes.append(el("text", { x:sx(0)-9, y:sy(0)+18, "text-anchor":"end", class:"tick-label" }, "0"));
}

function curvePath(fn) {
  const pts = [];
  for (let x=bounds.xMin; x<=bounds.xMax; x+=.035) {
    const y = fn(x);
    if (y >= bounds.yMin && y <= bounds.yMax) pts.push(`${pts.length ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return pts.join(" ");
}

function pretty(n) {
  if (Math.abs(n) === .5) return n < 0 ? "−½" : "½";
  return String(n).replace("-", "−");
}
const coord = ([x,y]) => `(${pretty(x)},${pretty(y)})`;

function addGuide(point, kind) {
  const [x,y] = point;
  const attrs = kind === "vertical"
    ? { x1:sx(x), y1:sy(0), x2:sx(x), y2:sy(y), class:"guide" }
    : { x1:sx(0), y1:sy(y), x2:sx(x), y2:sy(y), class:"guide" };
  groups.guides.append(el("line", attrs));
}

function addPoint(point, css, labelText, index, transformed=false) {
  const [x,y] = point;
  groups.points.append(el("circle", { cx:sx(x), cy:sy(y), r:6, class:css + (transformed ? " point-move" : "") }));
  const side = x < 0 ? -1 : 1;
  const dx = x === 0 ? 10 : 10*side;
  const anchor = x < 0 ? "end" : "start";
  const dy = transformed ? (index % 2 ? 17 : -10) : (index % 2 ? -10 : 17);
  groups.labels.append(el("text", { x:sx(x)+dx, y:sy(y)+dy, "text-anchor":anchor, class:`point-label ${transformed ? "label-transformed" : "label-original"}` }, labelText));
}

function addReferencePoint(point, index) {
  const circle = el("circle", { cx:sx(point[0]), cy:sy(point[1]), r:7, class:"selected-point", "data-reference":index });
  groups.points.append(circle);
  addPointLabel(point, coord(point), index, false);
  return circle;
}

function addPointLabel(point, text, index, transformed) {
  const [x,y] = point;
  const side = x < 0 ? -1 : 1;
  const dx = x === 0 ? 10 : 10*side;
  const anchor = x < 0 ? "end" : "start";
  const dy = transformed ? (index % 2 ? 17 : -10) : (index % 2 ? -10 : 17);
  groups.labels.append(el("text", { x:sx(x)+dx, y:sy(y)+dy, "text-anchor":anchor, class:`point-label ${transformed ? "label-transformed" : "label-original"}` }, text));
}

function movePair(step, pair, duration, run) {
  pair.forEach(({ point, index }) => {
    const target = step.transform(point);
    const ref = groups.points.querySelector(`[data-reference="${index}"]`);
    if (ref) { ref.setAttribute("class", "reference-point"); ref.setAttribute("r", "4.5"); }
    groups.trails.append(el("line", { x1:sx(point[0]), y1:sy(point[1]), x2:sx(target[0]), y2:sy(target[1]), class:"trail" }));
    const moving = el("circle", { cx:sx(point[0]), cy:sy(point[1]), r:7, class:"moving-point" });
    const ax = el("animate", { attributeName:"cx", from:sx(point[0]), to:sx(target[0]), dur:`${duration}ms`, fill:"freeze", calcMode:"spline", keySplines:"0.4 0 0.2 1" });
    const ay = el("animate", { attributeName:"cy", from:sy(point[1]), to:sy(target[1]), dur:`${duration}ms`, fill:"freeze", calcMode:"spline", keySplines:"0.4 0 0.2 1" });
    moving.append(ax, ay);
    groups.points.append(moving);
    later(() => addPointLabel(target, coord(target), index, true), duration, run);
  });
}

function runTransformSequence(step) {
  const run = ++animationRun;
  const t = speed();
  const pairs = [
    step.points.map((point,index) => ({point,index})).filter(({point}) => Math.abs(point[0]) === 1),
    step.points.map((point,index) => ({point,index})).filter(({point}) => Math.abs(point[0]) === 2)
  ];
  let at = t.lead;

  later(() => step.points.forEach((p,i) => addReferencePoint(p,i)), at, run);
  at += t.highlight;
  later(() => step.points.forEach(p => addGuide(step.transform(p), step.guide)), at, run);
  at += t.guide;
  const pairDuration = t.point / 2;
  later(() => movePair(step, pairs[0], pairDuration, run), at, run);
  at += pairDuration;
  later(() => movePair(step, pairs[1], pairDuration, run), at, run);
  at += pairDuration;
  later(() => {
    document.getElementById("transformedKey").hidden = false;
    transformedCurve.setAttribute("d", curvePath(step.fn));
    transformedCurve.style.animationDuration = `${t.curve}ms`;
    transformedCurve.setAttribute("class", "curve transformed-curve curve-draw");
  }, at, run);
  at += t.curve;
  document.querySelectorAll("#equations .equation").forEach((equation, i) => {
    later(() => equation.classList.add("revealed"), at + i*t.eqGap, run);
  });
  at += step.equations.length*t.eqGap;
  later(() => {
    const conclusion = document.getElementById("conclusion");
    conclusion.hidden = false;
    conclusion.classList.add("write-in");
  }, at, run);
}

function drawGraph(step) {
  animationRun++;
  groups.guides.replaceChildren(); groups.trails.replaceChildren(); groups.points.replaceChildren(); groups.labels.replaceChildren();
  originalCurve.setAttribute("d", curvePath(x => x*x));
  originalCurve.setAttribute("class", "curve original-curve");
  transformedCurve.setAttribute("d", "");
  transformedCurve.removeAttribute("style");
  document.getElementById("transformedKey").hidden = true;

  if (step.mode === "verticalConcept" || step.mode === "horizontalConcept") {
    const kind = step.mode === "verticalConcept" ? "vertical" : "horizontal";
    basePoints.forEach((p,i) => { addGuide(p, kind); addPoint(p, "point-original", coord(p), i); });
  } else if (step.mode === "transform") {
    document.getElementById("transformedLabel").textContent = step.label;
    runTransformSequence(step);
  }
}

function render() {
  const step = lessons[current];
  document.getElementById("stepNumber").textContent = current + 1;
  document.getElementById("progressFill").style.width = `${(current+1)/lessons.length*100}%`;
  document.getElementById("stepKicker").textContent = `Step ${current+1}`;
  document.getElementById("stepTitle").textContent = step.title;
  document.getElementById("stepText").innerHTML = step.html;
  document.getElementById("equations").innerHTML = step.equations.map((q,i) => `<div class="equation ${step.mode === "transform" ? "staged-equation" : ""} ${i === step.equations.length-1 && step.mode === "transform" ? "mapping" : ""}">${q}</div>`).join("");
  const conclusion = document.getElementById("conclusion");
  conclusion.innerHTML = step.conclusion || "";
  conclusion.classList.remove("write-in");
  conclusion.hidden = !step.conclusion || step.mode === "transform";
  document.getElementById("graphHint").textContent = step.hint;
  document.querySelector(".explanation").classList.remove("write-in");
  void document.querySelector(".explanation").offsetWidth;
  document.querySelector(".explanation").classList.add("write-in");
  document.getElementById("previousBtn").disabled = current === 0;
  document.getElementById("nextBtn").disabled = current === lessons.length - 1;
  drawGraph(step);
}

function stopAuto() {
  clearTimeout(autoTimer); autoTimer = null;
  const btn = document.getElementById("autoBtn");
  btn.setAttribute("aria-pressed", "false"); btn.textContent = "▶ Auto Play";
}
function stageDuration(step) {
  if (step.mode !== "transform") return current === lessons.length - 1 ? 9500 : 7500;
  const t = speed();
  return t.lead + t.highlight + t.guide + t.point + t.curve + step.equations.length*t.eqGap + t.pause;
}
function startAuto() {
  const btn = document.getElementById("autoBtn");
  btn.setAttribute("aria-pressed", "true"); btn.textContent = "■ Stop Auto";
  render();
  const advance = () => {
    if (current >= lessons.length - 1) { stopAuto(); return; }
    current++; render();
    autoTimer = setTimeout(advance, stageDuration(lessons[current]));
  };
  autoTimer = setTimeout(advance, stageDuration(lessons[current]));
}

document.getElementById("previousBtn").addEventListener("click", () => { stopAuto(); if (current) { current--; render(); } });
document.getElementById("nextBtn").addEventListener("click", () => { stopAuto(); if (current < lessons.length-1) { current++; render(); } });
document.getElementById("replayBtn").addEventListener("click", () => { stopAuto(); render(); });
document.getElementById("autoBtn").addEventListener("click", () => autoTimer ? stopAuto() : startAuto());
document.getElementById("speedSelect").addEventListener("change", () => { stopAuto(); render(); });
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" && current < lessons.length-1) { stopAuto(); current++; render(); }
  if (e.key === "ArrowLeft" && current > 0) { stopAuto(); current--; render(); }
});

drawAxes();
render();
