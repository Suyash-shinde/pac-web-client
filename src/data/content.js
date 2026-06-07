// Misc content: stats, testimonials, team, values, partners, products, blog, gallery, faq

export const STATS = [
  { value: '10,000+', label: 'Community Members' },
  { value: '100+', label: 'Events Hosted' },
  { value: '500+', label: 'Cosplayers Connected' },
  { value: '50+', label: 'Collaborations' },
]

export const TESTIMONIALS = [
  {
    name: 'Sneha P.',
    role: 'Cosplayer',
    avatar: 'https://picsum.photos/seed/sneha/120/120',
    quote: 'PAC helped me meet amazing anime fans and gave me the confidence to start cosplaying.',
  },
  {
    name: 'Aditya R.',
    role: 'Artist',
    avatar: 'https://picsum.photos/seed/aditya/120/120',
    quote: 'I found my whole creative circle here. The meetups feel like coming home every time.',
  },
  {
    name: 'Fatima K.',
    role: 'Member',
    avatar: 'https://picsum.photos/seed/fatima/120/120',
    quote: 'From quiz nights to conventions, PAC events are always the highlight of my month.',
  },
]

export const TEAM = [
  { name: 'Karan M.', role: 'Founder', avatar: 'https://picsum.photos/seed/karan/240/240', group: 'Founders' },
  { name: 'Ananya S.', role: 'Co-Founder', avatar: 'https://picsum.photos/seed/ananya/240/240', group: 'Founders' },
  { name: 'Vivek T.', role: 'Events Lead', avatar: 'https://picsum.photos/seed/vivek/240/240', group: 'Event Team' },
  { name: 'Riya D.', role: 'Creative Lead', avatar: 'https://picsum.photos/seed/riya/240/240', group: 'Creative Team' },
  { name: 'Sahil J.', role: 'Community Manager', avatar: 'https://picsum.photos/seed/sahil/240/240', group: 'Admin Team' },
  { name: 'Neha G.', role: 'Volunteer Lead', avatar: 'https://picsum.photos/seed/neha/240/240', group: 'Volunteer Team' },
]

export const VALUES = [
  { title: 'Inclusivity', text: 'Everyone is welcome — every fandom, every level, every background.' },
  { title: 'Creativity', text: 'We celebrate makers, artists and performers in all forms.' },
  { title: 'Respect', text: 'A safe, kind space where people feel free to be themselves.' },
  { title: 'Collaboration', text: 'We grow by building together, not competing.' },
  { title: 'Passion', text: 'Anime brought us here; love for it keeps us going.' },
  { title: 'Safety', text: 'Clear community guidelines and an active moderation team.' },
]

export const PARTNERS = [
  'Comic Con India',
  'Crunchyroll',
  'Local Cafe Co.',
  'Pune Makers',
  'AnimeStore.in',
  'CosplayHub',
]

export const PRODUCTS = [
  { slug: 'pac-tee', name: 'PAC Logo Tee', price: '₹699', category: 'Apparel', image: 'https://picsum.photos/seed/tee/500/500', tag: 'Best Seller' },
  { slug: 'pac-hoodie', name: 'Neon Senpai Hoodie', price: '₹1,499', category: 'Apparel', image: 'https://picsum.photos/seed/hoodie/500/500', tag: 'Limited' },
  { slug: 'sticker-pack', name: 'Anime Sticker Pack', price: '₹199', category: 'Stickers', image: 'https://picsum.photos/seed/stickers/500/500' },
  { slug: 'wall-poster', name: 'Manga Panel Poster', price: '₹349', category: 'Posters', image: 'https://picsum.photos/seed/poster/500/500' },
  { slug: 'keychain', name: 'PAC Chibi Keychain', price: '₹149', category: 'Accessories', image: 'https://picsum.photos/seed/keychain/500/500' },
  { slug: 'event-band', name: 'Event Wristband', price: '₹99', category: 'Accessories', image: 'https://picsum.photos/seed/band/500/500' },
  { slug: 'wallpaper-pack', name: 'Digital Wallpaper Pack', price: '₹0', category: 'Digital', image: 'https://picsum.photos/seed/wallpaper/500/500', tag: 'Free' },
  { slug: 'art-print', name: 'Community Art Print', price: '₹299', category: 'Posters', image: 'https://picsum.photos/seed/print/500/500' },
]

export const PRODUCT_CATEGORIES = ['All', 'Apparel', 'Stickers', 'Posters', 'Accessories', 'Digital']

export const BLOG_POSTS = [
  {
    slug: 'best-anime-cafes-pune',
    title: 'Best Anime Cafes in Pune',
    category: 'Culture',
    date: '2026-05-12',
    author: 'Riya D.',
    image: 'https://picsum.photos/seed/cafe/800/450',
    excerpt: 'From themed lattes to manga shelves — our roundup of Pune spots every otaku should visit.',
    body: 'Pune has quietly become a great city for anime fans looking for a cozy spot to hang out. In this guide we walk through our favourite cafes that lean into anime culture — whether through decor, events or just a manga-friendly vibe.\n\nEach of these spots has hosted (or would happily host) a PAC meetup. Grab a friend, order something matcha, and settle in.',
  },
  {
    slug: 'beginners-guide-cosplay',
    title: "A Beginner's Guide to Cosplay",
    category: 'Cosplay',
    date: '2026-04-28',
    author: 'Isha',
    image: 'https://picsum.photos/seed/cosguide/800/450',
    excerpt: 'Thinking about your first cosplay? Here is everything we wish we knew when we started.',
    body: 'Cosplay can feel intimidating at first, but it is one of the most rewarding parts of fandom. Start with a character you love and a budget you are comfortable with.\n\nThis guide covers picking your first character, where to source materials in Pune, basic wig care, and how to feel confident at your first event.',
  },
  {
    slug: 'top-anime-of-the-season',
    title: 'Top Anime of the Season',
    category: 'Recommendations',
    date: '2026-04-10',
    author: 'Karan M.',
    image: 'https://picsum.photos/seed/season/800/450',
    excerpt: 'Our community voted — here are the shows everyone is watching this season.',
    body: 'Every season the PAC community runs a poll for the most-watched and most-loved anime. The results are in, and there are a few surprises this time around.\n\nWe break down the top five, why people love them, and where to start if you are jumping in late.',
  },
  {
    slug: 'pac-winter-recap',
    title: 'PAC Winter Carnival Recap',
    category: 'Events',
    date: '2026-01-05',
    author: 'Vivek T.',
    image: 'https://picsum.photos/seed/recap/800/450',
    excerpt: 'A look back at our biggest cosplay event yet — 320 attendees and one unforgettable stage.',
    body: 'The Winter Cosplay Carnival was our largest event to date. We had a full contest stage, an artist alley, food stalls and a photo zone that stayed busy all day.\n\nThank you to every volunteer, cosplayer and attendee who made it special. Here is the recap and a few of our favourite moments.',
  },
]

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug)

export const GALLERY_CATEGORIES = [
  'All',
  'Cosplay',
  'Meetups',
  'Conventions',
  'Workshops',
  'Music Events',
  'Community',
]

export const GALLERY = Array.from({ length: 18 }).map((_, i) => {
  const cats = ['Cosplay', 'Meetups', 'Conventions', 'Workshops', 'Music Events', 'Community']
  return {
    id: i + 1,
    category: cats[i % cats.length],
    src: `https://picsum.photos/seed/gal${i + 1}/600/${i % 3 === 0 ? 800 : 500}`,
  }
})

export const FAQS = [
  { q: 'How do I join PAC?', a: 'Hit “Join PAC” in the menu to find all our social links, then join our Discord and WhatsApp community. It is free!' },
  { q: 'Are events free?', a: 'Many meetups are free. Larger events, workshops and trips may have a small ticket fee, always listed on the event page.' },
  { q: 'Do I need to cosplay to attend?', a: 'Not at all. Cosplay is welcome but never required — come as you are.' },
  { q: 'Can I volunteer?', a: 'Yes! We always need help running events. Use the volunteer form on the Contact page.' },
  { q: 'How can brands collaborate with PAC?', a: 'Reach out via the collaboration form on the Contact page and our team will share our media kit.' },
  { q: 'Is the community safe and moderated?', a: 'Absolutely. We have clear community guidelines and an active moderation team across all platforms.' },
]

export const FAN_CLUBS = ['Naruto Fans', 'One Piece Crew', 'Genshin Community', 'JJK Sorcerers', 'K-Pop x Anime', 'Demon Slayer Corps']

export const CHALLENGES = [
  { title: 'Monthly Fanart Contest', text: 'Submit original anime fanart for a chance to be featured and win merch.' },
  { title: 'Meme Competition', text: 'The funniest anime meme each week gets pinned and rewarded.' },
  { title: 'Anime Quiz', text: 'Test your knowledge in our weekly Discord quiz with a live leaderboard.' },
  { title: 'Cosplay Challenge', text: 'Themed cosplay prompts every season — beginners welcome.' },
]
