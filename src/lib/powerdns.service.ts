import {PowerDNSAdvancedClient, PowerDNSSimpleClient} from "@marxlnfcs/powerdns";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PowerDNSService extends PowerDNSSimpleClient {}

@Injectable()
export class PowerDNSAdvancedService extends PowerDNSAdvancedClient {}