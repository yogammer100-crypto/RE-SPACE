import * as THREE from 'three';
import { CelestialBody, SchematicType } from '../types/space';

/**
 * Builds composite 3-12 part procedural 3D technical schematic models for the
 * Artifact Detail view, grounded cleanly on a subtle planetary regolith plinth.
 */
export function buildArtifactSchematicGroup(
  schematicType: SchematicType,
  body: CelestialBody
): THREE.Group {
  const root = new THREE.Group();

  // Materials with distinct PBR roughness/metalness contrast
  const goldFoilMat = new THREE.MeshStandardMaterial({
    color: '#d4a138',
    metalness: 0.88,
    roughness: 0.26
  });
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: '#aeb7c4',
    metalness: 0.85,
    roughness: 0.28
  });
  const darkAlloyMat = new THREE.MeshStandardMaterial({
    color: '#2c3440',
    metalness: 0.65,
    roughness: 0.48
  });
  const whiteCeramicMat = new THREE.MeshStandardMaterial({
    color: '#e6eaef',
    metalness: 0.12,
    roughness: 0.55
  });
  const solarMat = new THREE.MeshStandardMaterial({
    color: '#162b4d',
    metalness: 0.4,
    roughness: 0.2
  });
  const cyanAccentMat = new THREE.MeshStandardMaterial({
    color: '#22d3ee',
    metalness: 0.2,
    roughness: 0.35,
    emissive: '#083344',
    emissiveIntensity: 0.45
  });
  const regolithMat = new THREE.MeshStandardMaterial({
    color: body === 'Mars' ? '#7b4129' : '#4a4e54',
    metalness: 0.0,
    roughness: 0.92
  });

  // Grounding circular regolith plinth
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(2.15, 2.25, 0.14, 48),
    regolithMat
  );
  plinth.position.y = -0.07;
  plinth.receiveShadow = true;
  root.add(plinth);

  const rimRing = new THREE.Mesh(
    new THREE.RingGeometry(2.16, 2.22, 64),
    new THREE.MeshBasicMaterial({
      color: '#334155',
      side: THREE.DoubleSide
    })
  );
  rimRing.rotation.x = -Math.PI / 2;
  rimRing.position.y = 0.004;
  root.add(rimRing);

  const craft = new THREE.Group();

  if (schematicType === 'lm-descent') {
    // Primary octagonal hull wrapped in thermal gold foil
    const hull = new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 0.96, 0.72, 8),
      goldFoilMat
    );
    hull.position.y = 0.88;
    hull.castShadow = true;
    craft.add(hull);

    // Top structural ring / ascent interface
    const upperDeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.82, 0.16, 8),
      darkAlloyMat
    );
    upperDeck.position.y = 1.32;
    upperDeck.castShadow = true;
    craft.add(upperDeck);

    // Descent engine bell
    const bell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.32, 0.42, 24, 1, true),
      darkAlloyMat
    );
    bell.position.y = 0.38;
    craft.add(bell);

    // Four articulated landing legs + circular footpads grounded at y=0
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const legGroup = new THREE.Group();
      legGroup.rotation.y = angle;

      const strut = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 1.15, 12),
        goldFoilMat
      );
      strut.position.set(1.08, 0.52, 0);
      strut.rotation.z = 0.45;
      strut.castShadow = true;
      legGroup.add(strut);

      const brace = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8),
        titaniumMat
      );
      brace.position.set(0.85, 0.56, 0);
      brace.rotation.z = -0.65;
      legGroup.add(brace);

      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.24, 0.05, 20),
        goldFoilMat
      );
      pad.position.set(1.36, 0.025, 0);
      pad.castShadow = true;
      legGroup.add(pad);

      craft.add(legGroup);
    }
  } else if (schematicType === 'rover-wheeled') {
    // Main warm electronics box chassis
    const bodyBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.38, 0.85),
      whiteCeramicMat
    );
    bodyBox.position.y = 0.62;
    bodyBox.castShadow = true;
    craft.add(bodyBox);

    // Top deck solar / radiator panel
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 0.06, 0.92),
      body === 'Moon' ? solarMat : goldFoilMat
    );
    deck.position.y = 0.84;
    deck.castShadow = true;
    craft.add(deck);

    // Remote sensing mast + stereo camera head
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.055, 0.68, 12),
      titaniumMat
    );
    mast.position.set(0.36, 1.18, 0.16);
    mast.castShadow = true;
    craft.add(mast);

    const camHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.14, 0.18),
      whiteCeramicMat
    );
    camHead.position.set(0.36, 1.54, 0.16);
    camHead.castShadow = true;
    craft.add(camHead);

    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.06, 16),
      cyanAccentMat
    );
    lens.rotation.z = Math.PI / 2;
    lens.position.set(0.51, 1.54, 0.16);
    craft.add(lens);

    // High-gain antenna dish
    const dish = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.1, 20, 1, true),
      titaniumMat
    );
    dish.position.set(-0.34, 1.08, -0.18);
    dish.rotation.x = 0.45;
    craft.add(dish);

    // Six rocker-bogie wheels resting flush on y=0
    const wheelOffsets = [-0.55, 0, 0.55];
    for (const wx of wheelOffsets) {
      for (const side of [-1, 1]) {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.18, 0.14, 20),
          darkAlloyMat
        );
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(wx, 0.18, side * 0.58);
        wheel.castShadow = true;
        craft.add(wheel);

        const strut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.028, 0.028, 0.44, 8),
          titaniumMat
        );
        strut.position.set(wx * 0.9, 0.38, side * 0.48);
        strut.rotation.x = side * 0.35;
        craft.add(strut);
      }
    }
  } else if (schematicType === 'lander-stationary') {
    const deck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.86, 0.78, 0.34, 6),
      whiteCeramicMat
    );
    deck.position.y = 0.68;
    deck.castShadow = true;
    craft.add(deck);

    // Twin circular or polygonal solar arrays
    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.04, 16),
        solarMat
      );
      panel.position.set(side * 1.18, 0.74, 0);
      panel.castShadow = true;
      craft.add(panel);
    }

    // Science mast / seismometer dome
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      goldFoilMat
    );
    dome.position.set(0, 0.85, 0);
    craft.add(dome);

    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.035, 0.75, 10),
      titaniumMat
    );
    antenna.position.set(-0.28, 1.15, 0.22);
    craft.add(antenna);

    // Three lander legs with footpads
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const legGroup = new THREE.Group();
      legGroup.rotation.y = angle;
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.78, 10),
        titaniumMat
      );
      leg.position.set(0.82, 0.36, 0);
      leg.rotation.z = 0.42;
      leg.castShadow = true;
      legGroup.add(leg);

      const foot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.16, 0.04, 16),
        darkAlloyMat
      );
      foot.position.set(0.98, 0.02, 0);
      legGroup.add(foot);

      craft.add(legGroup);
    }
  } else if (schematicType === 'instrument-package') {
    // Deployed surface experiment box + retroreflector / seismometer shroud
    const basePlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.08, 0.95),
      titaniumMat
    );
    basePlate.position.y = 0.04;
    basePlate.castShadow = true;
    craft.add(basePlate);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.3, 0.56, 20),
      goldFoilMat
    );
    core.position.y = 0.36;
    core.castShadow = true;
    craft.add(core);

    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.14, 0.48),
      whiteCeramicMat
    );
    cap.position.y = 0.68;
    craft.add(cap);

    // Corner-cube reflector array detail
    const prismPanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.06, 0.36),
      cyanAccentMat
    );
    prismPanel.position.y = 0.77;
    craft.add(prismPanel);

    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.03, 0.44),
        solarMat
      );
      wing.position.set(side * 0.72, 0.32, 0);
      wing.rotation.z = side * -0.18;
      wing.castShadow = true;
      craft.add(wing);
    }
  } else if (schematicType === 'helicopter') {
    // Ingenuity-class coaxial rotorcraft
    const fuselage = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.28, 0.36),
      goldFoilMat
    );
    fuselage.position.y = 0.52;
    fuselage.castShadow = true;
    craft.add(fuselage);

    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.55, 12),
      darkAlloyMat
    );
    mast.position.y = 0.85;
    craft.add(mast);

    // Coaxial rotor blades
    const rotor1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.02, 0.12),
      darkAlloyMat
    );
    rotor1.position.y = 0.96;
    rotor1.rotation.y = 0.35;
    craft.add(rotor1);

    const rotor2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.02, 0.12),
      darkAlloyMat
    );
    rotor2.position.y = 1.06;
    rotor2.rotation.y = -0.45;
    craft.add(rotor2);

    const topSolar = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.03, 0.24),
      solarMat
    );
    topSolar.position.y = 1.14;
    craft.add(topSolar);

    for (let i = 0; i < 4; i++) {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.014, 0.58, 8),
        darkAlloyMat
      );
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      leg.position.set(Math.cos(a) * 0.28, 0.25, Math.sin(a) * 0.28);
      leg.rotation.z = Math.cos(a) * 0.45;
      leg.rotation.x = -Math.sin(a) * 0.45;
      craft.add(leg);
    }
  } else {
    // impact-site or debris-field: raised crater rim + scattered metallic debris fragments
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.08, 0.16, 16, 48),
      regolithMat
    );
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(1, 1, 0.48);
    rim.position.y = 0.06;
    craft.add(rim);

    const innerRim = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.04, 48),
      new THREE.MeshBasicMaterial({
        color: schematicType === 'debris-field' ? '#f59e0b' : '#22d3ee',
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      })
    );
    innerRim.rotation.x = -Math.PI / 2;
    innerRim.position.y = 0.02;
    craft.add(innerRim);

    const fragmentPositions: Array<[number, number, number, number]> = [
      [0.42, 0.08, -0.35, 0.4],
      [-0.55, 0.06, 0.28, 1.2],
      [0.12, 0.05, 0.68, 2.1],
      [-0.25, 0.07, -0.62, 0.8],
      [0.85, 0.05, 0.34, 1.7]
    ];
    for (const [fx, fy, fz, rot] of fragmentPositions) {
      const shard = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.09, 0.14),
        schematicType === 'debris-field' ? whiteCeramicMat : titaniumMat
      );
      shard.position.set(fx, fy, fz);
      shard.rotation.set(0.2, rot, 0.15);
      shard.castShadow = true;
      craft.add(shard);
    }
  }

  root.add(craft);
  return root;
}
