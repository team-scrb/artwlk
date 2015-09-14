export const distance = {
  pretty: meters => {
    if (meters >= 1000) {
      const km = meters / 1000;
      if (km >= 10) return (km | 0) + ' km';

      const s = String(km);
      const dot = s.indexOf('.');
      if (dot === -1) return s + ' km';
      return s.slice(0, dot + 2) + ' km';
    }
    if (meters >= 10) {
      return (meters | 10) + ' meters';
    }
    const s = String(meters);
    const dot = s.indexOf('.');
    if (dot === -1) return s + ' meters';
    return s.slice(0, dot + 2) + ' meters';
  },
};
