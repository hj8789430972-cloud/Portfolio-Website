export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  let interval: ReturnType<typeof setInterval> | null = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91 && interval) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    if (interval) clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          if (interval) clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
