import { BodyText } from '../components/BodyText/BodyText';
import { DeveloperStory } from '../components/DeveloperStory/DeveloperStory';
import Element from '../components/Element/Element';
import Footer from '../components/Footer/Footer';
import Layout from '../components/layout';
import React from 'react';
import SEO from '../components/seo';
import mainSEOtags from '../content/seo/mainSEOtags';
import stories from '../content/pages/stories';

const Companies = () => (
  <Layout>
    <SEO
      lang="fi"
      title="Yritysesittelyt | Full Stack Open 2019"
      description="Kurssin yhteistyöyritysten devaajat esittäytyvät"
      keywords={[
        ...mainSEOtags,
        'houston',
        'houston inc',
        'sovelluskehitys',
        'frontend',
        'elisa',
        'terveystalo',
        'konecranes',
        'k-ryhmä',
        'unity technologies',
        'unity',
        'kesko',
        'sympa',
        'funktionaalinen ohjelmointi',
        'functional programming',
        'mikropalveluarkkitehtuuri',
        'micro service architecture',
        'micro service',
      ]}
    />

    <Element className="container">
      <BodyText
        className="col-10 spacing"
        heading={{
          title: 'Devaaja-tarinoita yhteistyökumppaneiltamme',
          level: 'h1',
        }}
      />

      {stories.fi.map(story => (
        <DeveloperStory key={story.name} {...story} lang="fi" />
      ))}

      <Element className="spacing" />
    </Element>

    <Footer lang="fi" />
  </Layout>
);

export default Companies;
