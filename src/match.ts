const ago_suffix_regex = /([mhd])\s+ago\s*$/i;
const default_ago_suffix = "m ago";

export async function matcher(pattern: any): Promise<(value: any) => boolean> {
  const matchers = [];
  const transforms = [];

  if (typeof pattern === "string") {
    if (pattern.startsWith("$$")) {
      pattern = pattern.substring(2);
      transforms.push(JSON.stringify);
    }

    // Regular expression match
    if (
      (pattern.startsWith("/") && pattern.endsWith("/")) ||
      pattern.indexOf("*") !== -1
    ) {
      // Convert globs to regex
      if (!pattern.startsWith("/")) {
        pattern = pattern.replace(/\./g, ".").replace(/\*/g, ".*");
        pattern = `/^${pattern}$/`;
      }

      const regex = new RegExp(pattern.slice(1, -1));
      matchers.push((value) =>
        typeof value === "string" ? regex.test(value) : false
      );
    }

    // Convert timestamps if pattern ends with "X ago"
    const time_match = ago_suffix_regex.exec(pattern);
    if (time_match) {
      pattern = pattern.replace(time_match[0], "");
      const now = new Date().getTime();
      transforms.push((value) => {
        const updated = new Date(value).getTime();
        const diff = (now - updated) / 60000; // minutes
        const period = time_match[1];
        if (period === "h") {
          return diff / 60;
        } else if (period === "d") {
          return diff / 60 / 24;
        }
        return diff;
      });
    }

    if (pattern.startsWith("<=")) {
      const parameter = parseFloat(pattern.substring(2));
      matchers.push((value) => parseFloat(value) <= parameter);
    }
    if (pattern.startsWith(">=")) {
      const parameter = parseFloat(pattern.substring(2));
      matchers.push((value) => parseFloat(value) >= parameter);
    }
    if (pattern.startsWith("==")) {
      const parameter = parseFloat(pattern.substring(2));
      matchers.push((value) => parseFloat(value) == parameter);
    }
    if (pattern.startsWith("!=")) {
      const parameter = parseFloat(pattern.substring(2));
      matchers.push((value) => parseFloat(value) != parameter);
    }
    if (pattern.startsWith("<")) {
      const parameter = parseFloat(pattern.substring(1));
      matchers.push((value) => parseFloat(value) < parameter);
    }
    if (pattern.startsWith(">")) {
      const parameter = parseFloat(pattern.substring(1));
      matchers.push((value) => parseFloat(value) > parameter);
    }
    if (pattern.startsWith("!")) {
      const parameter = parseFloat(pattern.substring(1));
      matchers.push((value) => parseFloat(value) != parameter);
    }
    if (pattern.startsWith("=")) {
      const parameter = parseFloat(pattern.substring(1));
      matchers.push((value) => parseFloat(value) == parameter);
    }

    matchers.push((value) => pattern === value);
  }

  return (value: any) => {
    const transformed = transforms.reduce((a, x) => x(a), value);
    if (transformed === undefined) return false;
    if (transformed === null) return false;
    return matchers.some((x) => x(transformed));
  };
}
