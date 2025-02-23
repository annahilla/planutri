export const hasEnoughTimePassed = () => {
    const lastDismissed = localStorage.getItem("lastDismissedTime");
    if (!lastDismissed) return true;

    const hoursPassed =
      (Date.now() - parseInt(lastDismissed, 10)) / (1000 * 60 * 60);
    return hoursPassed >= 4;
  };