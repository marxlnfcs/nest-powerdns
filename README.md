# NestJS PowerDNS Client

## This packages implements the `@marxlnfcs/powerdns` package as NestJS module.

[![npm](https://ico.y.gy/npm/dm/@marxlnfcs/nest-powerdns?style=flat-square&logo=npm)](https://www.npmjs.com/package/@marxlnfcs/nest-powerdns)
[![NPM](https://ico.y.gy/npm/l/@marxlnfcs/nest-powerdns?style=flat-square&color=brightgreen)](https://www.npmjs.com/package/@marxlnfcs/nest-powerdns)
[![Snyk Vulnerabilities for npm package](https://ico.y.gy/snyk/vulnerabilities/npm/@marxlnfcs/nest-powerdns?style=flat-square&logo=snyk)](https://snyk.io/test/npm/@marxlnfcs/nest-powerdns)
[![Website](https://ico.y.gy/website?down_color=red&down_message=offline&label=repository&up_color=success&up_message=online&url=https%3A%2F%2Fgithub.com%2Fmarxlnfcs%2Fpowerdns&style=flat-square&logo=github)](https://github.com/marxlnfcs/powerdns)

## Documentation
[@marxlnfcs/powerdns](https://github.com/marxlnfcs/powerdns)

## Installation
```
npm i @marxlnfcs/nest-powerdns @marxlnfcs/powerdns
```

## Usage
### AppModule
```
@Module({
    imports: [
        PowerDNSModule.forRoot({
            name: 'string', // default: "default"
            baseUrl: 'http://localhost:8081',
            apiKey: 'apikey',
        }),
        PowerDNSModule.forRootAsync({
            name: 'string', // default: "default"
            useFactory: (configService: ConfigService) => ({
                baseUrl: configService.baseUrl,
                apiKey: configService.apiKey
            }),
            inject: [ConfigService]
        })
    ]
})
export class AppModule {}

```

### AppService
```
@Injectable()
export class AppService {

    constructor(
    
        // for connections with name default name "default" only
        private pdnsService: PowerDNSService,
        private pdnsAdvancedService: PowerDNSAdvancedService,
        
        // for all connections
        @InjectPDNS('default') // name is optional. Default: "default"
        private pdnsService: PowerDNSService,
        
        @InjectPDNSAdvanced('default') // name is optional. Default: "default"
        private pdnsAdvancedService: PowerDNSAdvancedService,
        
    ){}
   
    getServers(){
        return this.pdnsAdvancedService.getServers();
    }
   
    getDomains(){
        return this.pdnsService.getDomains();
    }
   
}

```

## Options
### PowerDNS Options
| Option               | Description                                                             | Example                      | Default |
|----------------------|-------------------------------------------------------------------------|------------------------------|---------|
| baseUrl *            | URL to PowerDNS-API                                                     | http://localhost:8081/api/v1 | None    |
| apiKey *             | Apikey for the PowerDNS-API                                             | apikey                       | None    |
| timeout              | HTTP-Timeout                                                            | 5000                         | 5000    |
| proxy                | Proxy settings for the HTTP-Client. See "Proxy settings"                |                              |         |
| rejectUnauthorized   | Defines if the HTTP-Client should allow selfsigned SSL certificates     | false                        | false   |

### Proxy options
If your application needs a proxy to communicate with the PowerDNS-API, you can define it with the proxy settings.
You can either set the url or host, port and protocol.

| Option        | Description                        | Example                | Default |
|---------------|------------------------------------|------------------------|---------|
| url           | Full URL of the proxy server.      | http://localhost:8080/ | None    |
| host          | Hostname of the proxy server.      | localhost              | None    |
| port          | Port of the proxy server.          | 8080                   | None    |
| protocol      | HTTP-Protocol of the proxy server. | https                  | http    |
| auth.username | Username to authenticate with.     |                        | None    |
| auth.password | Password to authenticate with.     |                        | None    |