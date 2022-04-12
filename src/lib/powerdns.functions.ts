/**
 * Returns the injection token for the provided connection
 * @param name
 * @param type
 * @internal
 */
export function getInjectionToken(name: string = 'default', type: 'simple'|'advanced'): string {
    return type === 'simple'
        ? `pdns_client_${name}`
        : `pdns_client_advanced_${name}`;
}