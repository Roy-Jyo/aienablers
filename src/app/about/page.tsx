import AboutSection from '@/components/AboutSection';

export const metadata = {
  title: 'About AI Enablers RaaS | Intelligent Recruitment Automation',
  description:
    'Learn about AI Enablers RaaS — an AI-driven recruitment platform revolutionising hiring efficiency across Australia through NLP, automation, and adaptive learning.',
  openGraph: {
    title: 'About AI Enablers RaaS | Intelligent Recruitment Automation',
    description:
      'Discover how AI Enablers RaaS is transforming recruitment through automation, analytics, and adaptive AI — empowering smarter, faster, fairer hiring.',
    url: 'https://www.aienablers.io/about',
    siteName: 'AI Enablers RaaS',
    images: [
      {
        url: 'https://www.aienablers.io/og-image.jpg', // 🔹 replace if you have a brand image
        width: 1200,
        height: 630,
        alt: 'AI Enablers RaaS – AI Recruitment Platform',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AI Enablers RaaS',
    description:
      'AI-driven Recruitment-as-a-Service delivering scalable, efficient, and fair hiring solutions.',
    images: ['https://www.aienablers.io/og-image.jpg'], // optional
  },
};

export default function AboutPage() {
  return <AboutSection />;
}

