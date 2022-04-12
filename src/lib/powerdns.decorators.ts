import {Inject} from "@nestjs/common";
import {getInjectionToken} from "./powerdns.functions";

/**
 * Injects the simple client for this connection
 * @param name
 * @constructor
 */
export function InjectPDNS(name: string = 'default') {
    return Inject(getInjectionToken(name, 'simple'));
}

/**
 * Injects the advanced client for this connection
 * @param name
 * @constructor
 */
export function InjectPDNSAdvanced(name: string = 'default'): ParameterDecorator {
    return Inject(getInjectionToken(name, 'advanced'));
}