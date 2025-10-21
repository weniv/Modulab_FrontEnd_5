function add(a: number, b?: number): number {
    // const result = a+b;
    // return result;

    if (b) {
        return a + b;
    }
    return a;
}

function add2(a: string, b?: number): string {
  return a + b;
}