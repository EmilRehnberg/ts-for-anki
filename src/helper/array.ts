export function concat<T>(head: T[], elem: T): T[] {
  return head.concat(elem);
}

export function findMatches(array: string[], pattern: string): string[] {
  var matcherRegexp = new RegExp(pattern);
  return array.filter(elem => elem.match(matcherRegexp));
}

export function insertSeparators(
  elements: string[],
  sepClosure: () => any
): string[] {
  for (var i = elements.length - 1; i--; ) {
    elements.splice(i + 1, 0, sepClosure());
  }
  return elements;
}

export function onlyUnique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}

export function rmElements<T>(elements: T[], toDiff: T[]): T[] {
  return elements.filter(elem => toDiff.indexOf(elem) == -1);
}
