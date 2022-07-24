export const isPersistedState = stateName => {
    const sessionState = sessionStorage.getItem(stateName);
    if (!sessionState) return;
    return sessionState && JSON.parse(sessionState);
  };