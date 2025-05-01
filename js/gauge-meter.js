var opts = {
  angle: -0.29,
  lineWidth: 0.2,
  radiusScale: 1,
  pointer: {
    length: 0.31,
    strokeWidth: 0.02,
    color: "#FF553C",
  },
  limitMax: false, // If false, max value increases automatically if value > maxValue
  limitMin: false, // If true, the min value of the gauge will be fixed
  colorStart: "#FF553C",
  colorStop: "#FF553C",
  strokeColor: "#F6F6F6",
  generateGradient: true,
  highDpiSupport: true,
};
var target = document.getElementById("meter"); // your canvas element
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 100; // set max gauge value
gauge.setMinValue(0);
gauge.animationSpeed = 32; // set animation speed
gauge.setTextField(document.getElementById("meter-value"));
const initialValue = parseInt(target.getAttribute("data-value"), 10) || 0;
const redirectUrl = target.getAttribute("data-redirect");
updateGauge(initialValue, redirectUrl);
function updateGauge(value, redirectUrl) {
  gauge.set(value);
  document.getElementById("meter-value").textContent = value;

  const loadingText = document.getElementById("testing-loading");
  if (redirectUrl) {
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 3500);
  }
}
