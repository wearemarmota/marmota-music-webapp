export default class Logger {
  static instancesCounter = 0;
  static isEnabled = process.env.REACT_APP_SHOW_LOGS;
  static colors = [
    "#f44336",
    "#009688",
    "#795548",
    "#e91e63",
    "#4caf50",
    "#9c27b0",
    "#8bc34a",
    "#607d8b",
    "#673ab7",
    "#cddc39",
    "#3f51b5",
    "#ffc107",
    "#00bcd4",
  ];

  constructor(source) {
    if (!Logger.isEnabled) {
      this.log = this.warn = this.error = () => {};
      return;
    }
    this.source = source;
    Logger.instancesCounter++;
    this.color = Logger.colors[this._getInstanceColorIndex()];
    this.log(`${source} logger instantiated`);
  }

  _getInstanceColorIndex() {
    let nextColorIndex = Logger.instancesCounter - 1;
    while (nextColorIndex >= Logger.colors.length) {
      nextColorIndex -= Logger.colors.length;
    }
    return nextColorIndex;
  }

  log(...rest) {
    console.log(
      `%c${this.source}:`,
      `color: ${this.color}; font-weight:bold;`,
      ...rest
    );
  }

  warn(...rest) {
    console.warn(
      `%c${this.source}:`,
      `color: ${this.color}; font-weight:bold;`,
      ...rest
    );
  }

  error(...rest) {
    console.error(
      `%c${this.source}:`,
      `color: ${this.color}; font-weight:bold;`,
      ...rest
    );
  }
}
