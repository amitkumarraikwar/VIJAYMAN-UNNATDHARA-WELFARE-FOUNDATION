export const site = {
  title: 'Vijayman Unnatdhara Welfare Foundation',
  description: 'The official digital presence of Vijayman Unnatdhara Welfare Foundation in Lalitpur, Uttar Pradesh.',
  locale: 'en-IN',
  siteUrl: import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || undefined,
  nav: [
    { label: 'About', href: '/about/' },
    { label: 'Our work', href: '/our-work/' },
    { label: 'Leadership', href: '/leadership/' },
    { label: 'Transparency', href: '/transparency/' },
    { label: 'Contact', href: '/contact/' }
  ],
  indexablePaths: ['', 'about/', 'mission/', 'vision/', 'our-work/', 'leadership/', 'gallery/', 'events/', 'news/', 'get-involved/', 'volunteer/', 'donate/', 'transparency/', 'reports/', 'contact/', 'faq/', 'privacy-policy/', 'terms-and-conditions/', 'disclaimer/']
};
