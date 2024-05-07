import { FC, useId } from 'react';
import { Corporation, LocalBusiness, WithContext } from 'schema-dts';

export const url = 'https://demo.roboto.studio';

const corporation: WithContext<Corporation> = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  url: url,
  logo: '/logo.svg',
  name: 'Roboto Studio Demo',
  sameAs: [
    'https://robotostudio.co.uk',
    'https://robotostudio.com',
    'https://robotostudio.dev',
    'https://jono.design',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vernon House, Office 2039 109',
    addressLocality: 'Nottingham',
    addressRegion: 'Nottinghamshire',
    postalCode: 'NG16DQ',
    addressCountry: 'UK',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+441158821993',
      contactType: 'customer service',
      email: 'hello@roboto.studio',
      areaServed: 'UK',
      availableLanguage: ['English'],
    },
  ],
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: url,
  logo: '/logo.svg',
  name: 'Roboto Studio Demo',
  sameAs: [
    'https://twitter.com/studioroboto',
    'https://www.linkedin.com/company/roboto-studio',
  ],
  contactPoint: [
    {
      telephone: '+441158821993',
      contactType: 'customer service',
      email: 'hello@roboto.studio',
      areaServed: 'UK',
      availableLanguage: ['English'],
      '@type': 'ContactPoint',
    },
  ],
};

const localBusiness: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': url,
  url: url,
  name: 'Roboto Studio Demo',
  description: 'Hyper-performant websites, built to scale',
  telephone: '+441158821993',
  priceRange: '£3000-50000',
  sameAs: [
    'https://robotostudio.co.uk',
    'https://robotostudio.com',
    'https://robotostudio.dev',
    'https://jono.design',
  ],
  image: ['/logo.svg'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vernon House, Office 2039 109',
    addressLocality: 'Nottingham',
    addressRegion: 'Nottinghamshire',
    postalCode: 'NG16DQ',
    addressCountry: 'UK',
  },
  geo: {
    latitude: '52.9511736',
    longitude: '-1.1417345',
    '@type': 'GeoCoordinates',
  },
  potentialAction: {
    '@type': 'ReviewAction',
    name: 'potentialAction',
    target: 'https://g.page/robotostudio/review?nr',
  },
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '52.9511736',
        longitude: '-1.1417345',
      },
      geoRadius: '1000',
    },
  ],
  makesOffer: [
    {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'GBP',
        price: '£5000-30000',
      },
      itemOffered: {
        name: 'Web Design &amp; Development',
        description:
          'Hyper-performant web design &amp; development built with the latest tooling',
        '@type': 'Service',
      },
      '@type': 'Offer',
    },
    {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'GBP',
        price: '£5000-30000',
      },
      itemOffered: {
        name: 'UI/UX Design',
        description:
          'Figma designs built to the highest quality, scalable, flexible, componentised',
        '@type': 'Service',
      },
      '@type': 'Offer',
    },
    {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'GBP',
        price: '£500-10000',
      },
      itemOffered: {
        name: 'Consultancy',
        description:
          'We work alongside your development team to push the very best performance',
        '@type': 'Service',
      },
      '@type': 'Offer',
    },
    {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'GBP',
        price: '£1000-4000',
      },
      itemOffered: {
        name: 'Budget Builds',
        description: 'Blazing fast at budget rates',
        '@type': 'Service',
      },
      '@type': 'Offer',
    },
    {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'GBP',
        price: '£5000-50000',
      },
      itemOffered: {
        name: 'Web App Development',
        description:
          'Latest and greatest scalable and battle tested web applications',
        '@type': 'Service',
      },
      '@type': 'Offer',
    },
    {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'GBP',
        price: '£5000-30000',
      },
      itemOffered: {
        name: 'JAMstack Development',
        description:
          'Cutting edge Javascript, API, Markup websites and webapps',
        '@type': 'Service',
      },
      '@type': 'Offer',
    },
  ],
  openingHoursSpecification: [
    {
      opens: '09:00',
      closes: '17:30',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      validFrom: '2019-12-23',
      validThrough: '2030-01-01',
      '@type': 'OpeningHoursSpecification',
    },
  ],
};

export const ScriptLD: FC<{ json: any }> = ({ json }) => {
  const id = useId();
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};

export const JsonLDs = () => {
  return (
    <>
      <ScriptLD json={localBusiness} />
      <ScriptLD json={corporation} />
      <ScriptLD json={organization} />
    </>
  );
};
