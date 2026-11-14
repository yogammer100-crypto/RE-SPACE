import { PlanetaryLocation } from '../types/space';

export const LOCATIONS: PlanetaryLocation[] = [
  // MOON LOCATIONS
  {
    id: 'loc-mare-tranquillitatis',
    name: 'Mare Tranquillitatis (Tranquility Base)',
    body: 'Moon',
    regionType: 'Lunar Mare (Near Side)',
    latitude: 0.67416,
    longitude: 23.47314,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Eagle descent stage at 0.67416°N, 23.47314°E; EASEP PSE at 0.67322°N, 23.47315°E (LROC).',
    terrainSummary:
      'Smooth basaltic mare plain in the southwestern quadrant of Mare Tranquillitatis, characterized by fine-grained regolith and scattered small impact craters.',
    historicalIntro:
      'On July 20, 1969, Apollo 11 touched down at Tranquility Base, establishing humanity’s first physical presence on another celestial body. The Eagle descent stage, Passive Seismic Experiment, and Laser Ranging Retroreflector remain on-site and have been directly imaged by NASA’s Lunar Reconnaissance Orbiter.',
    scientificOverview:
      'Tranquility Base yielded basalt samples that dated mare volcanism and anchored the Early Apollo Scientific Experiments Package (EASEP), including the Passive Seismic Experiment and the still-active passive Laser Ranging Retroreflector.',
    experimentsAndFindings: [
      'Passive Seismic Experiment (PSE) recorded initial lunar seismic waves at 0.67322°N, 23.47315°E.',
      'Laser Ranging Retroreflector (LRRR) continues passive Earth–Moon laser distance ranging without onboard power.',
      'Apollo 11 LM-5 ascent stage was jettisoned into lunar orbit after liftoff and does not remain on the surface.'
    ],
    artifactIds: ['apollo-11-lm-descent', 'apollo-11-pse', 'apollo-11-lrrr'],
    missionIds: ['mission-apollo-11'],
    documents: [
      {
        title: 'NASA LROC Coordinate Releases (Apollo 11 Tranquility Base Survey)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA / Arizona State University (LROC)',
        date: '2016',
        url: 'https://www.lroc.asu.edu/',
        citationRef: '20†L83-L91 · 31†L81-L83',
        summary: 'Orbital imaging coordinates for Eagle descent stage and EASEP instruments.'
      },
      {
        title: 'RE:SPACE Verified Inventory Research Report (Moon Inventory)',
        documentType: 'Research Report',
        organization: 'RE:SPACE Research Compilation',
        date: '2026',
        url: '/assets/aistudio/RE-SPACE_Research_Report_8b2019bc.pdf',
        citationRef: 'Page 2',
        summary: 'Primary compiled dossier verifying Apollo 11 hardware status and LROC coordinates.'
      }
    ],
    timeline: [
      {
        date: '1969-07-16',
        title: 'Apollo 11 Launch',
        description: 'Saturn V launches Apollo 11 from Kennedy Space Center.',
        sourceIds: ['src-respace-report']
      },
      {
        date: '1969-07-20',
        title: 'Touchdown at Tranquility Base',
        description: 'LM-5 Eagle lands at 0.67416°N, 23.47314°E; EASEP PSE and retroreflector deployed.',
        sourceIds: ['src-lroc-coords', 'src-respace-report']
      },
      {
        date: '2016',
        title: 'LROC Coordinate Verification',
        description: 'High-resolution LRO orbital imaging publishes verified coordinates of Eagle and EASEP.',
        sourceIds: ['src-lroc-coords']
      }
    ],
    sourceIds: ['src-lroc-coords', 'src-respace-report']
  },
  {
    id: 'loc-oceanus-procellarum-apollo12',
    name: 'Oceanus Procellarum (Apollo 12 & Surveyor 3)',
    body: 'Moon',
    regionType: 'Lunar Mare (Near Side)',
    latitude: -3.0128,
    longitude: 336.5781,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Intrepid descent stage at -3.0128°N, 336.5781°E; Surveyor 3 at -3.0162°N, 336.5820°E.',
    terrainSummary:
      'Basaltic plain in southeastern Oceanus Procellarum featuring Surveyor Crater, where Surveyor 3 rests on the inner slope adjacent to Apollo 12’s touchdown point.',
    historicalIntro:
      'This site uniquely preserves hardware from two separate missions separated by 31 months: NASA’s robotic Surveyor 3 lander (April 1967) and the crewed Apollo 12 Intrepid descent stage (November 1969), representing the only in-situ human inspection of a previously landed spacecraft on another world.',
    scientificOverview:
      'Apollo 12 astronauts collected samples from Surveyor Crater, deployed an ALSEP geophysical station, and retrieved Surveyor 3’s television camera and soil scoop parts for terrestrial inspection.',
    experimentsAndFindings: [
      'Pinpoint landing placed Intrepid within ~160 meters of Surveyor 3.',
      'Surveyor 3 soil mechanics sampler tested lunar regolith cohesion in 1967.',
      'Apollo 12 deployed nuclear-powered ALSEP geophysical monitoring station (sub-coordinates in full LROC catalog).'
    ],
    artifactIds: ['apollo-12-lm-descent', 'surveyor-3', 'apollo-12-alsep'],
    missionIds: ['mission-apollo-12', 'mission-surveyor-3'],
    documents: [
      {
        title: 'NASA LROC Coordinate Releases (Apollo 12 Intrepid)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA / ASU LROC',
        date: '2016',
        url: 'https://www.lroc.asu.edu/',
        citationRef: '31†L88-L90',
        summary: 'Orbital coordinate confirmation for Intrepid descent stage and ALSEP.'
      },
      {
        title: 'NASA NSSDCA Anthropogenic Impacts (Surveyor 3)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA NSSDCA',
        date: '2022',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_impacts.html',
        citationRef: '30†L59-L63',
        summary: 'Tabulated coordinates for Surveyor 3 soft landing.'
      }
    ],
    timeline: [
      {
        date: '1967-04-20',
        title: 'Surveyor 3 Soft Landing',
        description: 'Surveyor 3 lands inside Surveyor Crater at -3.0162°N, 336.5820°E.',
        sourceIds: ['src-nssdca-impacts']
      },
      {
        date: '1969-11-19',
        title: 'Apollo 12 Pinpoint Touchdown',
        description: 'Intrepid lands on the crater rim at -3.0128°N, 336.5781°E; crew inspects Surveyor 3.',
        sourceIds: ['src-lroc-coords']
      }
    ],
    sourceIds: ['src-lroc-coords', 'src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-surveyor-2-site',
    name: 'Mare Insularum (Surveyor 2 Impact Site)',
    body: 'Moon',
    regionType: 'Impact Site (Near Side)',
    latitude: 5.5,
    longitude: 348.0,
    coordinateConfidence: 'approximate',
    coordinateNote: 'NSSDCA tabulated impact coordinates: 5.5°N, 348.0°E [30†L51-L54].',
    terrainSummary: 'Mare region southeast of Copernicus Crater on the lunar near side.',
    historicalIntro:
      'Surveyor 2 crashed on September 23, 1966 after a mid-course vernier engine failure sent the spacecraft into an unrecoverable tumble. It is catalogued strictly as an impact site rather than an intact lander.',
    scientificOverview:
      'Mission failure provided engineering lessons for vernier propulsion reliability across subsequent Surveyor flights.',
    experimentsAndFindings: ['No surface science returned due to impact loss.'],
    artifactIds: ['surveyor-2-impact'],
    missionIds: ['mission-surveyor-2'],
    documents: [
      {
        title: 'NASA NSSDCA Table of Anthropogenic Impacts (Surveyor 2)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA NSSDCA',
        date: '2022',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_impacts.html',
        citationRef: '30†L51-L54',
        summary: 'Records Surveyor 2 crash impact at 5.5°N, 348.0°E.'
      }
    ],
    timeline: [
      {
        date: '1966-09-20',
        title: 'Surveyor 2 Launch',
        description: 'Launched toward Sinus Medii before mid-course engine anomaly.',
        sourceIds: ['src-nssdca-impacts']
      },
      {
        date: '1966-09-23',
        title: 'Uncontrolled Lunar Impact',
        description: 'Impacted near 5.5°N, 348.0°E.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-mare-cognitum',
    name: 'Mare Cognitum (Ranger 7 Impact Site)',
    body: 'Moon',
    regionType: 'Impact Site (Near Side)',
    latitude: -10.634,
    longitude: 339.323,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Planetocentric NSSDCA impact site: 10.6340°S, 339.3230°E [30†L31-L35].',
    terrainSummary: 'Dark basaltic basin between Oceanus Procellarum and Mare Nubium.',
    historicalIntro:
      'Ranger 7 deliberately impacted Mare Cognitum ("The Sea That Has Become Known") on July 31, 1964 after transmitting more than 4,300 high-resolution photographs during its final minutes of descent.',
    scientificOverview:
      'Close-range images proved that cratering continued down to meter and sub-meter scales, informing landing gear design for Surveyor and Apollo.',
    experimentsAndFindings: [
      'Transmitted 4,308 television frames prior to high-velocity impact.',
      'Named Mare Cognitum in recognition of the knowledge gained.'
    ],
    artifactIds: ['ranger-7-impact'],
    missionIds: ['mission-ranger-7'],
    documents: [
      {
        title: 'NASA NSSDCA Lunar Impacts Table (Ranger 7)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA NSSDCA',
        date: '2022',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_impacts.html',
        citationRef: '30†L31-L35',
        summary: 'Tabulated planetocentric impact coordinates for Ranger 7.'
      }
    ],
    timeline: [
      {
        date: '1964-07-28',
        title: 'Ranger 7 Launch',
        description: 'Launched to capture pre-impact lunar reconnaissance imagery.',
        sourceIds: ['src-nssdca-impacts']
      },
      {
        date: '1964-07-31',
        title: 'Mare Cognitum Impact',
        description: 'Impacted at 10.6340°S, 339.3230°E after imaging transmission.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-oceanus-procellarum-luna9',
    name: 'Western Oceanus Procellarum (Luna 9)',
    body: 'Moon',
    regionType: 'Lunar Mare (Near Side)',
    latitude: 7.13,
    longitude: 295.63,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified in NSSDCA at 7.13°N, 295.63°E [30†L41-L44].',
    terrainSummary: 'Western basaltic plain of Oceanus Procellarum.',
    historicalIntro:
      'On February 3, 1966, the Soviet Luna 9 capsule achieved the first survivable soft landing on the Moon, opening its petal-like cover to transmit the first photographs ever captured from the surface of another world.',
    scientificOverview:
      'Confirmed that lunar regolith could bear the weight of a landed spacecraft, dispelling theories of deep electrostatic dust.',
    experimentsAndFindings: ['Transmitted first surface panoramas and radiation measurements.'],
    artifactIds: ['luna-9-lander'],
    missionIds: ['mission-luna-9'],
    documents: [
      {
        title: 'NASA NSSDCA Anthropogenic Impacts & Landings (Luna 9)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA NSSDCA',
        date: '2022',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_impacts.html',
        citationRef: '30†L41-L44',
        summary: 'Coordinates and milestone verification for first lunar soft landing.'
      }
    ],
    timeline: [
      {
        date: '1966-02-03',
        title: 'First Lunar Soft Landing',
        description: 'Luna 9 touches down at 7.13°N, 295.63°E and transmits surface panoramas.',
        sourceIds: ['src-nssdca-impacts', 'src-respace-report']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-oceanus-procellarum-luna13',
    name: 'Northwestern Oceanus Procellarum (Luna 13)',
    body: 'Moon',
    regionType: 'Lunar Mare (Near Side)',
    latitude: 18.87,
    longitude: 297.95,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified in NSSDCA at 18.87°N, 297.95°E [30†L53-L56].',
    terrainSummary: 'Northwestern Oceanus Procellarum mare plain.',
    historicalIntro:
      'Luna 13 soft-landed on December 24, 1966, extending the Luna 9 station design with deployable mechanical arms to directly test regolith density and strength.',
    scientificOverview:
      'Measured mechanical penetration resistance and surface radiation backscatter.',
    experimentsAndFindings: ['Mechanical soil penetrometer and radiation densimeter measurements.'],
    artifactIds: ['luna-13-lander'],
    missionIds: ['mission-luna-13'],
    documents: [],
    timeline: [
      {
        date: '1966-12-24',
        title: 'Luna 13 Touchdown',
        description: 'Soft-landed at 18.87°N, 297.95°E and deployed soil probes.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-mare-fecunditatis-luna16',
    name: 'Mare Fecunditatis (Luna 16)',
    body: 'Moon',
    regionType: 'Lunar Mare (Eastern Near Side)',
    latitude: -0.5137,
    longitude: 56.3638,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified at 0.5137°S, 56.3638°E [31†L95-L100].',
    terrainSummary: 'Flat basaltic basin in northeastern Mare Fecunditatis.',
    historicalIntro:
      'Luna 16 landed here on September 20, 1970 and executed humanity’s first fully robotic sample return from another celestial body, leaving its descent stage on the lunar surface.',
    scientificOverview:
      'Returned 101 grams of basaltic mare regolith for terrestrial laboratory radiometric dating and geochemistry.',
    experimentsAndFindings: ['Autonomous rotary core drilling and Earth-return sample capsule launch.'],
    artifactIds: ['luna-16-lander'],
    missionIds: ['mission-luna-16'],
    documents: [],
    timeline: [
      {
        date: '1970-09-20',
        title: 'Luna 16 Landing & Sample Return',
        description: 'Descent stage landed at 0.5137°S, 56.3638°E; ascent capsule returned core sample.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-lroc-coords', 'src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-mare-fecunditatis-luna20',
    name: 'Apollonius Highlands (Luna 20)',
    body: 'Moon',
    regionType: 'Lunar Highlands (Eastern Near Side)',
    latitude: 3.7863,
    longitude: 56.6242,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified at 3.7863°N, 56.6242°E [32†L119-L122].',
    terrainSummary: 'Rugged highland terrain north of Mare Fecunditatis and south of Mare Crisium.',
    historicalIntro:
      'Following Luna 16’s mare sampling, Luna 20 landed in ancient highland terrain on February 21, 1972 and returned highland crust samples to Earth.',
    scientificOverview:
      'Provided anorthositic highland samples contrasting sharply with mare basalts.',
    experimentsAndFindings: ['Confirmed feldspar-rich lunar highland crust composition.'],
    artifactIds: ['luna-20-lander'],
    missionIds: ['mission-luna-20'],
    documents: [],
    timeline: [
      {
        date: '1972-02-21',
        title: 'Luna 20 Highland Landing',
        description: 'Touched down at 3.7863°N, 56.6242°E and returned highland samples.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-mare-imbrium-luna17',
    name: 'Mare Imbrium — Lunokhod 1 Traverse Zone',
    body: 'Moon',
    regionType: 'Lunar Mare (Northwestern Near Side)',
    latitude: 38.2376,
    longitude: 324.9984,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Luna 17 lander at 38.2376°N, 324.9984°E; Lunokhod 1 at 38.3150°N, 324.9919°E [31†L99-L100].',
    terrainSummary: 'Flat volcanic plains of northwestern Mare Imbrium (Sinus Iridum region).',
    historicalIntro:
      'On November 17, 1970, Luna 17 landed in Mare Imbrium and deployed Lunokhod 1—the first wheeled robotic rover to operate on another celestial body.',
    scientificOverview:
      'Lunokhod 1 operated for 10 months, conducting soil penetrometer tests, X-ray fluorescence spectroscopy, and laser retroreflection.',
    experimentsAndFindings: [
      'First planetary rover traverse across extraterrestrial terrain.',
      'French-built laser retroreflector rediscovered by LRO in 2010 and still responsive to Earth lasers.'
    ],
    artifactIds: ['luna-17-lander', 'lunokhod-1'],
    missionIds: ['mission-luna-17'],
    documents: [
      {
        title: 'LROC Coordinate Releases (Luna 17 & Lunokhod 1)',
        documentType: 'Coordinate Catalog',
        organization: 'NASA / ASU LROC',
        date: '2016',
        url: 'https://www.lroc.asu.edu/',
        citationRef: '31†L99-L100',
        summary: 'Precise resting coordinates for both Luna 17 lander and Lunokhod 1 rover.'
      }
    ],
    timeline: [
      {
        date: '1970-11-17',
        title: 'Luna 17 Landing & Lunokhod 1 Rollout',
        description: 'Lander touched down at 38.2376°N, 324.9984°E and deployed Lunokhod 1.',
        sourceIds: ['src-lroc-coords']
      },
      {
        date: '1971-09-14',
        title: 'End of Rover Operations',
        description: 'Lunokhod 1 ceased active telemetry at 38.3150°N, 324.9919°E.',
        sourceIds: ['src-lroc-coords']
      }
    ],
    sourceIds: ['src-lroc-coords', 'src-respace-report']
  },
  {
    id: 'loc-le-monnier-luna21',
    name: 'Le Monnier Crater (Luna 21 & Lunokhod 2)',
    body: 'Moon',
    regionType: 'Crater / Mare Boundary (Near Side)',
    latitude: 25.9994,
    longitude: 30.4076,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Luna 21 lander at 25.9994°N, 30.4076°E; Lunokhod 2 at 25.8323°N, 30.9222°E [32†L141-L144].',
    terrainSummary: 'Lava-flooded bay on the eastern rim of Mare Serenitatis bordering Taurus highlands.',
    historicalIntro:
      'Luna 21 landed in Le Monnier Crater on January 15, 1973, deploying Lunokhod 2 to investigate the boundary between dark mare basalt and brighter highland slopes.',
    scientificOverview:
      'Lunokhod 2 drove tens of kilometers across Le Monnier, measuring magnetic anomalies and sky brightness.',
    experimentsAndFindings: ['Extended geological traverse from mare floor toward highland rim.'],
    artifactIds: ['luna-21-lander', 'lunokhod-2'],
    missionIds: ['mission-luna-21'],
    documents: [],
    timeline: [
      {
        date: '1973-01-15',
        title: 'Luna 21 Touchdown & Lunokhod 2 Deployment',
        description: 'Landed at 25.9994°N, 30.4076°E; rover later parked at 25.8323°N, 30.9222°E.',
        sourceIds: ['src-lroc-coords']
      }
    ],
    sourceIds: ['src-lroc-coords', 'src-respace-report']
  },
  {
    id: 'loc-mare-crisium-luna24',
    name: 'Mare Crisium (Luna 23 & Luna 24)',
    body: 'Moon',
    regionType: 'Lunar Mare (Eastern Near Side)',
    latitude: 12.7142,
    longitude: 62.2129,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Luna 24 at 12.7142°N, 62.2129°E; Luna 23 nearby at 12.6667°N, 62.1511°E [32†L147-L153].',
    terrainSummary: 'Southeastern floor of Mare Crisium, a prominent isolated circular mare basin.',
    historicalIntro:
      'Both Luna 23 (1974) and Luna 24 (1976) landed in southeastern Mare Crisium. After Luna 23’s drill was damaged upon landing, Luna 24 succeeded in extracting a deep 1.6-meter stratified core and returning it to Earth.',
    scientificOverview:
      'Luna 24 concluded 20th-century lunar soft landings and provided stratified regolith core samples from Mare Crisium.',
    experimentsAndFindings: ['Luna 24 returned 170 g deep-core sample containing trace water signatures.'],
    artifactIds: ['luna-23-lander', 'luna-24-lander'],
    missionIds: ['mission-luna-23', 'mission-luna-24'],
    documents: [],
    timeline: [
      {
        date: '1974-11-06',
        title: 'Luna 23 Landing',
        description: 'Soft-landed at 12.6667°N, 62.1511°E; drilling failure left hardware inert.',
        sourceIds: ['src-nssdca-impacts']
      },
      {
        date: '1976-08-18',
        title: 'Luna 24 Sample Return',
        description: 'Landed at 12.7142°N, 62.2129°E and successfully returned deep-core regolith.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-luna-25-site',
    name: 'Pontécoulant G Region (Luna 25 Impact)',
    body: 'Moon',
    regionType: 'Impact Site (Southern Highlands)',
    latitude: -57.865,
    longitude: 61.36,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Impact crater identified at 57.865°S, 61.36°E [57†L203-L206].',
    terrainSummary: 'Heavily cratered southern lunar highlands.',
    historicalIntro:
      'Russia’s Luna 25 spacecraft suffered an orbital maneuver anomaly on August 19, 2023 and impacted the lunar surface at 57.865°S, 61.36°E. No intact surface hardware survived.',
    scientificOverview: 'Post-impact orbital imaging confirmed the fresh crater location.',
    experimentsAndFindings: ['Mission terminated prior to surface science operations.'],
    artifactIds: ['luna-25-impact'],
    missionIds: ['mission-luna-25'],
    documents: [],
    timeline: [
      {
        date: '2023-08-19',
        title: 'Luna 25 Impact',
        description: 'Crashed at 57.865°S, 61.36°E following anomalous de-orbit burn.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-mare-imbrium-change3',
    name: 'Mare Imbrium — Chang’e-3 & Yutu Site',
    body: 'Moon',
    regionType: 'Lunar Mare (Near Side)',
    latitude: 44.1214,
    longitude: 340.4883,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Chang’e-3 lander at 44.1214°N, 340.4883°E; Yutu rover at 44.1208°N, 340.4878°E [57†L181-L184].',
    terrainSummary: 'Young volcanic basalt plains of northern Mare Imbrium.',
    historicalIntro:
      'In December 2013, China’s Chang’e-3 mission ended a 37-year hiatus in lunar soft landings, touching down in northern Mare Imbrium and deploying the Yutu rover.',
    scientificOverview:
      'Yutu’s ground-penetrating radar probed subsurface regolith layering and buried paleoregolith horizons.',
    experimentsAndFindings: [
      'Lunar-based ultraviolet optical telescope observations from the lander.',
      'First ground-penetrating radar survey on the Moon.'
    ],
    artifactIds: ['change-3-lander', 'yutu-rover'],
    missionIds: ['mission-change-3'],
    documents: [],
    timeline: [
      {
        date: '2013-12-14',
        title: 'Chang’e-3 Landing & Yutu Deployment',
        description: 'Soft-landed at 44.1214°N, 340.4883°E; Yutu deployed nearby.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-von-karman-change4',
    name: 'Von Kármán Crater (Chang’e-4 & Yutu-2)',
    body: 'Moon',
    regionType: 'South Pole–Aitken Basin (Lunar Far Side)',
    latitude: -45.4561,
    longitude: 177.5885,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Lander at 45.4561°S, 177.5885°E; Yutu-2 at 45.4600°S, 177.5900°E (±20 m) [39†L39-L43].',
    terrainSummary: 'Basalt-flooded floor of the 186 km Von Kármán Crater inside the ancient South Pole–Aitken Basin on the lunar far side.',
    historicalIntro:
      'On January 3, 2019, Chang’e-4 achieved humanity’s first soft landing on the far side of the Moon, relaying communications via the Queqiao halo-orbit satellite and deploying the Yutu-2 rover.',
    scientificOverview:
      'Exploring one of the oldest and deepest impact basins in the solar system, Yutu-2 continues probing deep ejecta stratigraphy and regolith structure.',
    experimentsAndFindings: [
      'First in-situ radiation dosimetry and low-frequency radio observations from the radio-quiet far side.',
      'Deep subsurface radar profiling of South Pole–Aitken Basin deposits.'
    ],
    artifactIds: ['change-4-lander', 'yutu-2-rover'],
    missionIds: ['mission-change-4'],
    documents: [
      {
        title: 'LROC Release: Chang’e-4 Far-Side Landing Site',
        documentType: 'Official Agency Release',
        organization: 'NASA / ASU LROC',
        date: '2019',
        url: 'https://www.lroc.asu.edu/images',
        citationRef: '39†L39-L43',
        summary: 'Orbital verification of Chang’e-4 and Yutu-2 coordinates in Von Kármán Crater.'
      }
    ],
    timeline: [
      {
        date: '2019-01-03',
        title: 'First Far-Side Soft Landing',
        description: 'Chang’e-4 lands at 45.4561°S, 177.5885°E and deploys Yutu-2.',
        sourceIds: ['src-lroc-change4', 'src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-lroc-change4', 'src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-mons-rumker-change5',
    name: 'Northern Oceanus Procellarum (Chang’e-5)',
    body: 'Moon',
    regionType: 'Young Volcanic Mare (Near Side)',
    latitude: 43.0576,
    longitude: 308.0839,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified at 43.0576°N, 308.0839°E [57†L197-L199].',
    terrainSummary: 'Young volcanic mare unit northeast of Mons Rümker in northern Oceanus Procellarum.',
    historicalIntro:
      'Chang’e-5 touched down here on December 1, 2020, collected surface and drilled samples, and launched its ascent stage into lunar orbit for automated rendezvous and sample return to Earth.',
    scientificOverview:
      'Returned mare basalts formed much later in lunar history than Apollo and Luna mare samples, recalibrating lunar crater-counting chronology.',
    experimentsAndFindings: ['Returned young volcanic basalt samples via automated lunar-orbit rendezvous.'],
    artifactIds: ['change-5-lander'],
    missionIds: ['mission-change-5'],
    documents: [
      {
        title: 'LROC Release: Chang’e-5 Landing Site',
        documentType: 'Official Agency Release',
        organization: 'NASA / ASU LROC',
        date: '2020',
        url: 'https://www.lroc.asu.edu/images',
        citationRef: '41†L37-L39 · 57†L197-L199',
        summary: 'LROC confirmation of Chang’e-5 lander coordinates near Mons Rümker.'
      }
    ],
    timeline: [
      {
        date: '2020-12-01',
        title: 'Chang’e-5 Soft Landing',
        description: 'Touched down at 43.0576°N, 308.0839°E and collected samples.',
        sourceIds: ['src-lroc-change5']
      }
    ],
    sourceIds: ['src-lroc-change5', 'src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-change5-ascent-impact',
    name: 'Prime Meridian Southern Zone (Chang’e-5 Ascent Impact)',
    body: 'Moon',
    regionType: 'Impact Site (Near Side)',
    latitude: -30.0,
    longitude: 0.0,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Listed at 30°S, 0°E in NSSDCA summary [57†L197-L200].',
    terrainSummary: 'Southern near-side highland region along the lunar prime meridian.',
    historicalIntro:
      'Following lunar-orbit sample transfer, the spent Chang’e-5 ascent stage was commanded to de-orbit and impact the surface to keep lunar orbit clear.',
    scientificOverview: 'Controlled disposal impact.',
    experimentsAndFindings: ['End-of-mission orbital debris mitigation impact.'],
    artifactIds: ['change-5-ascent-impact'],
    missionIds: ['mission-change-5'],
    documents: [],
    timeline: [
      {
        date: '2020-12-07',
        title: 'Controlled Ascent Stage Impact',
        description: 'Impacted near 30°S, 0°E after sample transfer.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-lroc-change5', 'src-nssdca-impacts']
  },
  {
    id: 'loc-chandrayaan1-equatorial',
    name: 'Eastern Equatorial Region (Chandrayaan-1 Impact Entry)',
    body: 'Moon',
    regionType: 'Impact Site',
    latitude: -1.5,
    longitude: 52.36,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Report Page 3 cites 1.5°S, 52.36°E [57†L169-L172] for Chandrayaan-1 orbiter impact.',
    terrainSummary: 'Eastern near-side equatorial region.',
    historicalIntro:
      'Recorded in the NSSDCA impact tabulation as the end-of-mission lunar impact coordinates for the Chandrayaan-1 orbiter.',
    scientificOverview: 'Chandrayaan-1 orbital instruments mapped lunar minerals and polar water signatures prior to impact.',
    experimentsAndFindings: ['Orbiter instruments detected widespread surface hydration / OH signatures.'],
    artifactIds: ['chandrayaan-1-orbiter-impact'],
    missionIds: ['mission-chandrayaan-1'],
    documents: [],
    timeline: [
      {
        date: '2008-11-14',
        title: 'Chandrayaan-1 MIP Release',
        description: 'Moon Impact Probe released from orbiter.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-change1-south-polar',
    name: 'South Polar Impact Zone (89°S, 330°E)',
    body: 'Moon',
    regionType: 'Impact Site (Lunar South Pole)',
    latitude: -89.0,
    longitude: 330.0,
    coordinateConfidence: 'approximate',
    coordinateNote:
      'Report Page 3 lists 89°S, 330°E for both Chang’e-1 [57†L163-L170] and Chandrayaan-1 MIP [57†L162-L170]; overlap explicitly noted.',
    terrainSummary: 'High-latitude south polar highlands near Shackleton Crater.',
    historicalIntro:
      'Both China’s Chang’e-1 orbiter (end-of-mission impact) and India’s Chandrayaan-1 Moon Impact Probe (MIP) appear in the research report summary with coordinates 89°S, 330°E.',
    scientificOverview:
      'Chandrayaan-1 MIP sampled the tenuous lunar exosphere with its CHACE mass spectrometer during descent.',
    experimentsAndFindings: ['CHACE mass spectrometer measured exospheric water vapor signatures during descent.'],
    artifactIds: ['change-1-impact', 'chandrayaan-1-mip'],
    missionIds: ['mission-change-1', 'mission-chandrayaan-1'],
    documents: [],
    timeline: [
      {
        date: '2008-11-14',
        title: 'Chandrayaan-1 MIP Descent',
        description: 'Moon Impact Probe impacts near the lunar south pole.',
        sourceIds: ['src-nssdca-impacts']
      },
      {
        date: '2009-03-01',
        title: 'Chang’e-1 Controlled Impact',
        description: 'Chang’e-1 orbiter concludes mission via controlled lunar impact.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-chandrayaan2-impact',
    name: 'Manzinus–Simpelius Highlands (Chandrayaan-2 Impact)',
    body: 'Moon',
    regionType: 'Impact & Debris Field (Southern Highlands)',
    latitude: -70.881,
    longitude: 22.784,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'LRO-verified impact crater and debris field at 70.8810°S, 22.7840°E [43†L343-L347].',
    terrainSummary: 'Ancient cratered southern lunar highlands.',
    historicalIntro:
      'On September 6, 2019, ISRO’s Chandrayaan-2 Vikram lander suffered a guidance anomaly during terminal descent and crashed. NASA LROC imagery located the impact point and scattered debris field at 70.8810°S, 22.7840°E.',
    scientificOverview:
      'Fact-check correction: Chandrayaan-2 did not achieve a soft landing; no intact surface artifacts remain except crash wreckage.',
    experimentsAndFindings: ['Orbital forensic imaging verified impact crater and ejecta rays.'],
    artifactIds: ['chandrayaan-2-vikram-impact'],
    missionIds: ['mission-chandrayaan-2'],
    documents: [
      {
        title: 'NASA Science: Chandrayaan-2 Vikram Impact Site Found',
        documentType: 'Official Agency Release',
        organization: 'NASA Science / LROC',
        date: '2019-12',
        url: 'https://science.nasa.gov/moon/',
        citationRef: '43†L343-L347',
        summary: 'LRO before-and-after mosaic identifying Vikram impact point and debris.'
      }
    ],
    timeline: [
      {
        date: '2019-09-06',
        title: 'Vikram Terminal Descent Loss',
        description: 'Telemetry lost during final descent; spacecraft impacted at 70.8810°S, 22.7840°E.',
        sourceIds: ['src-nasa-chandrayaan2']
      },
      {
        date: '2019-12',
        title: 'LROC Debris Identification',
        description: 'NASA LROC publishes verified impact coordinates and debris mosaic.',
        sourceIds: ['src-nasa-chandrayaan2']
      }
    ],
    sourceIds: ['src-nasa-chandrayaan2', 'src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-shiv-shakti-chandrayaan3',
    name: 'Lunar South Polar Region (Chandrayaan-3)',
    body: 'Moon',
    regionType: 'Southern Highlands (Near South Pole)',
    latitude: -69.3741,
    longitude: 32.32,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified by LROC / ISRO at 69.3741°S, 32.32°E [45†L42-L45].',
    terrainSummary: 'High-latitude southern highland terrain between Manzinus C and Boguslawsky craters.',
    historicalIntro:
      'On August 23, 2023, ISRO’s Chandrayaan-3 Vikram lander achieved the first soft landing near the lunar south polar region and deployed the Pragyan rover.',
    scientificOverview:
      'Vikram measured subsurface regolith temperature gradients and seismic vibrations, while Pragyan analyzed elemental chemistry using LIBS and APXS.',
    experimentsAndFindings: [
      'Confirmed sulfur and major rock-forming elements in south polar soil.',
      'Measured sharp thermal insulation properties of upper 10 cm lunar regolith.'
    ],
    artifactIds: ['chandrayaan-3-vikram', 'chandrayaan-3-pragyan'],
    missionIds: ['mission-chandrayaan-3'],
    documents: [
      {
        title: 'LROC / ISRO Verification: Chandrayaan-3 Landing Site',
        documentType: 'Official Agency Release',
        organization: 'NASA LROC / ISRO',
        date: '2023-08',
        url: 'https://www.isro.gov.in/',
        citationRef: '45†L42-L45',
        summary: 'Coordinate verification for Chandrayaan-3 Vikram and Pragyan.'
      }
    ],
    timeline: [
      {
        date: '2023-07-14',
        title: 'Chandrayaan-3 Launch',
        description: 'Launched aboard LVM3 from Satish Dhawan Space Centre.',
        sourceIds: ['src-lroc-chandrayaan3']
      },
      {
        date: '2023-08-23',
        title: 'Historic South Polar Soft Landing',
        description: 'Vikram touches down at 69.3741°S, 32.32°E and deploys Pragyan.',
        sourceIds: ['src-lroc-chandrayaan3']
      }
    ],
    sourceIds: ['src-lroc-chandrayaan3', 'src-respace-report']
  },
  {
    id: 'loc-cabeus-lcross',
    name: 'Cabeus Crater (LCROSS Impact Site)',
    body: 'Moon',
    regionType: 'Permanently Shadowed Polar Crater',
    latitude: -84.68,
    longitude: 311.29,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified in NSSDCA at 84.68°S, 311.29°E [57†L171-L175].',
    terrainSummary: 'Deep, permanently shadowed floor of Cabeus Crater near the lunar south pole.',
    historicalIntro:
      'On October 9, 2009, NASA’s LCROSS mission deliberately impacted a spent Centaur upper stage—followed four minutes later by the Shepherding Spacecraft—into permanently shadowed Cabeus Crater to excavate subsurface volatiles.',
    scientificOverview:
      'Spectroscopic observation of the sunlit ejecta plume confirmed water ice and volatile compounds trapped in permanently shadowed polar regolith.',
    experimentsAndFindings: ['Confirmed presence of water ice in permanently shadowed polar lunar crater.'],
    artifactIds: ['lcross-impact'],
    missionIds: ['mission-lcross'],
    documents: [],
    timeline: [
      {
        date: '2009-10-09',
        title: 'LCROSS Dual Impact',
        description: 'Centaur stage and Shepherding Spacecraft impact Cabeus Crater at 84.68°S, 311.29°E.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },
  {
    id: 'loc-grail-north-pole',
    name: 'Northern Lunar Mountain (GRAIL Ebb & Flow)',
    body: 'Moon',
    regionType: 'Impact Site (Northern Highlands)',
    latitude: 75.6298,
    longitude: 333.286,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'GRAIL-A at 75.6088°N, 333.4060°E; GRAIL-B at 75.6508°N, 333.1659°E [57†L177-L180].',
    terrainSummary: 'High-latitude northern highland massif near Goldschmidt Crater.',
    historicalIntro:
      'After completing the highest-precision gravity field survey of the Moon, twin NASA GRAIL spacecraft Ebb and Flow were intentionally impacted into an unnamed northern mountain in December 2012.',
    scientificOverview:
      'GRAIL gravity data revealed a thoroughly fractured upper lunar crust and constrained crustal thickness.',
    experimentsAndFindings: ['Precision dual-spacecraft Ka-band gravity gradiometry across the entire Moon.'],
    artifactIds: ['grail-a-impact', 'grail-b-impact'],
    missionIds: ['mission-grail'],
    documents: [],
    timeline: [
      {
        date: '2012-12-17',
        title: 'GRAIL Ebb & Flow Controlled Impacts',
        description: 'Both spacecraft impacted adjacent points near 75.6°N, 333.3°E.',
        sourceIds: ['src-nssdca-impacts']
      }
    ],
    sourceIds: ['src-nssdca-impacts', 'src-respace-report']
  },

  // MARS LOCATIONS
  {
    id: 'loc-terra-sirenum-mars3',
    name: 'Terra Sirenum (Mars 3 Landing Site)',
    body: 'Mars',
    regionType: 'Southern Highlands (Ptolemaeus Region)',
    latitude: -45.0,
    longitude: -158.0,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Documented at -45.00°, -158.00° in Terra Sirenum [46†L1-L3].',
    terrainSummary: 'Ancient cratered southern highlands in Terra Sirenum.',
    historicalIntro:
      'On December 2, 1971, the Soviet Mars 3 lander became the first spacecraft to achieve a soft landing on Mars, touching down during a planet-wide dust storm before losing contact after 14.5 seconds of transmission.',
    scientificOverview:
      'Descent stage and stationary lander remain on-site as humanity’s earliest soft-landed Martian hardware.',
    experimentsAndFindings: ['Brief 14.5-second surface signal prior to loss of contact.'],
    artifactIds: ['mars-3-lander'],
    missionIds: ['mission-mars-3'],
    documents: [],
    timeline: [
      {
        date: '1971-12-02',
        title: 'First Martian Soft Landing',
        description: 'Mars 3 lands in Terra Sirenum (-45.00°, -158.00°) during global dust storm.',
        sourceIds: ['src-mars3-esa']
      }
    ],
    sourceIds: ['src-mars3-esa', 'src-respace-report']
  },
  {
    id: 'loc-ares-vallis-pathfinder',
    name: 'Ares Vallis (Mars Pathfinder & Sojourner)',
    body: 'Mars',
    regionType: 'Ancient Outflow Channel',
    latitude: 19.33,
    longitude: -33.55,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Reported as ~19.33°N, 33.55°W (approx) in research inventory.',
    terrainSummary: 'Rocky floodplain deposited by catastrophic ancient outflow floods draining into Chryse Planitia.',
    historicalIntro:
      'On July 4, 1997, Mars Pathfinder bounced onto Ares Vallis encased in airbags, deploying the Sojourner rover—the first mobile vehicle on Mars. The lander, rover, backshell, airbags, and Doppler antenna remain scattered across the site.',
    scientificOverview:
      'Imaged rounded pebbles and tilted cobbles indicative of ancient torrential water flows; Sojourner conducted APXS rock chemistry.',
    experimentsAndFindings: [
      'First mobile rover operations on Mars (83 sols).',
      'Confirmed catastrophic flood-deposited cobbles and diverse basaltic/andesitic rocks.'
    ],
    artifactIds: ['pathfinder-lander', 'sojourner-rover', 'pathfinder-debris'],
    missionIds: ['mission-pathfinder'],
    documents: [],
    timeline: [
      {
        date: '1997-07-04',
        title: 'Pathfinder Touchdown & Sojourner Deployment',
        description: 'Landed in Ares Vallis (~19.33°N, 33.55°W) via airbag bounce.',
        sourceIds: ['src-mars-missions-jpl']
      }
    ],
    sourceIds: ['src-mars-missions-jpl', 'src-respace-report']
  },
  {
    id: 'loc-meridiani-planum-opportunity',
    name: 'Meridiani Planum (Opportunity & Eagle Crater)',
    body: 'Mars',
    regionType: 'Sedimentary Equatorial Plain',
    latitude: -1.95,
    longitude: 354.47,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Opportunity benchmark site verified at 1.95°S, 354.47°E (Page 3–4).',
    terrainSummary: 'Flat, layered sulfate-rich sedimentary plains dotted with small craters and iron-rich hematite spherules.',
    historicalIntro:
      'MER Opportunity landed inside Eagle Crater on January 25, 2004 and operated across Meridiani Planum until 2018. Both its lander platform (with airbags, backshell, and parachute) and the rover remain on-site as confirmed stationary benchmarks.',
    scientificOverview:
      'Discovered layered sedimentary outcrops, sulfate salts, and hematite concretions proving persistent past surface and groundwater activity.',
    experimentsAndFindings: [
      'Identified jarosite and cross-bedded sedimentary rocks formed in acidic water.',
      'Operated for nearly 15 years across 45+ km of Martian plains.'
    ],
    artifactIds: ['opportunity-rover', 'opportunity-lander-debris'],
    missionIds: ['mission-mer-opportunity'],
    documents: [],
    timeline: [
      {
        date: '2004-01-25',
        title: 'Opportunity Landing in Eagle Crater',
        description: 'Touched down at 1.95°S, 354.47°E.',
        sourceIds: ['src-mars-missions-jpl']
      },
      {
        date: '2018-06',
        title: 'Final Transmission',
        description: 'Planet-encircling dust storm ended Opportunity operations after 14+ years.',
        sourceIds: ['src-mars-missions-jpl']
      }
    ],
    sourceIds: ['src-mars-missions-jpl', 'src-respace-report']
  },
  {
    id: 'loc-meridiani-schiaparelli',
    name: 'Meridiani Planum (Schiaparelli Impact Site)',
    body: 'Mars',
    regionType: 'Impact & Debris Field',
    latitude: -2.9,
    longitude: 6.1,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Impact site near 2.9°S, 6.1°E; debris fields imaged by MRO (Page 4).',
    terrainSummary: 'Equatorial plains of Meridiani Planum.',
    historicalIntro:
      'ESA/Roscosmos ExoMars Schiaparelli EDM crashed on October 19, 2016 following an inertial measurement unit saturation anomaly during descent. MRO HiRISE imaged its impact crater, parachute, and backshell.',
    scientificOverview:
      'Schiaparelli yielded no intact surface operations; the companion ExoMars Trace Gas Orbiter (TGO) remains operational in orbit (excluded from surface artifacts).',
    experimentsAndFindings: ['MRO imaged impact crater and separated parachute/backshell debris.'],
    artifactIds: ['schiaparelli-impact'],
    missionIds: ['mission-schiaparelli'],
    documents: [],
    timeline: [
      {
        date: '2016-10-19',
        title: 'Schiaparelli Impact',
        description: 'Impacted Meridiani Planum near 2.9°S, 6.1°E; ExoMars TGO entered orbit.',
        sourceIds: ['src-mars3-esa']
      }
    ],
    sourceIds: ['src-mars3-esa', 'src-respace-report']
  },
  {
    id: 'loc-vastitas-borealis-phoenix',
    name: 'Polar Utopia Planitia / Vastitas Borealis (Phoenix)',
    body: 'Mars',
    regionType: 'Northern Polar Plains',
    latitude: 68.22,
    longitude: 234.25,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Verified at 68.22°N, 234.25°E (Page 4).',
    terrainSummary: 'Polygonally patterned permafrost plains in the high northern Martian lowlands.',
    historicalIntro:
      'NASA’s Phoenix lander touched down at 68.22°N on May 25, 2008 to investigate polar ice. Its heat shield and descent stage crashed nearby while the lander and instruments remain in situ.',
    scientificOverview:
      'Phoenix’s robotic arm dug directly into shallow subsurface water ice just centimeters beneath the regolith.',
    experimentsAndFindings: [
      'Directly excavated and sublimated pure Martian water ice.',
      'Detected calcium carbonate and perchlorate salts in polar soil.'
    ],
    artifactIds: ['phoenix-lander'],
    missionIds: ['mission-phoenix'],
    documents: [],
    timeline: [
      {
        date: '2008-05-25',
        title: 'Phoenix Polar Touchdown',
        description: 'Landed at 68.22°N, 234.25°E and uncovered subsurface water ice.',
        sourceIds: ['src-mars-missions-jpl']
      }
    ],
    sourceIds: ['src-mars-missions-jpl', 'src-respace-report']
  },
  {
    id: 'loc-gale-crater-curiosity',
    name: 'Gale Crater — Bradbury Landing (Curiosity)',
    body: 'Mars',
    regionType: 'Impact Crater & Central Peak (Aeolis Mons)',
    latitude: -4.5895,
    longitude: 137.4417,
    coordinateConfidence: 'confirmed',
    coordinateNote: 'Bradbury Landing at 4.5895°S, 137.4417°E; parachute ~615 m away [54†L133-L136].',
    terrainSummary: '154 km impact crater containing the 5.5 km layered sedimentary mountain Aeolis Mons (Mount Sharp).',
    historicalIntro:
      'Curiosity (Mars Science Laboratory) was lowered to Bradbury Landing via a rocket-powered Sky Crane on August 6, 2012. Its sky-crane descent stage and parachute remain on the crater floor while the active rover climbs Mount Sharp.',
    scientificOverview:
      'Curiosity established that Gale Crater hosted long-lived ancient freshwater lakes with chemical energy sources and organic carbon suitable for microbial life.',
    experimentsAndFindings: [
      'Confirmed habitable ancient lacustrine mudstones in Yellowknife Bay and Mount Sharp.',
      'Detected organic carbon compounds and seasonal methane fluctuations.'
    ],
    artifactIds: ['curiosity-rover', 'curiosity-skycrane-parachute'],
    missionIds: ['mission-msl-curiosity'],
    documents: [
      {
        title: 'Bradbury Landing Reference (MSL Coordinates & Hardware)',
        documentType: 'Scientific Summary',
        organization: 'NASA/JPL Reference',
        date: '2012',
        url: 'https://mars.nasa.gov/msl/home/',
        citationRef: '54†L133-L136',
        summary: 'Documents Bradbury Landing coordinates and ~615 m parachute separation.'
      }
    ],
    timeline: [
      {
        date: '2012-08-06',
        title: 'Sky-Crane Touchdown at Bradbury Landing',
        description: 'Curiosity lands at 4.5895°S, 137.4417°E; sky-crane and parachute settle nearby.',
        sourceIds: ['src-bradbury-ref']
      }
    ],
    sourceIds: ['src-bradbury-ref', 'src-mars-missions-jpl', 'src-respace-report']
  },
  {
    id: 'loc-elysium-planitia-insight',
    name: 'Elysium Planitia (InSight Geophysical Station)',
    body: 'Mars',
    regionType: 'Equatorial Volcanic Plain',
    latitude: 4.5,
    longitude: 135.9,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Reported as ~4.5°N, 135.9°E (known to ~±3 m from entry data per Page 4).',
    terrainSummary: 'Smooth equatorial volcanic plain south of the Elysium rise.',
    historicalIntro:
      'NASA’s InSight lander touched down in Elysium Planitia on November 26, 2018, deploying a dome-shielded seismometer and heat-flow probe directly onto the Martian soil.',
    scientificOverview:
      'InSight recorded over 1,300 marsquakes, mapping Martian crustal layering and revealing the size and liquid state of Mars’s core.',
    experimentsAndFindings: [
      'Measured marsquakes and meteoroid impact seismic waves.',
      'Constrained Martian crustal thickness and core radius.'
    ],
    artifactIds: ['insight-lander'],
    missionIds: ['mission-insight'],
    documents: [],
    timeline: [
      {
        date: '2018-11-26',
        title: 'InSight Touchdown',
        description: 'Landed at ~4.5°N, 135.9°E in Elysium Planitia.',
        sourceIds: ['src-mars-missions-jpl']
      },
      {
        date: '2022-12',
        title: 'End of Mission',
        description: 'Dust accumulation on solar arrays ended telemetry after 4 years of seismic monitoring.',
        sourceIds: ['src-mars-missions-jpl']
      }
    ],
    sourceIds: ['src-mars-missions-jpl', 'src-respace-report']
  },
  {
    id: 'loc-jezero-crater-perseverance',
    name: 'Jezero Crater (Perseverance & Ingenuity)',
    body: 'Mars',
    regionType: 'Ancient Lake Basin & River Delta',
    latitude: 18.0,
    longitude: 77.0,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Reported as ~18°N, 77°E in NASA/JPL Mars 2020 Landing Press Kit [60†L66-L69].',
    terrainSummary: '45 km impact crater preserving a fan-shaped ancient river delta on the western edge of Isidis Planitia.',
    historicalIntro:
      'Perseverance and the Ingenuity Mars Helicopter landed in Jezero Crater on February 18, 2021. Alongside the sky-crane descent stage, parachute, and backshell, Ingenuity achieved the first powered aerodynamic flight on another planet.',
    scientificOverview:
      'Perseverance is drilling and sealing rock cores for prospective future return to Earth while studying ancient lake-delta sediments and testing oxygen production (MOXIE).',
    experimentsAndFindings: [
      'Ingenuity completed 72 powered flights in the thin Martian atmosphere.',
      'MOXIE generated breathable oxygen from Martian atmospheric CO2.',
      'Cached sealed igneous and sedimentary rock cores.'
    ],
    artifactIds: ['perseverance-rover', 'ingenuity-helicopter', 'perseverance-edl-debris'],
    missionIds: ['mission-mars2020'],
    documents: [
      {
        title: 'NASA / JPL Mars 2020 Perseverance Landing Press Kit',
        documentType: 'Mission Press Kit',
        organization: 'NASA Jet Propulsion Laboratory',
        date: '2021-02',
        url: 'https://mars.nasa.gov/mars2020/',
        citationRef: '60†L66-L69',
        summary: 'Official press kit detailing Jezero Crater landing zone and mission hardware.'
      }
    ],
    timeline: [
      {
        date: '2021-02-18',
        title: 'Perseverance Touchdown in Jezero Crater',
        description: 'Landed at ~18°N, 77°E via Terrain Relative Navigation and Sky Crane.',
        sourceIds: ['src-jpl-mars2020']
      },
      {
        date: '2021-04-19',
        title: 'First Powered Flight on Mars',
        description: 'Ingenuity helicopter achieves first controlled aerodynamic flight on another world.',
        sourceIds: ['src-jpl-mars2020']
      }
    ],
    sourceIds: ['src-jpl-mars2020', 'src-respace-report']
  },
  {
    id: 'loc-utopia-planitia-tianwen1',
    name: 'Southern Utopia Planitia (Tianwen-1 & Zhurong)',
    body: 'Mars',
    regionType: 'Northern Lowland Plains',
    latitude: 25.0,
    longitude: 109.0,
    coordinateConfidence: 'approximate',
    coordinateNote: 'Reported as ~25°N, 109°E in Utopia Planitia (Page 4).',
    terrainSummary: 'Broad northern lowland basin featuring sedimentary deposits and pitted cones.',
    historicalIntro:
      'China’s Tianwen-1 lander touched down in southern Utopia Planitia on May 14, 2021, deploying the Zhurong rover. Zhurong operated across the plains until 2022 while the Tianwen-1 orbiter remained in Mars orbit (excluded from surface artifacts).',
    scientificOverview:
      'Zhurong’s subsurface radar and spectrometers probed layered sedimentary deposits in Utopia Planitia.',
    experimentsAndFindings: [
      'Subsurface radar imaging of multi-layered Martian lowland stratigraphy.',
      'In-situ mineral and magnetic field measurements along rover traverse.'
    ],
    artifactIds: ['tianwen1-lander', 'zhurong-rover'],
    missionIds: ['mission-tianwen-1'],
    documents: [],
    timeline: [
      {
        date: '2021-05-14',
        title: 'Tianwen-1 Soft Landing',
        description: 'Lander touches down at ~25°N, 109°E in Utopia Planitia.',
        sourceIds: ['src-mars-missions-jpl']
      },
      {
        date: '2021-05-22',
        title: 'Zhurong Rover Rollout',
        description: 'Zhurong drives onto Utopia Planitia; operated until 2022.',
        sourceIds: ['src-mars-missions-jpl']
      }
    ],
    sourceIds: ['src-mars-missions-jpl', 'src-respace-report']
  }
];
