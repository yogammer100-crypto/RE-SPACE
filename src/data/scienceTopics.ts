import { ScienceTopic } from '../types/space';

export const SCIENCE_TOPICS: ScienceTopic[] = [
  {
    id: 'sci-soft-landing',
    category: 'Entry, Descent & Landing',
    title: 'How Soft Landings Differ on the Moon and Mars',
    summary:
      'Airless lunar descents rely purely on closed-loop rocket propulsion, whereas Martian landings must survive supersonic atmospheric heating before retropropulsion or airbags.',
    generalPrinciple:
      'On an airless body like the Moon, parachutes and heat shields are useless; a spacecraft must cancel ~1.7 km/s of orbital velocity exclusively with throttleable or pulsed rocket engines guided by Doppler radar and optical terrain tracking. Mars possesses a thin (~1% Earth surface pressure) CO2 atmosphere: enough to generate intense aerodynamic heating requiring an ablative heat shield and supersonic parachute, yet too thin to slow heavy spacecraft to touchdown speed by parachute alone.',
    missionSpecificContext:
      'Apollo descent stages, Chang’e-3/4/5, and Chandrayaan-3 used powered terminal hover/hazard avoidance on the Moon. On Mars, Pathfinder and MER (Spirit/Opportunity) used parachutes plus inflatable airbags, whereas Curiosity and Perseverance used guided aeroshells, supersonic parachutes, and rocket-powered Sky Cranes—leaving separate backshells, heat shields, and parachutes as documented surface debris.',
    relatedMissionIds: [
      'mission-apollo-11',
      'mission-pathfinder',
      'mission-msl-curiosity',
      'mission-mars2020',
      'mission-chandrayaan-3'
    ],
    sourceIds: ['src-jpl-mars2020', 'src-lroc-chandrayaan3', 'src-respace-report']
  },
  {
    id: 'sci-rovers',
    category: 'Mobility & Power',
    title: 'How Lunar and Martian Rovers Operate',
    summary:
      'Mobile surface laboratories adapt wheels, thermal control, and power systems to extreme dust, temperature swings, and multi-minute light-time delays.',
    generalPrinciple:
      'Planetary rovers use multi-wheel articulated suspensions (such as rocker-bogie geometry or 8-wheel rigid-tub designs) to climb regolith slopes without tipping. Solar-powered rovers survive on sunlight and battery cycling, whereas heavier flagship Mars laboratories (Curiosity, Perseverance) use Multi-Mission Radioisotope Thermoelectric Generators (MMRTGs) to operate through dust storms and polar winters.',
    missionSpecificContext:
      'Lunokhod 1 and 2 were teleoperated across a 2.6-second Earth–Moon round-trip delay, while Yutu-2 and Pragyan rely on lunar-day solar charging and hibernate during frigid 14-day lunar nights. On Mars, light-time delays (4–24 minutes one-way) require rovers like Perseverance and Zhurong to execute autonomous hazard avoidance between daily command uplinks.',
    relatedMissionIds: [
      'mission-luna-17',
      'mission-change-4',
      'mission-mer-opportunity',
      'mission-msl-curiosity',
      'mission-mars2020',
      'mission-tianwen-1'
    ],
    sourceIds: ['src-lroc-change4', 'src-jpl-mars2020', 'src-mars-missions-jpl']
  },
  {
    id: 'sci-instruments',
    category: 'Surface Instrumentation',
    title: 'How Surface Instruments Probe Planetary Interiors and Chemistry',
    summary:
      'Seismometers, laser retroreflectors, ground-penetrating radars, and spectrometers turn stationary landers and rovers into planetary laboratories.',
    generalPrinciple:
      'Passive seismometers detect elastic waves from moonquakes, marsquakes, and meteoroid impacts to constrain crustal thickness and core state. Laser retroreflectors use corner-cube prisms that reflect incident laser beams back to their exact source direction without needing electrical power. Ground-penetrating radar transmits electromagnetic pulses into regolith to map buried rock layers.',
    missionSpecificContext:
      'Apollo 11’s Passive Seismic Experiment and Retroreflector remain documented at 0.67322°N, 23.47315°E; Lunokhod 1 and 2 also carry passive retroreflectors. On Mars, InSight’s SEIS seismometer detected over 1,300 marsquakes from Elysium Planitia, while Yutu, Yutu-2, Perseverance, and Zhurong used surface radars to map shallow stratigraphy.',
    relatedMissionIds: [
      'mission-apollo-11',
      'mission-insight',
      'mission-change-3',
      'mission-change-4',
      'mission-tianwen-1'
    ],
    sourceIds: ['src-lroc-coords', 'src-mars-missions-jpl', 'src-respace-report']
  },
  {
    id: 'sci-coordinates',
    category: 'Geodesy & Mapping',
    title: 'How Planetary Coordinates and Verification Work',
    summary:
      'Modern planetary coordinates use planetocentric latitude and 0°–360° East (or ±180°) longitude verified by orbital cameras such as LROC and HiRISE.',
    generalPrinciple:
      'Planetocentric coordinates measure latitude from the body’s center of mass and longitude eastward from an internationally defined prime meridian (0°). Because entry telemetry alone has kilometer-scale uncertainty ellipses, pinpointing hardware on the surface relies on high-resolution orbital reconnaissance imaging combined with radio-tracking Doppler solutions.',
    missionSpecificContext:
      'NASA’s Lunar Reconnaissance Orbiter Camera (LROC) verified Apollo descent stages, ALSEP experiments, Lunokhod rovers, Chang’e landers, Chandrayaan-3, and crash debris fields such as Chandrayaan-2 Vikram. On Mars, MRO’s HiRISE camera confirms stationary landers, rover tracks, and separated parachutes (e.g. Curiosity’s parachute ~615 m from Bradbury Landing). Where verified coordinates are absent in source records, RE:SPACE stores null rather than estimating.',
    relatedMissionIds: [
      'mission-apollo-11',
      'mission-chandrayaan-2',
      'mission-msl-curiosity',
      'mission-insight'
    ],
    sourceIds: ['src-lroc-coords', 'src-nssdca-impacts', 'src-nasa-chandrayaan2', 'src-bradbury-ref']
  },
  {
    id: 'sci-landing-sites',
    category: 'Site Selection',
    title: 'How Landing Sites Are Selected',
    summary:
      'Mission planners balance flat, boulder-free engineering safety against compelling geological targets such as crater deltas, mare boundaries, and polar illumination zones.',
    generalPrinciple:
      'Site selection begins with orbital altimetry, slope maps, rock-abundance radar, and thermal inertia data to minimize landing hazard risk. Scientific teams then prioritize localities where orbital spectroscopy indicates accessible stratigraphy, ancient water alteration, or polar volatiles.',
    missionSpecificContext:
      'Early missions (Luna 9, Surveyor 1, Apollo 11) targeted smooth equatorial maria such as Oceanus Procellarum and Mare Tranquillitatis. Later missions targeted complex geology: Apollo 12 pinpointed Surveyor Crater; Chang’e-4 entered the far-side South Pole–Aitken Basin; Chandrayaan-3 targeted high southern latitudes (69.37°S); and Perseverance landed beside an ancient river delta in Jezero Crater.',
    relatedMissionIds: [
      'mission-apollo-12',
      'mission-change-4',
      'mission-chandrayaan-3',
      'mission-mars2020'
    ],
    sourceIds: ['src-lroc-change4', 'src-lroc-chandrayaan3', 'src-jpl-mars2020']
  },
  {
    id: 'sci-impacts-crashes',
    category: 'Failure & Impact Forensics',
    title: 'Why Spacecraft Crash — and Deliberate Impacts as Science',
    summary:
      'Guidance anomalies, engine cutoff errors, and steep atmospheric entries create crash debris fields, while deliberate impacts turn spent hardware into scientific probes.',
    generalPrinciple:
      'Terminal descent is a single-string sequence lasting minutes: attitude sensor saturation, propellant slosh, or faulty altitude-cutoff logic leaves insufficient margin for recovery. Conversely, deliberate impacts direct spent upper stages or retired orbiters at known angles and velocities to excavate buried material or excite seismic waves.',
    missionSpecificContext:
      'Deliberate impacts include Ranger 7 (close-range imaging), Apollo S-IVB stages (seismic sources), LCROSS Centaur (excavating water ice in Cabeus Crater), and GRAIL Ebb & Flow. Accidental crashes include Surveyor 2, Luna 25 (57.865°S, 61.36°E), Chandrayaan-2 Vikram (70.8810°S, 22.7840°E), Mars 2, and ExoMars Schiaparelli (2.9°S, 6.1°E).',
    relatedMissionIds: [
      'mission-lcross',
      'mission-grail',
      'mission-chandrayaan-2',
      'mission-luna-25',
      'mission-schiaparelli'
    ],
    sourceIds: ['src-nasa-chandrayaan2', 'src-nssdca-impacts', 'src-mars3-esa']
  }
];
