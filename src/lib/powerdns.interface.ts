import {IPowerDNSOptions} from "@marxlnfcs/powerdns";

export interface IPowerDNSModuleOptions extends IPowerDNSOptions {

    /**
     * Name of the connection
     * @default default
     */
    name?: string;

}

export interface IPowerDNSModuleAsyncOptions {

    /**
     * Name of the connection
     * @default default
     */
    name?: string;
    useFactory: (...args: any[]) => IPowerDNSOptions|Promise<IPowerDNSOptions>;
    inject?: any[];

}