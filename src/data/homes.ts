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
    area: 'La Punta | Puerto Escondido',
    blurb: 'The top of the building, with the widest view of the point.',
    beds: '[#] bedrooms',
    baths: '[#] bathrooms',
    size: '[##] m²',
    terrace: '[##] m²',
    price: '$[rate]',
    available: '[date]',
    photos: [
      P('L3 Construction.jpg'),
      P('E1D36EF6-D0F4-4BEF-9CAA-415763C225C1.jpg'),
      P('44D3F4B4-6857-4272-A030-825017C8C047.jpg'),
      P('A4AE3944-80BF-4196-9DAA-8D4706603AF2.jpg'),
      P('E48B6D29-4FB4-497A-9898-C8AC388AD993.jpg'),
    ],
  },
];
