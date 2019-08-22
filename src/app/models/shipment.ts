import {AddressFrom} from "./address-from"
import {AddressTo} from "./address-to"
import {Parcels} from "./parcels"

export class Shipment {
    address_from: AddressFrom;
    address_to:AddressTo;
    parcels:Parcels;
}
