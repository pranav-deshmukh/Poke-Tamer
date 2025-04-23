export function exhaustiveGuard(value:never)  {
    throw new Error(`Error: Reached forbidden guard function with unexpected value, ${JSON.stringify(value)}`); 
}