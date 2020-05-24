export class TapCalculator {
  private resetTapTimeoutId: number = 0;
  private tapTimes: number[] = [];

  tap(): number | null {
    if (this.resetTapTimeoutId) {
      clearTimeout(this.resetTapTimeoutId);
    }

    this.resetTapTimeoutId = window.setTimeout(() => {
      this.tapTimes = [];
    }, 2000);

    this.tapTimes.push(Date.now());
    if (this.tapTimes.length < 2) {
      return null;
    }

    const timesBetweenTaps = [];
    for (let i = 1; i < this.tapTimes.length; i++) {
      timesBetweenTaps.push(this.tapTimes[i] - this.tapTimes[i-1]);
    }

    const tapTimesSum = timesBetweenTaps.reduce((currentTime, previousTime) => currentTime + previousTime, 0);
    const averageTapInterval = tapTimesSum / timesBetweenTaps.length;
    return Math.round(60000 / averageTapInterval);
  }
}
