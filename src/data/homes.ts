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
  maxGuests?: number;
  alts?: string[];
  /** Photo positions (0 based) for the preview mosaic. The first is the large tile. */
  mosaic?: number[];
  sleeping?: { name: string; bed: string; photo?: string }[];
  /** Guest rating shown on the page and where it comes from. */
  rating?: { score: string; count: number; source: string; scores: string; mentions: string[] };
  notIncluded?: string[];
  /** Approximate pin for the map. */
  lat?: number;
  lng?: number;
  about?: string[];
  highlights?: string[];
  essentials?: string[];
  moreEssentials?: string[];
  policies?: { label: string; value: string }[];
  /** Prestige Booking Channel property id. When set, the booking card sends dates to the booking page. */
  bookingPropertyId?: string;
  /** Room id in the booking system. When set, the page shows a live availability calendar. */
  bookingRoomId?: string;
}

const P = (f: string) => `/Edited copy/${f}`;

export const homes: Home[] = [
  {
    slug: 'l3',
    name: 'L3',
    area: 'Puerto Escondido | Oaxaca',
    blurb: 'A loft with ocean views, a few minutes from La Punta.',
    beds: '1 bedroom',
    baths: '1 bathroom',
    size: '[##] m²',
    terrace: '[##] m²',
    price: 'Select dates',
    available: 'Check dates',
    guests: '2 guests',
    maxGuests: 2,
    bookingPropertyId: '343502',
    bookingRoomId: '709439',
    // Stand-in photos until the L3 photography is added.
    photos: ['/img/ph-1.jpg', '/img/ph-2.jpg', '/img/ph-3.jpg'],
    about: [
      'L3 is a loft with a king bed, one bathroom, and a view of the ocean. The design is contemporary and made for quiet.',
      'It is a few minutes from La Punta and close to the Zicatela Market, so the cafes, surf, and sunsets are an easy walk or ride away.',
      'The building has a shared pool. The loft has a kitchen, wifi, and a desk for working.',
      'The Airbnb listing for L3 is new and still short. [Add detail on the light, the layout, and what is included once L3 photography is ready.]',
    ],
    highlights: [
      'Ocean views',
      'King bed for two guests',
      'Shared pool in the building',
      'A desk and fast wifi for working',
    ],
    essentials: ['Kitchen', 'Wifi', 'Desk', 'Free street parking', 'Pool', 'Air conditioning', 'Living room', 'Dining area', 'Coffee maker'],
    moreEssentials: ['Refrigerator and freezer', 'Oven', 'Kettle', 'Dishes and utensils', 'TV', '[Confirm the rest of the 32 amenities from the Airbnb listing]'],
    policies: [
      { label: 'Minimum stay', value: 'None set' },
      { label: 'Check in and out', value: '4 pm to midnight / by 10 am' },
      { label: 'Home rules', value: '[confirm]' },
      { label: 'Pets', value: '[confirm]' },
      { label: 'Cancellation', value: '[confirm with Juliette]' },
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
    area: 'Brisas de Zicatela | Puerto Escondido',
    blurb: 'The top floor of an eight-apartment building, with a private terrace over Zicatela Bay.',
    beds: '2 bedrooms',
    baths: '2 bathrooms',
    size: '',
    terrace: '',
    price: 'Select dates',
    available: 'Check dates',
    guests: '4 guests',
    maxGuests: 4,
    bookingPropertyId: '343502',
    bookingRoomId: '709444',
    lat: 15.8442,
    lng: -97.0418,
    // The eight photos on the Airbnb listing, in the order Airbnb shows them.
    // The mosaic matches Airbnb's: living room, bedroom, terrace, stair, roof.
    mosaic: [0, 2, 4, 3, 5],
    photos: [
      '/img/penthouse/airbnb-1.jpg',
      '/img/penthouse/airbnb-2.jpg',
      '/img/penthouse/airbnb-3.jpg',
      '/img/penthouse/airbnb-4.jpg',
      '/img/penthouse/airbnb-5.jpg',
      '/img/penthouse/airbnb-6.jpg',
      '/img/penthouse/airbnb-7.jpg',
      '/img/penthouse/airbnb-8.jpg',
    ],
    alts: [
      'The living room with a curved blue sofa, a round woven rug, and a low wooden table beside a glass wall to the terrace',
      'The living room with round windows in the concrete wall and a ceiling fan',
      'Bedroom 1 with a king bed, wooden wardrobes, and a glass wall to the terrace',
      'A stair between concrete walls with vines hanging from the terraces',
      'The private terrace with large plants and a view over the rooftops toward the ocean',
      'The curved concrete roof over the terrace, with trees and the town below',
      'Bedroom 1 with a wooden desk, a chair, a tall mirror, and open shelves',
      'Bedroom 2 with a king bed and a tall window',
    ],
    sleeping: [
      { name: 'Bedroom 1', bed: '1 king bed', photo: '/img/penthouse/airbnb-3.jpg' },
      { name: 'Bedroom 2', bed: '1 king bed', photo: '/img/penthouse/airbnb-8.jpg' },
    ],
    rating: {
      score: '5.0',
      count: 3,
      source: 'Airbnb',
      scores: 'Cleanliness, accuracy, check-in, communication, location, and value are all rated 5.0.',
      mentions: ['View', 'Location', 'Walkability', 'Wifi', 'Cleanliness'],
    },
    about: [
      'The penthouse is a spacious two-bedroom, two-bathroom apartment just steps from the lively part of town, with wide views of the ocean. Each bedroom has a king bed and air conditioning.',
      'The living area is bright and open, with a fully equipped kitchen beside it. A private terrace looks out over the ocean and the whole of Zicatela Bay.',
      'It sits on the top floor of a building with only eight apartments. Guests share a swimming pool on the ground floor and a gym on the second floor.',
      'The apartment has Starlink internet, hot water, and a backup battery for power outages in the area.',
      'It suits guests who want to be close to the restaurants, beaches, and energy of La Punta, in a quieter area with an open view across the bay.',
    ],
    highlights: [
      'Private terrace over Zicatela Bay',
      'Two king bedrooms with air conditioning',
      'Pool and gym in the building',
      'Starlink wifi and a backup battery',
    ],
    essentials: [
      'Kitchen',
      'Refrigerator',
      'Coffee maker and coffee',
      'Wifi',
      'Air conditioning',
      'Hot water',
      'Free street parking',
      'Pool',
      'Gym',
    ],
    moreEssentials: [
      'Hair dryer',
      'Shampoo',
      'Body soap',
      'Shower gel',
      'Towels, bed sheets, soap, and toilet paper',
      'Hangers',
      'Bed linens',
      'Room-darkening shades',
      'Clothing storage',
      'Private entrance',
      'Exterior security cameras at the entrances and common areas',
      'Smoke alarm',
      'Carbon monoxide alarm',
      'Smoking allowed',
    ],
    notIncluded: ['TV', 'Washer', 'Heating'],
    policies: [
      { label: 'Guests', value: '4 guests maximum' },
      { label: 'Check in and out', value: 'Check in after 3 pm [Prestige says 4 pm, confirm] / check out by 10 am' },
      { label: 'Pets', value: 'No pets' },
      { label: 'Cancellation', value: 'Free until 30 days before check in. Partial refund until 7 days before. [Airbnb policy, confirm for direct bookings]' },
      { label: 'Minimum stay', value: 'None set' },
    ],
  },
];
