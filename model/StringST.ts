export default interface StringST<Value> {
    put(key: string, value: Value): void
    get(key: string): Value | null
    delete(key: string): void
    contains(key: string): boolean
    isEmpty(): boolean
    longestPrefixOf(s: string): Iterable<string>
    keysWithPrefix(s: string): Iterable<string>
    keysThatMatch(s: string): Iterable<string>
    size(): number
    keys(): Iterable<string>
}