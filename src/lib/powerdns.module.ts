import {DynamicModule, Module, Provider} from "@nestjs/common";
import {IPowerDNSModuleAsyncOptions, IPowerDNSModuleOptions} from "./powerdns.interface";
import {getInjectionToken} from "./powerdns.functions";
import {PowerDNSAdvancedService, PowerDNSService} from "./powerdns.service";

const POWERDNS_OPTIONS = Symbol('pdns-options');

@Module({})
export class PowerDNSModule{

    /**
     * Create powerdns connector
     * @param options
     */
    static forRoot(options: IPowerDNSModuleOptions): DynamicModule {
        return this.forRootAsync({
            name: options.name || 'default',
            useFactory: () => options,
        });
    }

    /**
     * Create powerdns connector async
     * @param options
     */
    static forRootAsync(options: IPowerDNSModuleAsyncOptions): DynamicModule {

        // create providers
        const p = this.createProviders(options.name || 'default', options);

        // create module
        return {
            module: PowerDNSModule,
            providers: [ ...p.internalProviders, ...p.providers ],
            exports: p.providers
        }

    }

    /**
     * Creates all necessary providers
     * @param name
     * @param options
     * @private
     */
    private static createProviders(name: string = 'default', options: IPowerDNSModuleAsyncOptions): { internalProviders: Provider[], providers: Provider[] } {

        // create array for providers
        const internalProviders: Provider[] = [];
        const providers: Provider[] = [];

        // create inject token for options
        internalProviders.push({
            provide: POWERDNS_OPTIONS,
            useFactory: async (...args: any[]) => await options.useFactory(...args),
            inject: options.inject || []
        });

        // add default providers
        if(name === 'default'){
            providers.push({
                provide: PowerDNSService,
                useFactory: (options: IPowerDNSModuleOptions) => new PowerDNSService(options),
                inject: [POWERDNS_OPTIONS]
            });
            providers.push({
                provide: PowerDNSAdvancedService,
                useFactory: (options: IPowerDNSModuleOptions) => new PowerDNSAdvancedService(options),
                inject: [POWERDNS_OPTIONS]
            });
        }

        // add injection tokens
        providers.push({
            provide: getInjectionToken(name, 'simple'),
            useFactory: (options: IPowerDNSModuleOptions) => new PowerDNSService(options),
            inject: [POWERDNS_OPTIONS]
        });
        providers.push({
            provide: getInjectionToken(name, 'advanced'),
            useFactory: (options: IPowerDNSModuleOptions) => new PowerDNSAdvancedService(options),
            inject: [POWERDNS_OPTIONS]
        });

        // return providers
        return {
            internalProviders, providers
        };

    }

}