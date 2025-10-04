

// JSON-LD Structured Data for SEO
document.addEventListener('DOMContentLoaded', function() {
  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Divyanshu Shekhar",
    "jobTitle": "Machine Learning Engineer",
    "description": "ML Engineer with 7+ years building AI systems for Fortune 500 companies. Expert in generative models, ML infrastructure, and AI product development.",
    "url": "https://www.divyanshus.com",
    "sameAs": [
      "https://www.linkedin.com/in/divyanshushekhar16/",
      "https://github.com/divyanshu16/"
    ],
    "knowsAbout": [
      "Machine Learning",
      "Artificial Intelligence",
      "Generative Models",
      "ML Infrastructure",
      "Data Engineering",
      "Reinforcement Learning",
      "AI Product Development",
      "MLOps"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Various Fortune 500 Companies"
    }
  };

  // Professional Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AI & ML Consulting Services",
    "description": "End-to-end AI product development and ML engineering consulting services",
    "provider": {
      "@type": "Person",
      "name": "Divyanshu Shekhar"
    },
    "areaServed": "Worldwide",
    "serviceType": [
      "AI Consulting",
      "Machine Learning Engineering",
      "AI Product Development",
      "ML Infrastructure",
      "Generative AI Solutions",
      "MLOps"
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Divyanshu Shekhar - ML Engineer",
    "url": "https://www.divyanshus.com",
    "author": {
      "@type": "Person",
      "name": "Divyanshu Shekhar"
    },
    "description": "ML Engineer with 7+ years building AI systems for Fortune 500 companies"
  };

  // Insert schemas into head
  const schemas = [personSchema, serviceSchema, websiteSchema];
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
});
