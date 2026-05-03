/**
 * Helper to parse comma-separated strings or JSON arrays into clean string arrays
 */
export const parseList = (raw: any): string[] => {
  if (!raw) return [];
  const result: string[] = [];

  const processItem = (item: any) => {
    if (item === null || item === undefined) return;
    
    if (typeof item === 'string') {
      let trimmed = item.trim();
      
      // If it looks like a JSON array, try parsing it
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            parsed.forEach(processItem);
            return;
          }
        } catch (e) { /* ignore and treat as string */ }
      }
      
      // Split by comma and clean up each fragment
      trimmed.split(',').forEach(fragment => {
        const clean = fragment.trim()
          .replace(/^["'\[\\]+|["'\]\\]+$/g, '') // Strip leading/trailing quotes, brackets, and backslashes
          .replace(/\\"/g, '"')               // Unescape quotes
          .replace(/^"/, '').replace(/"$/, '') // Strip one more layer of quotes if needed
          .trim();
        
        if (clean && clean !== 'null' && clean !== 'undefined') {
          result.push(clean);
        }
      });
    } else if (Array.isArray(item)) {
      item.forEach(processItem);
    } else {
      const s = String(item).trim().replace(/\\$/, '');
      if (s && s !== 'null' && s !== 'undefined') {
        result.push(s);
      }
    }
  };

  if (Array.isArray(raw)) {
    raw.forEach(processItem);
  } else {
    processItem(raw);
  }

  // Final cleanup: lowercase comparison for deduplication, keep original case for display if possible
  const seen = new Set();
  return result.filter(item => {
    const lower = item.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
};
