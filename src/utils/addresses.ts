export interface CAAddress {
    id: number;
    postalCode: string;
    city: string;
    state: string;
    fullAddress: string;
  }
  
  export const addresses: CAAddress[] = [
    { id: 1, postalCode: '90001', city: 'Los Angeles', state: 'California', fullAddress: '90001 Los Angeles, California' },
    { id: 2, postalCode: '94102', city: 'San Francisco', state: 'California', fullAddress: '94102 San Francisco, California' },
    { id: 3, postalCode: '95814', city: 'Sacramento', state: 'California', fullAddress: '95814 Sacramento, California' },
    // Puedes agregar más direcciones si lo requieres.
  ];
  