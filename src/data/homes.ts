// Placeholder listings for the Find a Home mockup.
// Anything in [brackets] is a fact we still need to fill in.
// Photos are existing site photos used as stand-ins until unit photography exists.

export interface Home {
  slug: string;
  name: string;
  area: string;
  blurb: string;
  beds: string;
  baths: string;
  size: string;
  terrace: string;
  price: string;
  available: string;
  photos: string[];
  /** Filled for homes with real details. Missing fields fall back to placeholders. */
  guests?: string;
  about?: string[];
  highlights?: string[];
  essentials?: string[];
  moreEssentials?: string[];
  policies?: { label: string; value: string }[];
  /** Prestige Booking Channel property id. When set, the booking card sends dates to the booking page. */
  bookingPropertyId?: string;
}

const P = (f: string) => `/Edited copy/${f}`;

export const homes: Home[] = [
  {
    slug: 'l3',
    name: 'L3',
    area: 'La Punta | Puerto Escondido',
    blurb: 'A concrete and glass home with the Pacific at the far end of the room.',
    beds: '[#] bedrooms',
    baths: '[#] bathrooms',
    size: '[##] m²',
    terrace: '[##] m²',
    price: '$[rate]',
    available: '[date]',
    photos: [
      P('6AB49683-4759-4689-BC6E-898BF49E223C.jpg'),
      P('EFFFDBD2-4900-48FD-A4D5-65BEB435209A.jpg'),
      P('F23BB294-0329-4D30-B2E5-DEF3B664A8DB.jpg'),
      P('708E6A2B-32C8-4639-9E63-F7E3D8DCA9C7.jpg'),
      P('CA700DEA-BF8E-4A70-A51E-01A4D8FFF542.jpg'),
    ],
  },
  {
    slug: 'l5',
    name: 'L5',
    area: 'La Punta | Puerto Escondido',
    blurb: 'Quiet rooms, round windows, and a view of the jungle canopy.',
    beds: '[#] bedrooms',
    baths: '[#] bathrooms',
    size: '[##] m²',
    terrace: '[##] m²',
    price: '$[rate]',
    available: '[date]',
    photos: [
      P('a1a1d030-8473-40b5-a0c6-028603930528.jpg'),
      P('IMG_4884.jpg'),
      P('FF6A11D8-185B-4DC9-952F-E8B65ACDA305.jpg'),
      P('IMG_4880.jpg'),
      P('b3eb0122-9858-41f8-85c2-bd84ade72e70.jpg'),
    ],
  },
  {
    slug: 'penthouse',
    name: 'Penthouse',
    area: 'Puerto Escondido | Oaxaca',
    blurb: 'The top floor of an eight-apartment building, with a private terrace over Zicatela Bay.',
    beds: '2 bedrooms',
    baths: '2 bathrooms',
    size: '[##] m²',
    terrace: '[##] m²',
    price: 'Select dates',
    available: 'Check dates',
    guests: '4 guests',
    bookingPropertyId: '343502',
    photos: [
      '/img/placeholder-1.svg',
      '/img/placeholder-2.svg',
      '/img/placeholder-3.svg',
      '/img/placeholder-4.svg',
      '/img/placeholder-5.svg',
    ],
    about: [
      'The penthouse sits on the top floor of a building with eight apartments. It has two bedrooms, each with a king bed and air conditioning, and two bathrooms.',
      'The living area is bright and open, with a full kitchen beside it. A private terrace looks over the ocean and the whole of Zicatela Bay.',
      'Guests share a pool on the ground floor and a gym on the second floor. The apartment has Starlink internet, hot water, and a backup battery for power outages.',
      'The restaurants and beaches of La Punta are close. The street is quiet and the view across the bay is clear. [Confirm the neighborhood name. The Airbnb listing says Brisas de Zicatela.]',
    ],
    highlights: [
      'Private terrace with ocean views',
      'Two bedrooms with king beds and air conditioning',
      'Shared pool and gym in the building',
      'Starlink wifi and a backup battery',
    ],
    essentials: [
      'Fully equipped kitchen',
      'Coffee maker',
      'Dining area',
      'Wifi (Starlink)',
      'Air conditioning',
      'Hot water',
      'Living room',
      'Desk',
      'Free street parking',
    ],
    moreEssentials: ['Refrigerator and freezer', 'Oven', 'Kettle', 'Dishes and utensils', 'TV', '[Confirm the rest of the 24 amenities from the Airbnb listing]'],
    policies: [
      { label: 'Minimum stay', value: 'None set' },
      { label: 'Check in and out', value: '4 pm to midnight / by 10 am' },
      { label: 'Home rules', value: '[confirm]' },
      { label: 'Pets', value: '[confirm]' },
      { label: 'Cancellation', value: '[confirm with Juliette]' },
    ],
  },
];
