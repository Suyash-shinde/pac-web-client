// Stub event data — replaced by the API in Phase 2.
// Images use picsum placeholders (seeded) so the UI looks real in dev.

export const UPCOMING_EVENTS = [
  {
    slug: 'anime-karaoke-night',
    title: 'Anime Karaoke Night',
    category: 'Music',
    date: '2026-06-14T18:00:00',
    venue: 'The Mix Cafe, Koregaon Park',
    image: 'https://picsum.photos/seed/karaoke/800/500',
    excerpt: 'Belt out your favourite openings and endings with fellow fans. Prizes for the best performance!',
    price: 'Free entry',
  },
  {
    slug: 'cosplay-meetup-summer',
    title: 'Summer Cosplay Meetup',
    category: 'Cosplay',
    date: '2026-06-21T16:00:00',
    venue: 'Pune Central, FC Road',
    image: 'https://picsum.photos/seed/cosplay1/800/500',
    excerpt: 'Bring your best summer cosplays for a photo walk, mini-contest and lots of community vibes.',
    price: '₹199',
  },
  {
    slug: 'drawing-meetup',
    title: 'Anime Drawing Meetup',
    category: 'Workshops',
    date: '2026-07-05T15:00:00',
    venue: 'Pagdandi Books, Baner',
    image: 'https://picsum.photos/seed/drawing/800/500',
    excerpt: 'Sketch together, swap techniques and learn manga-style inking from community artists.',
    price: 'Free entry',
  },
  {
    slug: 'anime-music-night',
    title: 'Anime Music Night',
    category: 'Music',
    date: '2026-07-19T19:00:00',
    venue: 'High Spirits, Koregaon Park',
    image: 'https://picsum.photos/seed/musicnight/800/500',
    excerpt: 'A live DJ set of anime OSTs, J-pop and city-pop. Dance the night away with the community.',
    price: '₹299',
  },
  {
    slug: 'manga-workshop',
    title: 'Manga Storytelling Workshop',
    category: 'Workshops',
    date: '2026-08-02T14:00:00',
    venue: 'Online (Zoom)',
    image: 'https://picsum.photos/seed/manga/800/500',
    excerpt: 'Learn paneling, pacing and character design from a published manga artist.',
    price: '₹149',
  },
  {
    slug: 'convention-trip-comiccon',
    title: 'Comic Con Trip',
    category: 'Conventions',
    date: '2026-08-23T08:00:00',
    venue: 'Mumbai (group travel from Pune)',
    image: 'https://picsum.photos/seed/comiccon/800/500',
    excerpt: 'Travel together to Comic Con with the PAC crew. Group passes, transport and after-party.',
    price: '₹1,499',
  },
]

export const PAST_EVENTS = [
  {
    slug: 'winter-cosplay-2025',
    title: 'Winter Cosplay Carnival',
    category: 'Cosplay',
    date: '2025-12-20T16:00:00',
    venue: 'Phoenix Marketcity',
    image: 'https://picsum.photos/seed/winter/800/500',
    excerpt: 'Our biggest cosplay event yet with 300+ attendees and a full contest stage.',
    attendance: 320,
  },
  {
    slug: 'anime-quiz-night-2025',
    title: 'Anime Quiz Night',
    category: 'Meetups',
    date: '2025-11-08T18:30:00',
    venue: 'Doolally Taproom',
    image: 'https://picsum.photos/seed/quiz/800/500',
    excerpt: 'Teams battled across five rounds of anime trivia. Intense, hilarious and unforgettable.',
    attendance: 90,
  },
  {
    slug: 'amv-screening-2025',
    title: 'Community AMV Screening',
    category: 'Screenings',
    date: '2025-10-12T17:00:00',
    venue: 'The Box, Aundh',
    image: 'https://picsum.photos/seed/amv/800/500',
    excerpt: 'We screened the best community-made AMVs on the big screen with an audience vote.',
    attendance: 120,
  },
  {
    slug: 'monsoon-meetup-2025',
    title: 'Monsoon Anime Meetup',
    category: 'Meetups',
    date: '2025-07-27T16:00:00',
    venue: 'German Bakery, KP',
    image: 'https://picsum.photos/seed/monsoon/800/500',
    excerpt: 'Chai, pakoras and endless anime debates on a rainy Pune afternoon.',
    attendance: 65,
  },
]

export const EVENT_CATEGORIES = [
  'All',
  'Meetups',
  'Cosplay',
  'Gaming',
  'Workshops',
  'Screenings',
  'Music',
  'Conventions',
]

export const getEventBySlug = (slug) =>
  [...UPCOMING_EVENTS, ...PAST_EVENTS].find((e) => e.slug === slug)
