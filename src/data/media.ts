import { CelestialBody, MediaItem } from '../types/space';

export const ARCHIVAL_MEDIA: MediaItem[] = [
  // =========================================================================
  // MOON — VERIFIED SURFACE & ORBITAL PHOTOGRAPHY
  // =========================================================================
  {
    id: 'media-apollo11-eagle',
    title: 'Apollo 11 LM-5 Eagle at Tranquility Base',
    url: 'https://images-assets.nasa.gov/image/KSC-as11-40-5964/KSC-as11-40-5964~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/KSC-as11-40-5964',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS11-40-5964',
    date: '1969-07-20',
    mediaClass: 'Surface Photograph',
    caption:
      'Neil Armstrong photographed Buzz Aldrin beside the Apollo 11 Lunar Module Eagle descent stage on Mare Tranquillitatis during humanity’s first lunar EVA.',
    alt: 'Astronaut Buzz Aldrin standing on the lunar surface near the gold-foil Lunar Module Eagle descent stage and U.S. flag',
    body: 'Moon',
    locationIds: ['loc-mare-tranquillitatis'],
    artifactIds: ['apollo-11-lm-descent'],
    isHeroCandidate: true
  },
  {
    id: 'media-apollo11-footpad',
    title: 'Buzz Aldrin Near Eagle Landing Footpad',
    url: 'https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as11-40-5903',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS11-40-5903',
    date: '1969-07-20',
    mediaClass: 'Surface Photograph',
    caption:
      'Close-up surface Hasselblad photograph showing Buzz Aldrin standing beside the LM-5 Eagle landing leg at Tranquility Base, reflecting the lunar horizon in his visor.',
    alt: 'Astronaut Buzz Aldrin in white Apollo spacesuit on gray lunar regolith beside the Eagle Lunar Module landing strut',
    body: 'Moon',
    locationIds: ['loc-mare-tranquillitatis'],
    artifactIds: ['apollo-11-lm-descent']
  },
  {
    id: 'media-apollo11-easep',
    title: 'EASEP Passive Seismic Experiment & Retroreflector Deployment',
    url: 'https://images-assets.nasa.gov/image/as11-40-5948/as11-40-5948~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as11-40-5948',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS11-40-5948',
    date: '1969-07-20',
    mediaClass: 'Surface Photograph',
    caption:
      'Buzz Aldrin stands beside the newly deployed Early Apollo Scientific Experiments Package (EASEP)—Passive Seismic Experiment and Laser Ranging Retroreflector—with Eagle in the background.',
    alt: 'Apollo 11 EASEP solar-paneled seismometer and retroreflector deployed on the Moon with the Eagle lander behind it',
    body: 'Moon',
    locationIds: ['loc-mare-tranquillitatis'],
    artifactIds: ['apollo-11-pse', 'apollo-11-lrrr']
  },
  {
    id: 'media-lroc-apollo-sites',
    title: 'LROC Orbital Reconnaissance of Apollo Landing Sites',
    url: 'https://images-assets.nasa.gov/image/PIA12889/PIA12889~thumb.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA12889',
    agency: 'NASA / GSFC / Arizona State University (LROC)',
    catalogId: 'PIA12889',
    date: '2009-07-17',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'Lunar Reconnaissance Orbiter Camera (LROC) Narrow Angle Camera orbital survey resolving Apollo descent stages, surface experiments, and long shadows.',
    alt: 'High-contrast grayscale orbital image of the lunar surface showing an Apollo descent stage and long shadow',
    body: 'Moon',
    locationIds: ['loc-mare-tranquillitatis'],
    artifactIds: ['apollo-11-lm-descent', 'apollo-11-pse']
  },
  {
    id: 'media-apollo12-surveyor3-dual',
    title: 'Apollo 12 Intrepid & Surveyor 3 Dual-Spacecraft View',
    url: 'https://images-assets.nasa.gov/image/AS12-48-7133/AS12-48-7133~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/AS12-48-7133',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS12-48-7133',
    date: '1969-11-20',
    mediaClass: 'Surface Photograph',
    caption:
      'Historic photograph showing two spacecraft from separate missions together on the Moon: Surveyor 3 (landed April 1967) inside Surveyor Crater and Apollo 12 LM Intrepid on the distant rim.',
    alt: 'Surveyor 3 robotic lander on a sloped crater wall with the Apollo 12 Lunar Module Intrepid visible on the horizon',
    body: 'Moon',
    locationIds: ['loc-oceanus-procellarum-apollo12'],
    artifactIds: ['apollo-12-lm-descent', 'surveyor-3'],
    isHeroCandidate: true
  },
  {
    id: 'media-apollo12-surveyor3-inspect',
    title: 'In-Situ Inspection of Surveyor 3',
    url: 'https://images-assets.nasa.gov/image/as12-48-7110/as12-48-7110~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as12-48-7110',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS12-48-7110',
    date: '1969-11-20',
    mediaClass: 'Surface Photograph',
    caption:
      'Apollo 12 surface photograph of the three-legged Surveyor 3 lander resting on the inner slope of Surveyor Crater prior to hardware retrieval.',
    alt: 'Close view of the Surveyor 3 lander with solar panel mast and soil sampler arm resting on dusty lunar crater slope',
    body: 'Moon',
    locationIds: ['loc-oceanus-procellarum-apollo12'],
    artifactIds: ['surveyor-3']
  },
  {
    id: 'media-apollo12-lroc',
    title: 'LROC Midday Survey of Oceanus Procellarum (Apollo 12)',
    url: 'https://images-assets.nasa.gov/image/PIA12922/PIA12922~small.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA12922',
    agency: 'NASA / GSFC / Arizona State University (LROC)',
    catalogId: 'PIA12922',
    date: '2009-11-04',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'Orbital view captured by NASA’s Lunar Reconnaissance Orbiter showing Intrepid’s descent stage, ALSEP station, astronaut footpath tracks, and Surveyor Crater.',
    alt: 'Orbital grayscale LROC photograph of Oceanus Procellarum showing Apollo 12 hardware and footpath trails',
    body: 'Moon',
    locationIds: ['loc-oceanus-procellarum-apollo12'],
    artifactIds: ['apollo-12-lm-descent', 'surveyor-3', 'apollo-12-alsep']
  },
  {
    id: 'media-apollo14-antares',
    title: 'Apollo 14 Lunar Module Antares at Fra Mauro',
    url: 'https://images-assets.nasa.gov/image/as14-67-9367/as14-67-9367~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as14-67-9367',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS14-67-9367',
    date: '1971-02-05',
    mediaClass: 'Surface Photograph',
    caption:
      'Apollo 14 Lunar Module Antares photographed against low-angle lunar sunlight across the Fra Mauro highlands.',
    alt: 'Apollo 14 Lunar Module silhouetted against bright solar glare on the lunar surface',
    body: 'Moon',
    locationIds: [],
    artifactIds: ['apollo-14-17-hardware']
  },
  {
    id: 'media-apollo15-lrv',
    title: 'Apollo 15 Lunar Roving Vehicle at Hadley-Apennine',
    url: 'https://images-assets.nasa.gov/image/as15-88-11901/as15-88-11901~large.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as15-88-11901',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS15-88-11901',
    date: '1971-08-01',
    mediaClass: 'Surface Photograph',
    caption:
      'The first crewed Lunar Roving Vehicle (LRV-1) parked on the lunar mare against the backdrop of the Apennine Mountains during Apollo 15.',
    alt: 'Apollo 15 Lunar Roving Vehicle with wire-mesh wheels and high-gain umbrella antenna on the Moon',
    body: 'Moon',
    locationIds: [],
    artifactIds: ['apollo-14-17-hardware']
  },
  {
    id: 'media-apollo16-descartes',
    title: 'Apollo 16 Highland Sample Collection',
    url: 'https://images-assets.nasa.gov/image/as16-114-18423/as16-114-18423~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as16-114-18423',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS16-114-18423',
    date: '1972-04-21',
    mediaClass: 'Surface Photograph',
    caption:
      'Astronaut Charles Duke sampling the Descartes Highlands during Apollo 16 EVA operations.',
    alt: 'Apollo 16 astronaut collecting lunar highland rocks beside sampling rake and gnomon',
    body: 'Moon',
    locationIds: [],
    artifactIds: ['apollo-14-17-hardware']
  },
  {
    id: 'media-apollo17-lrv',
    title: 'Apollo 17 Lunar Roving Vehicle at Taurus-Littrow',
    url: 'https://images-assets.nasa.gov/image/as17-137-20979/as17-137-20979~large.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/as17-137-20979',
    agency: 'NASA / Johnson Space Center',
    catalogId: 'AS17-137-20979',
    date: '1972-12-12',
    mediaClass: 'Surface Photograph',
    caption:
      'Detailed surface photograph of Apollo 17’s Lunar Roving Vehicle (LRV-3) parked at Taurus-Littrow Valley, where it remains on-site.',
    alt: 'Close view of the Apollo 17 Lunar Roving Vehicle on lunar dust with mountainous horizon',
    body: 'Moon',
    locationIds: [],
    artifactIds: ['apollo-14-17-hardware']
  },
  {
    id: 'media-apollo17-lroc',
    title: 'LROC Orbital Survey of Apollo 17 Site',
    url: 'https://images-assets.nasa.gov/image/PIA12920/PIA12920~small.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA12920',
    agency: 'NASA / GSFC / Arizona State University (LROC)',
    catalogId: 'PIA12920',
    date: '2009-10-28',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'LROC orbital reconnaissance resolving the Challenger descent stage, ALSEP, LRV final parking position, and double rover wheel tracks.',
    alt: 'LROC orbital image of the Taurus-Littrow valley showing the Apollo 17 descent stage and LRV tracks',
    body: 'Moon',
    locationIds: [],
    artifactIds: ['apollo-14-17-hardware']
  },
  {
    id: 'media-ranger7-mare-cognitum',
    title: 'Ranger 7 First Pre-Impact Image of Mare Cognitum',
    url: 'https://images-assets.nasa.gov/image/PIA02975/PIA02975~small.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA02975',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA02975',
    date: '1964-07-31',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'The first close-range image of the Moon transmitted by a U.S. spacecraft (Ranger 7) shortly before its deliberate impact in Mare Cognitum on July 31, 1964.',
    alt: 'Monochrome Ranger 7 descent frame showing cratered Mare Cognitum plains with fiducial reticle marks',
    body: 'Moon',
    locationIds: ['loc-mare-cognitum'],
    artifactIds: ['ranger-7-impact'],
    isHeroCandidate: true
  },
  {
    id: 'media-surveyor1-shadow',
    title: 'Surveyor 1 Shadow on Oceanus Procellarum',
    url: 'https://images-assets.nasa.gov/image/PIA02976/PIA02976~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA02976',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA02976',
    date: '1966-06-02',
    mediaClass: 'Surface Photograph',
    caption:
      'Surface television frame captured by Surveyor 1—the first United States soft landing on the Moon—casting its silhouette shadow across Oceanus Procellarum.',
    alt: 'Monochrome surface photograph from Surveyor 1 showing its long shadow stretched over cratered lunar soil',
    body: 'Moon',
    locationIds: [],
    artifactIds: ['surveyor-other-landers']
  },
  {
    id: 'media-luna9-first-surface',
    title: 'Luna 9 First Photograph From the Lunar Surface',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/First_Photo_from_the_Surface_of_the_Moon.jpg',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:First_Photo_from_the_Surface_of_the_Moon.jpg',
    agency: 'Soviet Space Program (Archive via Wikimedia Commons)',
    catalogId: 'Luna-9-1966-Panorama',
    date: '1966-02-03',
    mediaClass: 'Surface Photograph',
    caption:
      'Historical surface panorama transmitted by the Soviet Luna 9 station on February 3, 1966—the first photograph captured from the surface of another world.',
    alt: 'Black-and-white panoramic horizon of rocks and craters from Luna 9 on Oceanus Procellarum',
    body: 'Moon',
    locationIds: ['loc-oceanus-procellarum-luna9'],
    artifactIds: ['luna-9-lander'],
    isHeroCandidate: true
  },
  {
    id: 'media-lunokhod-lroc',
    title: 'LROC Orbital Verification of Soviet Lunokhod Rovers',
    url: 'https://images-assets.nasa.gov/image/PIA12967/PIA12967~small.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA12967',
    agency: 'NASA / GSFC / Arizona State University (LROC)',
    catalogId: 'PIA12967',
    date: '2010-03-17',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'LROC orbital imaging identifying Soviet Luna descent stages and Lunokhod rovers resting undisturbed on Mare Imbrium and Le Monnier Crater.',
    alt: 'LROC high-resolution grayscale orbital image marking Lunokhod rover hardware and tracks on the Moon',
    body: 'Moon',
    locationIds: ['loc-mare-imbrium-luna17', 'loc-le-monnier-luna21'],
    artifactIds: ['luna-17-lander', 'lunokhod-1', 'luna-21-lander', 'lunokhod-2'],
    isHeroCandidate: true
  },
  {
    id: 'media-change3-lroc',
    title: 'LROC View of Chang’e-3 Landing Site in Mare Imbrium',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Safe_On_The_Surface_Of_The_Moon%21_%28LROC724_-_descent_lroc1%29.png/1280px-Safe_On_The_Surface_Of_The_Moon%21_%28LROC724_-_descent_lroc1%29.png',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Safe_On_The_Surface_Of_The_Moon!_(LROC724_-_descent_lroc1).png',
    agency: 'NASA / GSFC / ASU LROC (via Wikimedia Commons)',
    catalogId: 'LROC-724-Change3',
    date: '2013-12-25',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'Lunar Reconnaissance Orbiter Camera image verifying the Chang’e-3 lander and Yutu rover in northern Mare Imbrium.',
    alt: 'LROC orbital frame showing Chang e 3 lander and Yutu rover casting shadows on Mare Imbrium',
    body: 'Moon',
    locationIds: ['loc-mare-imbrium-change3'],
    artifactIds: ['change-3-lander', 'yutu-rover'],
    isHeroCandidate: true
  },
  {
    id: 'media-change4-lroc',
    title: 'LRO Orbital Close-Up of Chang’e-4 in Von Kármán Crater',
    url: 'https://images-assets.nasa.gov/image/01_m1303619844lr_closC5A1C/01_m1303619844lr_closC5A1C~small.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/01_m1303619844lr_closC5A1C',
    agency: 'NASA / Goddard Space Flight Center / ASU LROC',
    catalogId: 'LROC-M1303619844LR',
    date: '2019-02-15',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'Orbital confirmation by NASA’s Lunar Reconnaissance Orbiter showing the Chang’e-4 lander and Yutu-2 rover inside Von Kármán Crater on the lunar far side.',
    alt: 'LRO orbital image of Von Karman Crater floor showing the tiny bright Chang e 4 lander',
    body: 'Moon',
    locationIds: ['loc-von-karman-change4'],
    artifactIds: ['change-4-lander', 'yutu-2-rover'],
    isHeroCandidate: true
  },
  {
    id: 'media-change5-surface',
    title: 'Chang’e-5 Lander Surface View Near Mons Rümker',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Chang-e-5-Lander-Flag.png/1280px-Chang-e-5-Lander-Flag.png',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Chang-e-5-Lander-Flag.png',
    agency: 'CNSA (via Wikimedia Commons)',
    catalogId: 'CNSA-CE5-Surface',
    date: '2020-12-03',
    mediaClass: 'Surface Photograph',
    caption:
      'Surface camera image transmitted from the Chang’e-5 lander in northern Oceanus Procellarum prior to ascent stage liftoff.',
    alt: 'Surface view of Chang e 5 lander deck, mechanical arm, and lunar mare horizon',
    body: 'Moon',
    locationIds: ['loc-mons-rumker-change5'],
    artifactIds: ['change-5-lander'],
    isHeroCandidate: true
  },
  {
    id: 'media-chandrayaan3-vikram',
    title: 'Chandrayaan-3 Vikram Post-Touchdown Surface Image',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Chandrayaan3-landed_%28cropped%29.jpg',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Chandrayaan3-landed_(cropped).jpg',
    agency: 'ISRO (via Wikimedia Commons)',
    catalogId: 'ISRO-CH3-LHVC-2023',
    date: '2023-08-23',
    mediaClass: 'Surface Photograph',
    caption:
      'First surface image captured by Chandrayaan-3 Vikram’s Landing Imager Camera immediately after soft-landing near the lunar south pole.',
    alt: 'Monochrome surface camera view showing Vikram lander leg, shadow, and south polar lunar regolith',
    body: 'Moon',
    locationIds: ['loc-shiv-shakti-chandrayaan3'],
    artifactIds: ['chandrayaan-3-vikram', 'chandrayaan-3-pragyan'],
    isHeroCandidate: true
  },
  {
    id: 'media-grail-concept',
    title: 'GRAIL Ebb & Flow Dual-Spacecraft Concept Illustration',
    url: 'https://images-assets.nasa.gov/image/PIA13966/PIA13966~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA13966',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA13966',
    date: '2012-03-27',
    mediaClass: 'Official Agency Illustration',
    caption:
      'Official NASA/JPL artist concept depicting the twin GRAIL Ebb and Flow spacecraft in lunar orbit prior to their December 2012 controlled impact.',
    alt: 'Artist illustration of twin GRAIL spacecraft orbiting over a cratered lunar horizon',
    body: 'Moon',
    locationIds: ['loc-grail-north-pole'],
    artifactIds: ['grail-a-impact', 'grail-b-impact']
  },

  // =========================================================================
  // MARS — VERIFIED SURFACE & ORBITAL PHOTOGRAPHY
  // =========================================================================
  {
    id: 'media-viking1-color',
    title: 'Viking Lander 1 First Color Surface Photograph (Chryse Planitia)',
    url: 'https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA00563',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA00563',
    date: '1976-07-21',
    mediaClass: 'Surface Photograph',
    caption:
      'First color panorama transmitted from the surface of Mars by Viking Lander 1 in Chryse Planitia on July 21, 1976, revealing iron-oxide regolith and salmon-tinted sky.',
    alt: 'Viking 1 color surface view of rocky reddish Martian soil and lander footpad in Chryse Planitia',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['viking-1-lander']
  },
  {
    id: 'media-viking1-deck',
    title: 'Viking Lander 1 Science Deck in Chryse Planitia',
    url: 'https://images-assets.nasa.gov/image/PIA00565/PIA00565~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA00565',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA00565',
    date: '1976-07-21',
    mediaClass: 'Surface Photograph',
    caption:
      'View across Viking Lander 1’s RTG power cover and surface deck overlooking boulder-strewn Chryse Planitia.',
    alt: 'Close surface view of Viking 1 lander deck bearing the US bicentennial emblem against Martian soil',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['viking-1-lander']
  },
  {
    id: 'media-viking2-first',
    title: 'Viking Lander 2 Touchdown View in Utopia Planitia',
    url: 'https://images-assets.nasa.gov/image/PIA00396/PIA00396~thumb.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA00396',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA00396',
    date: '1976-09-03',
    mediaClass: 'Surface Photograph',
    caption:
      'First surface photograph from Viking Lander 2 immediately after touchdown in Utopia Planitia on September 3, 1976.',
    alt: 'Monochrome first surface picture from Viking Lander 2 showing lander footpad and vesicular Martian rocks',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['viking-2-lander']
  },
  {
    id: 'media-viking2-frost',
    title: 'Seasonal Water-Ice Frost Recorded by Viking Lander 2',
    url: 'https://images-assets.nasa.gov/image/PIA00571/PIA00571~thumb.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA00571',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA00571',
    date: '1979-05-18',
    mediaClass: 'Surface Photograph',
    caption:
      'Thin bright seasonal water-ice frost coating Martian soil and rocks around Viking Lander 2 during northern Martian winter in Utopia Planitia.',
    alt: 'Viking 2 surface photograph showing white seasonal frost dusted over red rocks in Utopia Planitia',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['viking-2-lander']
  },
  {
    id: 'media-pathfinder-panorama',
    title: 'Ares Vallis Panorama From Carl Sagan Memorial Station',
    url: 'https://images-assets.nasa.gov/image/PIA01149/PIA01149~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA01149',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA01149',
    date: '1997-07-10',
    mediaClass: 'Surface Photograph',
    caption:
      '360-degree surface panorama captured from the Mars Pathfinder lander showing deflated landing airbags, solar petals, Twin Peaks horizon, and Sojourner traversing Ares Vallis.',
    alt: 'Wide Martian surface panorama showing Pathfinder solar petals, deflated airbags, and Sojourner near boulders',
    body: 'Mars',
    locationIds: ['loc-ares-vallis-pathfinder'],
    artifactIds: ['pathfinder-lander', 'sojourner-rover', 'pathfinder-debris'],
    isHeroCandidate: true
  },
  {
    id: 'media-pathfinder-sojourner-ramp',
    title: 'Sojourner Rover Touchdown onto Ares Vallis',
    url: 'https://images-assets.nasa.gov/image/PIA00623/PIA00623~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA00623',
    agency: 'NASA / Jet Propulsion Laboratory',
    catalogId: 'PIA00623',
    date: '1997-07-06',
    mediaClass: 'Surface Photograph',
    caption:
      'Six-wheeled Sojourner rover rolling off Mars Pathfinder’s egress ramp onto Ares Vallis—the first mobile vehicle to drive on Mars.',
    alt: 'Sojourner rover with all six wheels planted on Martian soil beside the Pathfinder lander ramp',
    body: 'Mars',
    locationIds: ['loc-ares-vallis-pathfinder'],
    artifactIds: ['sojourner-rover', 'pathfinder-lander']
  },
  {
    id: 'media-spirit-tracks',
    title: 'Spirit Rover Tracks on Husband Hill (Gusev Crater)',
    url: 'https://images-assets.nasa.gov/image/PIA07257/PIA07257~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA07257',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA07257',
    date: '2005-01-13',
    mediaClass: 'Surface Photograph',
    caption:
      'Rear Hazcam/Navcam view looking back along Spirit’s meandering wheel tracks climbing Husband Hill in the Columbia Hills of Gusev Crater.',
    alt: 'Meandering rover wheel tracks curving across rocky slope of Husband Hill on Mars',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['spirit-rover']
  },
  {
    id: 'media-spirit-dunes',
    title: 'El Dorado Wind-Rippled Sand Deposits Imaged by Spirit',
    url: 'https://images-assets.nasa.gov/image/PIA03274/PIA03274~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA03274',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA03274',
    date: '2006-01-04',
    mediaClass: 'Surface Photograph',
    caption:
      'True-color Pancam mosaic acquired by Spirit showing dark wind-rippled basaltic sand drifts in Gusev Crater.',
    alt: 'Rippled dark Martian sand dunes photographed by Spirit Pancam',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['spirit-rover']
  },
  {
    id: 'media-opportunity-victoria',
    title: 'Opportunity at Victoria Crater, Meridiani Planum',
    url: 'https://images-assets.nasa.gov/image/PIA08813/PIA08813~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA08813',
    agency: 'NASA / JPL-Caltech / Cornell',
    catalogId: 'PIA08813',
    date: '2006-10-06',
    mediaClass: 'Surface Photograph',
    caption:
      'Panoramic vista captured by the Opportunity rover at the scalloped rim of Victoria Crater in Meridiani Planum, revealing layered sedimentary cliffs.',
    alt: 'Opportunity Pancam panorama of Victoria Crater layered sandstone cliffs and dune-lined crater floor',
    body: 'Mars',
    locationIds: ['loc-meridiani-planum-opportunity'],
    artifactIds: ['opportunity-rover'],
    isHeroCandidate: true
  },
  {
    id: 'media-opportunity-shadow',
    title: 'Opportunity Rover Shadow on Sol 180',
    url: 'https://images-assets.nasa.gov/image/PIA06739/PIA06739~small.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA06739',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA06739',
    date: '2004-08-02',
    mediaClass: 'Surface Photograph',
    caption:
      'Opportunity’s camera mast silhouette cast onto the stratified wall of Endurance Crater during its early Meridiani Planum survey.',
    alt: 'Shadow of Opportunity rover mast and Pancam cast onto steep crater slope',
    body: 'Mars',
    locationIds: ['loc-meridiani-planum-opportunity'],
    artifactIds: ['opportunity-rover', 'opportunity-lander-debris']
  },
  {
    id: 'media-phoenix-ice',
    title: 'Phoenix Subsurface Water Ice Verification ("Dodo-Goldilocks")',
    url: 'https://images-assets.nasa.gov/image/PIA10906/PIA10906~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA10906',
    agency: 'NASA / JPL-Caltech / Univ. of Arizona / Texas A&M',
    catalogId: 'PIA10906',
    date: '2008-06-20',
    mediaClass: 'Surface Photograph',
    caption:
      'Pair of surface trench photographs from NASA’s Phoenix lander showing white chunks of Martian water ice sublimating away over four sols after excavation.',
    alt: 'Side-by-side Phoenix lander trench images showing bright white water-ice chunks vanishing after exposure',
    body: 'Mars',
    locationIds: ['loc-vastitas-borealis-phoenix'],
    artifactIds: ['phoenix-lander'],
    isHeroCandidate: true
  },
  {
    id: 'media-phoenix-deck',
    title: 'Phoenix Lander Solar Deck & Robotic Arm Camera View',
    url: 'https://images-assets.nasa.gov/image/PIA10715/PIA10715~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA10715',
    agency: 'NASA / JPL-Caltech / Univ. of Arizona',
    catalogId: 'PIA10715',
    date: '2008-05-28',
    mediaClass: 'Surface Photograph',
    caption:
      'Top-down SSI view of Phoenix’s octagonal solar arrays and thermal/chemistry deck resting on polygonal northern polar permafrost.',
    alt: 'View looking down across Phoenix circular solar array toward polygon-patterned polar Martian terrain',
    body: 'Mars',
    locationIds: ['loc-vastitas-borealis-phoenix'],
    artifactIds: ['phoenix-lander']
  },
  {
    id: 'media-curiosity-bradbury',
    title: 'Bradbury Landing Site Vista Toward Mount Sharp',
    url: 'https://images-assets.nasa.gov/image/PIA16140/PIA16140~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA16140',
    agency: 'NASA / JPL-Caltech / MSSS',
    catalogId: 'PIA16140',
    date: '2012-09-04',
    mediaClass: 'Surface Photograph',
    caption:
      'Mastcam mosaic captured from Bradbury Landing inside Gale Crater, showing ancient layered foothills rising toward Aeolis Mons (Mount Sharp).',
    alt: 'Panoramic view from Bradbury Landing across gravel-strewn Gale Crater toward layered foothills of Mount Sharp',
    body: 'Mars',
    locationIds: ['loc-gale-crater-curiosity'],
    artifactIds: ['curiosity-rover', 'curiosity-skycrane-parachute'],
    isHeroCandidate: true
  },
  {
    id: 'media-curiosity-selfie',
    title: 'Curiosity Rover Self-Portrait at Rocknest, Gale Crater',
    url: 'https://images-assets.nasa.gov/image/PIA16458/PIA16458~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA16458',
    agency: 'NASA / JPL-Caltech / MSSS',
    catalogId: 'PIA16458',
    date: '2012-12-11',
    mediaClass: 'Surface Photograph',
    caption:
      'Full MAHLI arm mosaic self-portrait of Curiosity in Gale Crater with Mount Sharp rising on the eastern horizon.',
    alt: 'Curiosity six-wheeled nuclear rover self-portrait on windblown sand with Mount Sharp behind it',
    body: 'Mars',
    locationIds: ['loc-gale-crater-curiosity'],
    artifactIds: ['curiosity-rover']
  },
  {
    id: 'media-curiosity-mountsharp',
    title: 'From Glenelg to Mount Sharp Across Gale Crater',
    url: 'https://images-assets.nasa.gov/image/PIA17064/PIA17064~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA17064',
    agency: 'NASA / JPL-Caltech / MSSS',
    catalogId: 'PIA17064',
    date: '2013-06-05',
    mediaClass: 'Surface Photograph',
    caption:
      'High-resolution Mastcam panorama capturing Curiosity’s traverse corridor toward the lower clay and sulfate units of Mount Sharp.',
    alt: 'Wide geological panorama of fractured bedrock slabs and stratified slopes of Mount Sharp',
    body: 'Mars',
    locationIds: ['loc-gale-crater-curiosity'],
    artifactIds: ['curiosity-rover']
  },
  {
    id: 'media-insight-selfie',
    title: 'InSight Lander & Deployed SEIS Seismometer in Elysium Planitia',
    url: 'https://images-assets.nasa.gov/image/PIA23203/PIA23203~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA23203',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA23203',
    date: '2019-05-06',
    mediaClass: 'Surface Photograph',
    caption:
      'InSight self-portrait showing dust-coated circular solar arrays and the white dome-shielded SEIS seismometer resting on Martian regolith in Elysium Planitia.',
    alt: 'InSight stationary lander with twin circular solar panels and white seismometer dome on smooth red soil',
    body: 'Mars',
    locationIds: ['loc-elysium-planitia-insight'],
    artifactIds: ['insight-lander'],
    isHeroCandidate: true
  },
  {
    id: 'media-insight-seis-deploy',
    title: 'First Surface Placement of the SEIS Seismometer',
    url: 'https://images-assets.nasa.gov/image/PIA22977/PIA22977~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA22977',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA22977',
    date: '2018-12-20',
    mediaClass: 'Surface Photograph',
    caption:
      'InSight’s robotic arm places the SEIS seismometer directly onto the Elysium Planitia regolith to begin recording marsquakes.',
    alt: 'InSight robotic grapple arm releasing the copper-and-gold SEIS seismometer onto red Martian soil',
    body: 'Mars',
    locationIds: ['loc-elysium-planitia-insight'],
    artifactIds: ['insight-lander']
  },
  {
    id: 'media-perseverance-skycrane',
    title: 'Sky Crane Descent View of Perseverance Touchdown',
    url: 'https://images-assets.nasa.gov/image/PIA24428/PIA24428~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA24428',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA24428',
    date: '2021-02-19',
    mediaClass: 'Surface Photograph',
    caption:
      'Iconic downward-looking frame captured by the Sky Crane descent stage as Perseverance hung from nylon tethers meters above Jezero Crater.',
    alt: 'Top-down view from the Mars 2020 Sky Crane showing Perseverance suspended by cables above rocket-plume dust rings',
    body: 'Mars',
    locationIds: ['loc-jezero-crater-perseverance'],
    artifactIds: ['perseverance-rover', 'perseverance-edl-debris'],
    isHeroCandidate: true
  },
  {
    id: 'media-perseverance-ingenuity-selfie',
    title: 'Perseverance & Ingenuity Together in Jezero Crater',
    url: 'https://images-assets.nasa.gov/image/PIA24542/PIA24542~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA24542',
    agency: 'NASA / JPL-Caltech / MSSS',
    catalogId: 'PIA24542',
    date: '2021-04-07',
    mediaClass: 'Surface Photograph',
    caption:
      'WATSON self-portrait of the Perseverance rover alongside the deployed Ingenuity Mars Helicopter on Wright Brothers Field in Jezero Crater.',
    alt: 'Perseverance rover selfie on Martian bedrock with the small Ingenuity helicopter standing four meters behind it',
    body: 'Mars',
    locationIds: ['loc-jezero-crater-perseverance'],
    artifactIds: ['perseverance-rover', 'ingenuity-helicopter']
  },
  {
    id: 'media-ingenuity-flight',
    title: 'Aerial Image Captured During Ingenuity’s Second Flight',
    url: 'https://images-assets.nasa.gov/image/PIA24592/PIA24592~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA24592',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA24592',
    date: '2021-04-22',
    mediaClass: 'Surface Photograph',
    caption:
      'First color aerial photograph captured by Ingenuity’s nadir camera from 5.2 meters altitude above Jezero Crater, showing Perseverance wheel tracks and rotor shadow.',
    alt: 'Aerial color photograph looking down at Martian sand ripples, rover tracks, and Ingenuity helicopter shadow',
    body: 'Mars',
    locationIds: ['loc-jezero-crater-perseverance'],
    artifactIds: ['ingenuity-helicopter']
  },
  {
    id: 'media-perseverance-jezero-expanse',
    title: 'Jezero Crater Floor Expanse Photographed by Perseverance',
    url: 'https://images-assets.nasa.gov/image/PIA24745/PIA24745~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA24745',
    agency: 'NASA / JPL-Caltech / ASU / MSSS',
    catalogId: 'PIA24745',
    date: '2021-07-21',
    mediaClass: 'Surface Photograph',
    caption:
      'Mastcam-Z panorama across the cratered basaltic floor and distant delta escarpments of Jezero Crater.',
    alt: 'Wide color Mastcam-Z vista across rocky Martian crater floor toward layered delta cliffs',
    body: 'Mars',
    locationIds: ['loc-jezero-crater-perseverance'],
    artifactIds: ['perseverance-rover']
  },
  {
    id: 'media-ingenuity-hardware',
    title: 'Ingenuity Rotorcraft Pre-Launch Hardware Photograph',
    url: 'https://images-assets.nasa.gov/image/PIA23882/PIA23882~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA23882',
    agency: 'NASA / JPL-Caltech',
    catalogId: 'PIA23882',
    date: '2020-04-29',
    mediaClass: 'Spacecraft Photograph',
    caption:
      'Pre-launch studio engineering photograph showing Ingenuity’s coaxial carbon-fiber rotors, top solar panel, insulated avionics box, and four landing legs.',
    alt: 'Studio photograph of the Ingenuity Mars Helicopter showing coaxial rotor blades and solar panel',
    body: 'Mars',
    locationIds: [],
    artifactIds: ['ingenuity-helicopter']
  },
  {
    id: 'media-zhurong-hirise',
    title: 'MRO HiRISE Orbital View of Zhurong Rover in Utopia Planitia',
    url: 'https://images-assets.nasa.gov/image/PIA24914/PIA24914~medium.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA24914',
    agency: 'NASA / JPL-Caltech / University of Arizona (MRO HiRISE)',
    catalogId: 'PIA24914',
    date: '2021-09-29',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'Mars Reconnaissance Orbiter HiRISE overhead photograph revealing the Tianwen-1 landing platform and Zhurong rover tracks extending southward across Utopia Planitia.',
    alt: 'HiRISE orbital photograph of Martian plains showing dark blast pattern around Tianwen-1 lander and Zhurong track line',
    body: 'Mars',
    locationIds: ['loc-utopia-planitia-tianwen1'],
    artifactIds: ['tianwen1-lander', 'zhurong-rover'],
    isHeroCandidate: true
  },
  {
    id: 'media-schiaparelli-mro',
    title: 'MRO HiRISE Survey of Schiaparelli Impact Site',
    url: 'https://images-assets.nasa.gov/image/PIA21132/PIA21132~orig.jpg',
    sourcePageUrl: 'https://images.nasa.gov/details/PIA21132',
    agency: 'NASA / JPL-Caltech / University of Arizona (MRO HiRISE)',
    catalogId: 'PIA21132',
    date: '2016-11-03',
    mediaClass: 'Orbital Reconnaissance',
    caption:
      'Color HiRISE orbital reconnaissance photograph documenting the dark impact scar, separated parachute, and backshell of ESA/Roscosmos Schiaparelli EDM in Meridiani Planum.',
    alt: 'HiRISE overhead Martian plain view showing dark impact smudge, bright parachute, and backshell fragments',
    body: 'Mars',
    locationIds: ['loc-meridiani-schiaparelli'],
    artifactIds: ['schiaparelli-impact'],
    isHeroCandidate: true
  }
];

export function getMediaForLocation(locationId: string): MediaItem[] {
  return ARCHIVAL_MEDIA.filter((m) => m.locationIds.includes(locationId));
}

export function getMediaForArtifact(artifactId: string): MediaItem[] {
  return ARCHIVAL_MEDIA.filter((m) => m.artifactIds.includes(artifactId));
}

export function getHeroMediaForLocation(locationId: string): MediaItem | null {
  const items = getMediaForLocation(locationId);
  return items.find((m) => m.isHeroCandidate) ?? items[0] ?? null;
}

export function getMediaCountByBody(body: CelestialBody): number {
  return ARCHIVAL_MEDIA.filter((m) => m.body === body).length;
}
