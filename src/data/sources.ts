import { FactCheckNote, SourceRecord } from '../types/space';

export const RESEARCH_REPORT_URL =
  '/assets/aistudio/RE-SPACE_Research_Report_8b2019bc.pdf';

export const SOURCES: SourceRecord[] = [
  {
    id: 'src-respace-report',
    title: 'RE:SPACE: Verified Inventory of Human Artifacts on the Moon and Mars (1958–2026)',
    authorOrOrg: 'RE:SPACE Research Compilation',
    publicationDate: '2026',
    documentType: 'Research Report',
    relatedBody: 'Both',
    relatedMissions: ['All documented Moon and Mars surface missions (1958–2026)'],
    url: RESEARCH_REPORT_URL,
    isLocalAsset: true,
    citationTag: 'Primary Project Dossier',
    description:
      'Primary project reference compiling verified NASA, NSSDCA, LROC, JPL, CNSA, ISRO, ESA, and Roscosmos records, artifact taxonomy, uncertainty flags, and presentation fact-checks.'
  },
  {
    id: 'src-lroc-coords',
    title: 'NASA Lunar Reconnaissance Orbiter Camera (LROC) Spacecraft Related Coordinates',
    authorOrOrg: 'NASA / Arizona State University (LROC)',
    publicationDate: '2016',
    documentType: 'Coordinate Catalog',
    relatedBody: 'Moon',
    relatedMissions: [
      'Apollo 11',
      'Apollo 12',
      'Apollo 14',
      'Apollo 15',
      'Apollo 16',
      'Apollo 17',
      'Luna 17',
      'Luna 21'
    ],
    url: 'https://www.lroc.asu.edu/',
    citationTag: '20†L83-L91 · 31†L81-L90',
    description:
      'High-resolution orbital imaging survey providing precise planetocentric coordinates for Apollo Lunar Module descent stages, ALSEP experiments, Lunar Roving Vehicles, and Soviet hardware.'
  },
  {
    id: 'src-nssdca-impacts',
    title: 'NASA NSSDCA Table of Anthropogenic Impacts and Spacecraft on the Moon',
    authorOrOrg: 'NASA Space Science Data Coordinated Archive (NSSDCA)',
    publicationDate: '2022',
    documentType: 'Coordinate Catalog',
    relatedBody: 'Moon',
    relatedMissions: [
      'Luna 2',
      'Luna 9',
      'Luna 13',
      'Luna 16',
      'Luna 20',
      'Luna 23',
      'Luna 24',
      'Luna 25',
      'Ranger 4–9',
      'Surveyor 1–7',
      'LCROSS',
      'GRAIL',
      'Chang’e 1–5',
      'Chandrayaan-1'
    ],
    url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_impacts.html',
    citationTag: '30†L23-L63 · 57†L162-L206',
    description:
      'Authoritative catalog of confirmed lunar soft landings, hard impactors, spent rocket stages, and end-of-mission orbiter impacts with tabulated planetocentric latitudes and longitudes.'
  },
  {
    id: 'src-lroc-change4',
    title: 'LROC Release: Chang’e-4 Far-Side Landing Site & Yutu-2 Rover Coordinates',
    authorOrOrg: 'NASA / ASU LROC',
    publicationDate: '2019',
    documentType: 'Official Agency Release',
    relatedBody: 'Moon',
    relatedMissions: ['Chang’e 4'],
    url: 'https://www.lroc.asu.edu/images',
    citationTag: '39†L39-L43 · 57†L187-L190',
    description:
      'Orbital imaging verification of China’s Chang’e-4 lander (45.4561°S, 177.5885°E) and Yutu-2 rover (45.4600°S, 177.5900°E, ±20 m reported accuracy) in Von Kármán Crater.'
  },
  {
    id: 'src-lroc-change5',
    title: 'LROC Release: Chang’e-5 Landing Site & Ascent Stage Impact',
    authorOrOrg: 'NASA / ASU LROC',
    publicationDate: '2020',
    documentType: 'Official Agency Release',
    relatedBody: 'Moon',
    relatedMissions: ['Chang’e 5'],
    url: 'https://www.lroc.asu.edu/images',
    citationTag: '41†L37-L39 · 57†L197-L200',
    description:
      'Documentation confirming Chang’e-5 soft landing in Oceanus Procellarum/Northern Mons Rümker region (43.0576°N, 308.0839°E), sample return, and subsequent ascent stage impact (30°S, 0°E).'
  },
  {
    id: 'src-nasa-chandrayaan2',
    title: 'NASA Science / LROC: Chandrayaan-2 Vikram Lander Impact Site Identification',
    authorOrOrg: 'NASA Science / LROC',
    publicationDate: '2019-12',
    documentType: 'Official Agency Release',
    relatedBody: 'Moon',
    relatedMissions: ['Chandrayaan-2'],
    url: 'https://science.nasa.gov/moon/',
    citationTag: '43†L343-L347 · 57†L195-L196',
    description:
      'Before-and-after LRO mosaic identifying the Chandrayaan-2 Vikram impact crater and scattered debris field at 70.8810°S, 22.7840°E following the September 2019 descent failure.'
  },
  {
    id: 'src-lroc-chandrayaan3',
    title: 'LROC / ISRO Verification: Chandrayaan-3 Vikram Lander & Pragyan Rover',
    authorOrOrg: 'NASA LROC / ISRO',
    publicationDate: '2023-08',
    documentType: 'Official Agency Release',
    relatedBody: 'Moon',
    relatedMissions: ['Chandrayaan-3'],
    url: 'https://www.isro.gov.in/',
    citationTag: '45†L42-L45',
    description:
      'Confirmation and coordinates (69.3741°S, 32.32°E) for India’s successful Chandrayaan-3 lunar south polar landing and Pragyan rover deployment in August 2023.'
  },
  {
    id: 'src-jpl-mars2020',
    title: 'NASA / JPL Mars 2020 Perseverance Landing Press Kit (Jezero Crater)',
    authorOrOrg: 'NASA Jet Propulsion Laboratory (JPL)',
    publicationDate: '2021-02',
    documentType: 'Mission Press Kit',
    relatedBody: 'Mars',
    relatedMissions: ['Mars 2020 (Perseverance & Ingenuity)'],
    url: 'https://mars.nasa.gov/mars2020/',
    citationTag: '60†L66-L69',
    description:
      'Official JPL press kit documenting Jezero Crater landing (~18°N, 77°E), sky-crane descent hardware, Ingenuity helicopter deployment, and rock core sample caching.'
  },
  {
    id: 'src-mars-missions-jpl',
    title: 'NASA / JPL Mars Surface Missions & HiRISE Orbital Imaging Archives',
    authorOrOrg: 'NASA / JPL / University of Arizona HiRISE',
    publicationDate: '2024',
    documentType: 'Scientific Summary',
    relatedBody: 'Mars',
    relatedMissions: [
      'Viking 1',
      'Viking 2',
      'Mars Pathfinder',
      'MER Spirit',
      'MER Opportunity',
      'Phoenix',
      'InSight'
    ],
    url: 'https://mars.nasa.gov/',
    citationTag: 'Mars Inventory · Page 3–4',
    description:
      'Official NASA/JPL mission logs and MRO HiRISE orbital imagery confirming stationary landers, rovers, parachutes, heat shields, and backshells on Mars.'
  },
  {
    id: 'src-bradbury-ref',
    title: 'Bradbury Landing Reference (Curiosity / MSL Coordinates & Hardware)',
    authorOrOrg: 'NASA/JPL via Bradbury Landing Reference',
    publicationDate: '2012',
    documentType: 'Scientific Summary',
    relatedBody: 'Mars',
    relatedMissions: ['Mars Science Laboratory (Curiosity)'],
    url: 'https://mars.nasa.gov/msl/home/',
    citationTag: '54†L133-L136',
    description:
      'Reference record for Curiosity touchdown at Bradbury Landing (4.5895°S, 137.4417°E) in Gale Crater, noting sky-crane and parachute lying ~615 m from the lander.'
  },
  {
    id: 'src-mars3-esa',
    title: 'Soviet Mars 3 & ESA/Roscosmos ExoMars Schiaparelli Surface Records',
    authorOrOrg: 'NASA NSSDCA / ESA / MRO',
    publicationDate: '2016',
    documentType: 'Official Agency Release',
    relatedBody: 'Mars',
    relatedMissions: ['Mars 3', 'Mars 2', 'ExoMars Schiaparelli'],
    url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars',
    citationTag: '46†L1-L3 · Mars Inventory Page 4',
    description:
      'Documented surface coordinates for Mars 3 (-45.00°, -158.00°, Terra Sirenum) and MRO-imaged debris field of the 2016 Schiaparelli EDM crash near 2.9°S, 6.1°E.'
  }
];

export const FACT_CHECK_NOTES: FactCheckNote[] = [
  {
    id: 'fc-chandrayaan2',
    subject: 'Chandrayaan-2 Vikram Lander (Sept 2019)',
    claimReviewed: 'Presentation brief slides suggested a successful landing.',
    verifiedFinding:
      'Vikram crashed on descent on Sept 6, 2019. NASA LROC imagery identified its impact crater and debris field at 70.8810°S, 22.7840°E. No intact surface artifacts remain.',
    citationRef: '43†L343-L347 · 57†L195-L196',
    status: 'Corrected'
  },
  {
    id: 'fc-luna25',
    subject: 'Luna 25 (Aug 2023)',
    claimReviewed: 'Brief cited Luna 25 as a successful landing.',
    verifiedFinding:
      'False: Luna 25 crashed on 19 Aug 2023 per Roscosmos and NASA NSSDCA data (impact at 57.865°S, 61.36°E), yielding no intact surface hardware.',
    citationRef: '57†L203-L206',
    status: 'Corrected'
  },
  {
    id: 'fc-change45',
    subject: 'Chang’e-4 & Chang’e-5 Status',
    claimReviewed: 'Brief listed Chang’e-4/5 as upcoming or omitted outcomes.',
    verifiedFinding:
      'Chang’e-4 safely landed on the lunar far side on 3 Jan 2019 and Chang’e-5 landed and returned samples on 1 Dec 2020. Chang’e-6–8 are noted as planned/future in the reference cutoff.',
    citationRef: '39†L39-L43 · 41†L37-L39',
    status: 'Corrected'
  },
  {
    id: 'fc-artemis',
    subject: 'Artemis II & Artemis III',
    claimReviewed: 'Any claim that Artemis II landed on the Moon.',
    verifiedFinding:
      'Artemis II was a crewed cislunar flyby mission, not a lunar landing; Artemis III is planned. Neither has left surface artifacts as of the research report cutoff.',
    citationRef: 'Fact-Check Page 5',
    status: 'Corrected'
  },
  {
    id: 'fc-surveyor-count',
    subject: 'Surveyor Lander Count',
    claimReviewed: 'Claims stating 8 Surveyor landers were placed on the Moon.',
    verifiedFinding:
      'NASA records exactly 5 successful Surveyor soft landings (Surveyors 1, 3, 5, 6, 7). Surveyors 2 and 4 crashed on impact (7 total missions).',
    citationRef: '30†L59-L63',
    status: 'Corrected'
  },
  {
    id: 'fc-mars-crewed',
    subject: 'Crewed Mars & ExoMars Status',
    claimReviewed: 'Implied human missions or ExoMars surface operations.',
    verifiedFinding:
      'No human-footed mission has reached Mars (crewed landings remain future policy). ExoMars Schiaparelli crashed in Oct 2016; only the ExoMars Trace Gas Orbiter (TGO) is operational in orbit (excluded from surface artifacts).',
    citationRef: 'Fact-Check Page 5',
    status: 'Confirmed'
  },
  {
    id: 'fc-missing-coords',
    subject: 'Unpublished Coordinate Sets & Discrepancies',
    claimReviewed: 'Estimating missing coordinates for S-IVB, Surveyor 4, or Soviet crashes.',
    verifiedFinding:
      'Report flags missing Apollo S-IVB impact data, poorly known Surveyor 4 crash location, and unpublished public coordinates for Luna 15 and Luna 22. All unprinted coordinates are stored as null rather than guessed.',
    citationRef: '30†L59-L63 · 31†L84-L88 · 32†L147-L150',
    status: 'Flagged Uncertainty'
  },
  {
    id: 'fc-chandrayaan1-overlap',
    subject: 'Chandrayaan-1 Impact Coordinate Overlap',
    claimReviewed: 'Report Page 3 lists two impact coordinate pairs under Chandrayaan-1.',
    verifiedFinding:
      'Page 3 cites Chandrayaan-1 orbiter impact at 1.5°S, 52.36°E [57†L169-L172] and Chandrayaan-1 MIP at 89°S, 330°E [57†L162-L170] (matching Chang’e-1’s printed 89°S, 330°E). Both are preserved and explicitly flagged.',
    citationRef: '57†L162-L172',
    status: 'Flagged Uncertainty'
  }
];
