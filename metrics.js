let metrics = {};

class Metrics {
  metrics;

  constructor() {
    this.metrics = {};
  }

  push(metric) {
    metric.name in this.metrics
      ? console.log(`Updated metric value - ${metric.name}: ${metric.value}`)
      : console.log(`New metric added - ${metric.name}: ${metric.value}`);

    this.metrics[metric.name] = metric.value;
  }

  get(name) {
    return this.metrics[name];
  }

  reset() {
    this.metrics = {};
  }
}

module.exports = Metrics;
