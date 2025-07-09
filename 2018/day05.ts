// Key insight from Clojure: use ASCII difference to detect reactive pairs
function canReact(a: string, b: string): boolean {
  return Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;
}

function reactPolymer(input: string): string {
  const stack: string[] = [];
  
  for (const char of input) {
    const last = stack[stack.length - 1];
    if (last && canReact(last, char)) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  
  return stack.join('');
}

// Helper function to remove all instances of a character (both cases)
function removeChar(input: string, char: string): string {
  const lower = char.toLowerCase();
  const upper = char.toUpperCase();
  
  return Array.from(input)
    .filter(c => c !== lower && c !== upper)
    .join('');
}

export function day5_part1(input: string): number {
  return reactPolymer(input).length;
}

export function day5_part2(input: string): number {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let minLength = input.length;
  
  for (const char of alphabet) {
    const filtered = removeChar(input, char);
    const reacted = reactPolymer(filtered);
    minLength = Math.min(minLength, reacted.length);
  }
  
  return minLength;
}