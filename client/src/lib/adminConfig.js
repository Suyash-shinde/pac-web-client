// Declarative config for the generic admin CRUD screens.
// `columns` = shown in the list table. `fields` = shown in the create/edit form.

export const RESOURCES = {
  events: {
    label: 'Events',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'start_at', label: 'Date', type: 'datetime' },
    ],
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'category', label: 'Category' },
      { name: 'start_at', label: 'Date & time', type: 'datetime-local' },
      { name: 'venue', label: 'Venue' },
      { name: 'map_url', label: 'Google Maps URL (Open in Maps)' },
      { name: 'image', label: 'Image URL' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'price', label: 'Price' },
      { name: 'attendance', label: 'Attendance', type: 'number' },
      { name: 'is_past', label: 'Past event', type: 'checkbox' },
    ],
  },
  blog: {
    label: 'Blog Posts',
    approvable: true,
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' },
      { key: 'published_at', label: 'Published', type: 'date' },
    ],
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'category', label: 'Category' },
      { name: 'author', label: 'Author' },
      { name: 'published_at', label: 'Published date', type: 'date' },
      { name: 'image', label: 'Image URL' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'status', label: 'Status', type: 'select', options: ['pending', 'approved'] },
    ],
  },
  creators: {
    label: 'Creators',
    approvable: true,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'kind', label: 'Kind' },
      { key: 'specialty', label: 'Specialty' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'kind', label: 'Kind', type: 'select', options: ['creator', 'cosplayer'] },
      { name: 'specialty', label: 'Specialty' },
      { name: 'level', label: 'Level (cosplayers)' },
      { name: 'commissions', label: 'Commissions', type: 'select', options: ['', 'Open', 'Closed'] },
      { name: 'avatar', label: 'Avatar URL' },
      { name: 'cover', label: 'Cover URL' },
      { name: 'bio', label: 'Bio', type: 'textarea' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: ['pending', 'approved'] },
    ],
  },
  products: {
    label: 'Products',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price' },
    ],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'category', label: 'Category' },
      { name: 'price', label: 'Price (e.g. ₹699)' },
      { name: 'image', label: 'Image URL' },
      { name: 'tag', label: 'Tag (e.g. Best Seller)' },
    ],
  },
}

export const RESOURCE_KEYS = Object.keys(RESOURCES)
