export class Shipment {
    address_from: {
        province:string,
        city:string,
        name:string,
        zip:string,
        country:string,
        address1:string,
        company:string,
        address2:string,
        phone:string,
        email:string,
        reference:string
        }; 
        parcels: [{
          weight:number,
          distance_unit:string,
          mass_unit:string,
          height:number,
          width:number,
          length:number
        }];
        address_to: {
          province:string,
          city:string,
          name: string,
          zip: string,
          country:string,
          address1: string,
          company: string,
          address2: string,
          phone: string,
          email: string,
          reference:string,
          contents:string
        }
    }