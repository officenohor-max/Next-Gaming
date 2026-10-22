import { Game, NewsArticle } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'game-1',
    slug: 'grand-theft-auto-vi',
    title: 'Grand Theft Auto VI',
    tagline: 'Vice City evolved: a cinematic descent into the criminal neon underbelly.',
    coverImage: '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
    heroBanner: '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
    releaseDate: '2026 (PC Window Following Console)',
    releaseDateSortable: '2026-10-15',
    releaseStatus: 'Estimated',
    developer: 'Rockstar Games',
    publisher: 'Take-Two Interactive',
    platforms: ['PC (Rockstar Games Launcher)', 'Steam', 'Epic Games Store'],
    genres: ['Open World', 'Action and Adventure'],
    engine: 'Rockstar Advanced Game Engine (RAGE 9)',
    trailerYoutubeId: 'QdBZY2fkU-0',
    overview: 'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond, in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    storyConfirmed: 'The narrative centers around Lucia and her male partner (Jason) operating as a Bonnie and Clyde-inspired criminal duo navigativing robbery rings, cartels, and high-stakes heists across the sun-drenched beaches and murky swamplands of Leonida. Lucia is introduced in a correctional facility before returning to criminal enterprises.',
    storySpeculation: 'Community analysis of leaked data suggests dual protagonist switching with distinct relationship dynamics and trust mechanics, with branching heist approaches depending on tactical planning.',
    isReleased: false,
    hasSpoilers: false,
    worldBuilding: 'Leonida is Rockstar’s largest map to date, featuring the bustling coastal metropolis of Vice City, the Keys, Hamlet, and dense tropical wetlands with simulated wildlife ecosystems, reactive pedestrian density, and dynamic weather fronts.',
    characters: [
      {
        id: 'c1',
        name: 'Lucia Caminos',
        role: 'Protagonist',
        description: 'A sharp, resilient criminal seeking freedom and financial dominance following time served in prison.'
      },
      {
        id: 'c2',
        name: 'Jason',
        role: 'Protagonist / Partner',
        description: 'Lucia’s partner in crime, methodical wheelman and tactical combatant.'
      }
    ],
    gameplayMechanics: [
      'Dual-protagonist tactical heist orchestration',
      'Realistic inventory management with vehicle trunk storage',
      'Enhanced physical stealth, proning, and hostage intimidation',
      'Next-gen water physics, boat aerodynamics, and vehicle deformation',
      'In-game social media platform dynamically reacting to player notoriety'
    ],
    missionsAndExploration: 'Nonlinear multi-phase robbery setups, underground street racing circuits, cartel smuggling corridors, and deep Everglades wilderness tracking.',
    visualFeatures: [
      'Hardware-accelerated Path Tracing with full global illumination',
      'Physically based dynamic volumetric clouds and tropical hurricanes',
      'Subsurface scattering on skin, sweat, and wet asphalt shaders',
      'NVIDIA DLSS 3.7 / AMD FSR 3.1 / Intel XeSS multi-vendor upscaling'
    ],
    combatSystem: 'Tactical third-person cover shooter with fluid corner peeking, procedural recoil, real-time disarming, and localized ballistic damage.',
    weaponsAndVehicles: [
      'Authentic firearms, suppressed carbines, tactical sidearms',
      'Custom muscle cars, offshore powerboats, helicopters, vintage lowriders'
    ],
    minRequirements: {
      os: 'Windows 11 64-bit (22H2 or newer)',
      cpu: 'Intel Core i7-8700K or AMD Ryzen 5 3600',
      gpu: 'NVIDIA GeForce RTX 2070 Super (8GB) or AMD Radeon RX 6700 XT (12GB)',
      ram: '16 GB DDR4',
      vram: '8 GB',
      storage: '150 GB available space (NVMe SSD required)',
      directx: 'DirectX 12 Ultimate',
      notes: 'Requires High-Speed NVMe SSD for fast streaming of dense urban geometry.'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i7-13700K or AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA GeForce RTX 4080 (16GB) or AMD Radeon RX 7900 XTX (24GB)',
      ram: '32 GB DDR5',
      vram: '16 GB',
      storage: '150 GB available space (PCIe 4.0 NVMe SSD)',
      directx: 'DirectX 12 Ultimate',
      notes: 'Targeting 4K 60 FPS with Ray Tracing enabled.'
    },
    screenshots: [
      '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
      '/src/assets/images/hero_cyber_orion_1792661614409.jpg'
    ],
    recentUpdates: [
      {
        date: 'May 2025',
        title: 'Take-Two Confirms Fall 2025 Console Window, PC In Active Engineering',
        summary: 'Take-Two Interactive quarterly earnings call reiterated targeted late 2025 release for consoles with PC port optimization in full pipeline.',
        source: 'Take-Two Earnings Release'
      }
    ],
    sources: [
      { title: 'Rockstar Games Official Trailer 1', url: 'https://www.rockstargames.com/VI' },
      { title: 'Take-Two Interactive SEC Filing', url: 'https://www.take2games.com' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: true,
    isTrending: true,
    rankingScore: 99
  },
  {
    id: 'game-2',
    slug: 'the-witcher-4-polaris',
    title: 'The Witcher 4: Polaris',
    tagline: 'A new Witcher saga begins in the frigid northern wilderness.',
    coverImage: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    heroBanner: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    releaseDate: '2026 - 2027',
    releaseDateSortable: '2027-03-30',
    releaseStatus: 'TBA',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt Red',
    platforms: ['PC (GOG)', 'Steam', 'Epic Games Store'],
    genres: ['RPG', 'Fantasy', 'Open World'],
    engine: 'Unreal Engine 5.4 Custom Branch',
    trailerYoutubeId: 'b8Lq3K0wJ6w',
    overview: 'Polaris marks the kickoff of a brand-new AAA RPG trilogy within the Witcher universe, transitioning from REDengine to a bespoke collaborative branch of Epic Games’ Unreal Engine 5.',
    storyConfirmed: 'The game features a brand-new Witcher school medallion depicting a Lynx, leaving Geralt’s concluded trilogy behind to chronicle a fresh generation of monster hunters amidst political upheaval and ancient arcane blizzards.',
    storySpeculation: 'Theories suggest a protagonist hailing from a resurrected or hidden northern Witcher guild, possibly collaborating with established characters like Ciri while venturing into unmapped boreal territories.',
    isReleased: false,
    hasSpoilers: false,
    worldBuilding: 'Unreal Engine 5’s Nanite and Lumen power dynamic snow drifts, sub-zero survival environments, folklore-inspired villages, and gargantuan eldritch monstrosities rooted in Slavic and Nordic mythologies.',
    characters: [
      {
        id: 'c3',
        name: 'The Lynx Witcher',
        role: 'Protagonist (Unconfirmed Name)',
        description: 'A trained mutant hunter wielding dual silver and meteorite swords, attuned to predatory tracking senses.'
      }
    ],
    gameplayMechanics: [
      'Fluid directional swordplay with parrying and posture breaking',
      'Advanced alchemy brewing with toxicity thresholds and field crafting',
      'Deep Witcher Signs spell manipulation with elemental interactions',
      'Dynamic monster tracking using scents, footprints, and environmental clues'
    ],
    missionsAndExploration: 'Investigation-driven contracts with multi-layered detective clues, moral ambiguities where no choice is cleanly benevolent, and treacherous mountain ascents.',
    visualFeatures: [
      'Lumen hardware ray-traced global illumination and reflections',
      'Nanite micro-polygon geometry rendering every bark fissure and icicle',
      'Chaos physics for realistic monster fur, cloaks, and falling avalanches',
      'Next-generation facial performance capture and dynamic lip sync'
    ],
    combatSystem: 'Fast-paced, tactical action RPG combat combining sword martial arts, signs, bombs, and cross-bow traps.',
    weaponsAndVehicles: [
      'Silver swords for the supernatural, steel and meteorite for beasts and mortals',
      'Mount system with specialized horse and dogsled mechanics for icy terrain'
    ],
    minRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i5-12600K or AMD Ryzen 5 7600X',
      gpu: 'NVIDIA GeForce RTX 3060 (12GB) or AMD Radeon RX 6700 XT',
      ram: '16 GB DDR5',
      vram: '10 GB',
      storage: '120 GB NVMe SSD',
      directx: 'DirectX 12',
      notes: 'DirectStorage support mandatory.'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i7-14700K or AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA GeForce RTX 4070 Ti Super (16GB) or AMD Radeon RX 7900 XT',
      ram: '32 GB DDR5',
      vram: '16 GB',
      storage: '120 GB PCIe 4.0 NVMe SSD',
      directx: 'DirectX 12 Ultimate',
      notes: 'Delivers 1440p / 4K with ray-traced reflections and ultra draw distance.'
    },
    screenshots: [
      '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
      '/src/assets/images/hero_deep_space_1792661617143.jpg'
    ],
    recentUpdates: [
      {
        date: 'Late 2024',
        title: 'Over 400 Developers Dedicated to Polaris at CDPR',
        summary: 'CD Projekt confirmed that project Polaris is in full production phase with the largest production team in company history.',
        source: 'CD Projekt Official Q3 Report'
      }
    ],
    sources: [
      { title: 'CDPR Strategy Update: Polaris', url: 'https://www.cdprojekt.com' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: true,
    isTrending: true,
    rankingScore: 97
  },
  {
    id: 'game-3',
    slug: 'cyberpunk-project-orion',
    title: 'Cyberpunk 2: Project Orion',
    tagline: 'The future of cyberpunk dystopian roleplaying expands across mega-cities.',
    coverImage: '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
    heroBanner: '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
    releaseDate: 'Late 2027 (TBA)',
    releaseDateSortable: '2027-11-20',
    releaseStatus: 'TBA',
    developer: 'CD Projekt Red (Boston & Vancouver)',
    publisher: 'CD Projekt Red',
    platforms: ['PC (GOG)', 'Steam', 'Epic Games Store'],
    genres: ['RPG', 'Sci-Fi', 'Open World'],
    engine: 'Unreal Engine 5 Custom Pipeline',
    trailerYoutubeId: 'UnA7tepsc7s',
    overview: 'Project Orion is the full-fledged sequel to Cyberpunk 2077, built by CD Projekt’s North American studios to take the gritty sci-fi franchise into its next graphical and mechanical frontier.',
    storyConfirmed: 'Following the events of the Night City corporate clashes and Blackwall breaches, Orion explores heightened tensions between mega-corporations, Rogue AIs breaching cyberware defenses, and synthetic underworld cartels.',
    storySpeculation: 'Reports suggest player freedom in choosing origin lifepaths with even more distinct narrative arcs, potentially expanding beyond Night City into the Orbital Crystal Palace or neo-industrial badlands.',
    isReleased: false,
    hasSpoilers: false,
    worldBuilding: 'Vertical architectural density with fully enterable skyscrapers, holographic skyways, dynamic aerial traffic systems, and simulated corporate espionage networks.',
    characters: [
      {
        id: 'c4',
        name: 'Blackwall Netrunner',
        role: 'Central Narrative Figure',
        description: 'An elite net specialist navigating the forbidden digital abyss beyond the Blackwall perimeter.'
      }
    ],
    gameplayMechanics: [
      'Cyberware modular body-sculpting with active and passive augmentations',
      'Real-time neural net warfare and remote cyber-puppet control',
      'Deep branching dialogue with persuasion checks, bionic body-language reading',
      'Vehicle combat with mounted weapons and autopiloted aerial extraction'
    ],
    missionsAndExploration: 'High-rise corporate extractions, street brawl investigations, subterranean sewer infiltrations, and high-frequency stock hack sabotage.',
    visualFeatures: [
      'Full Ray Reconstruction with real-time neural denoisers',
      'Native Path Tracing across reflective glass, water puddles, and neon lights',
      'Unreal Engine 5 Lumen and Substrate materials for photorealistic synthetics',
      'Extreme crowd density simulations with individual AI behavior routines'
    ],
    combatSystem: 'First-person immersive combat blending cybernetic martial arts, high-caliber smart firearms, and cyber-hacking.',
    weaponsAndVehicles: [
      'Tech railguns, smart submachine guns, monowire whips, thermal blades',
      'Flying aerodynes, armored hover-bikes, high-speed concept supercars'
    ],
    minRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i7-12700K or AMD Ryzen 7 5800X',
      gpu: 'NVIDIA GeForce RTX 3070 (8GB) or AMD Radeon RX 6800 XT (16GB)',
      ram: '16 GB',
      vram: '8 GB',
      storage: '100 GB NVMe SSD',
      directx: 'DirectX 12 Ultimate',
      notes: 'SSD mandatory. Ray tracing requires RTX 30-series or RX 7000-series minimum.'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i9-14900K or AMD Ryzen 9 7950X3D',
      gpu: 'NVIDIA GeForce RTX 4080 Super or RTX 5080',
      ram: '32 GB DDR5',
      vram: '16 GB',
      storage: '100 GB Gen4 NVMe SSD',
      directx: 'DirectX 12 Ultimate',
      notes: 'Optimized for Full Path Tracing at 4K with DLSS 3 Frame Generation.'
    },
    screenshots: [
      '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
      '/src/assets/images/hero_deep_space_1792661617143.jpg'
    ],
    recentUpdates: [
      {
        date: '2025',
        title: 'Core Development Leadership Assembled in Boston',
        summary: 'Veteran leads from Cyberpunk 2077: Phantom Liberty have established operations at CDPR Boston to lead Orion full-time.',
        source: 'CD Projekt Press Release'
      }
    ],
    sources: [
      { title: 'CD Projekt Studio Update', url: 'https://www.cdprojekt.com' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: true,
    isTrending: true,
    rankingScore: 95
  },
  {
    id: 'game-4',
    slug: 'intergalactic-unknown-horizons',
    title: 'Intergalactic: Unknown Horizons',
    tagline: 'Hard sci-fi deep space odyssey confronting alien megastructures.',
    coverImage: '/src/assets/images/hero_deep_space_1792661617143.jpg',
    heroBanner: '/src/assets/images/hero_deep_space_1792661617143.jpg',
    releaseDate: 'November 18, 2025',
    releaseDateSortable: '2025-11-18',
    releaseStatus: 'Confirmed',
    developer: 'Aetheria Interactive',
    publisher: 'Frontier Frontier Publishing',
    platforms: ['PC (Steam)', 'Epic Games Store'],
    genres: ['Sci-Fi', 'Action and Adventure', 'Strategy'],
    engine: 'Unreal Engine 5.4',
    trailerYoutubeId: 'vjB43NkNi-U',
    overview: 'An epic hard-science fiction adventure set around the frontier star Kepler-186f. Players lead an expedition team investigating ancient crystalline monoliths orbiting a ringed gas giant while managing orbital stations and planetary landers.',
    storyConfirmed: 'Commander Elena Vance discovers an automated beacon transmitting mathematical proofs from an abandoned planetary ring system. As communications with Earth drop, the crew uncovers evidence of an extinct civilization that collapsed while manipulating stellar gravity wells.',
    storySpeculation: 'Players will be confronted with multiple moral determinations regarding whether to weaponize cosmic anomalies or quarantine the system from human expansion.',
    isReleased: false,
    hasSpoilers: false,
    worldBuilding: 'Features scientifically grounded orbital mechanics, realistic vacuum sound attenuation, zero-g EVA spatial operations, and alien crystal biomes.',
    characters: [
      {
        id: 'c5',
        name: 'Commander Elena Vance',
        role: 'Expedition Commander',
        description: 'Ex-navy orbital engineer and astrophysicist specializing in deep-space gravitational harmonics.'
      },
      {
        id: 'c6',
        name: 'A.R.I.A.',
        role: 'Synthetic Auxiliary AI',
        description: 'Sub-sentient ship intelligence calculating orbital trajectories and structural stress loads.'
      }
    ],
    gameplayMechanics: [
      'Realistic zero-gravity momentum and magnetic tether mechanics',
      'Planetary rover piloting with mineral spectrometry and soil sampling',
      'Modular base construction on hazardous atmospheric surfaces',
      'Deep ship system management including life support, heat dissipation, and fuel reserves'
    ],
    missionsAndExploration: 'Landing on tidally locked exoplanets, spelunking inside hollow asteroids, and restoring power to adrift derelict megaships.',
    visualFeatures: [
      'Accurate orbital light scattering and planetary shadow occlusions',
      'Sub-surface crystal refraction and volumetric nebula illumination',
      'Realistic spacesuit visor condensation and micro-meteorite abrasions',
      'Native HDR 1000 nits calibration with true deep black starfields'
    ],
    combatSystem: 'Tactical ranged defense against malfunctioning terraforming automations and localized spatial spatial anomalies.',
    weaponsAndVehicles: [
      'Mining plasma cutters, kinetic pulse carbines, seismic survey charges',
      'Multi-terrain exploratory rover, heavy transport lander, sub-orbital shuttle'
    ],
    minRequirements: {
      os: 'Windows 10 / 11 (64-bit)',
      cpu: 'AMD Ryzen 5 5600X or Intel Core i5-12400F',
      gpu: 'NVIDIA GeForce RTX 3060 (12GB) or AMD Radeon RX 6700 XT',
      ram: '16 GB DDR4',
      vram: '8 GB',
      storage: '90 GB NVMe SSD',
      directx: 'DirectX 12',
      notes: 'SSD required for seamless sub-orbital atmospheric entry.'
    },
    recommendedRequirements: {
      os: 'Windows 11 (64-bit)',
      cpu: 'AMD Ryzen 7 7800X3D or Intel Core i7-13700K',
      gpu: 'NVIDIA GeForce RTX 4070 Ti (12GB) or AMD Radeon RX 7900 XT (20GB)',
      ram: '32 GB DDR5',
      vram: '12 GB',
      storage: '90 GB PCIe 4.0 NVMe SSD',
      directx: 'DirectX 12 Ultimate',
      notes: 'Enables cinematic volumetric nebulae and ultra ray-traced shadows.'
    },
    screenshots: [
      '/src/assets/images/hero_deep_space_1792661617143.jpg',
      '/src/assets/images/hero_cyber_orion_1792661614409.jpg'
    ],
    recentUpdates: [
      {
        date: 'September 2025',
        title: 'Deep Space Gameplay Deep Dive Released',
        summary: '25-minute uninterrupted raw gameplay demonstrated planetary entry, zero-G docking, and surface base construction.',
        source: 'Publisher Showcase 2025'
      }
    ],
    sources: [
      { title: 'Official Steam Store Page', url: 'https://store.steampowered.com' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: true,
    isTrending: false,
    rankingScore: 88
  },
  {
    id: 'game-5',
    slug: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    tagline: 'An ancient journey into Chinese mythology with breathtaking visuals.',
    coverImage: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    heroBanner: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    releaseDate: 'August 20, 2024',
    releaseDateSortable: '2024-08-20',
    releaseStatus: 'Released',
    developer: 'Game Science',
    publisher: 'Game Science',
    platforms: ['PC (Steam)', 'PC (Epic Games Store)', 'WeGame'],
    genres: ['Action and Adventure', 'RPG', 'Soulslike', 'Fantasy'],
    engine: 'Unreal Engine 5.3',
    trailerYoutubeId: 'O2nK-Xf86vU',
    overview: 'Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead.',
    storyConfirmed: 'As the Destined One, you embark on a perilous pilgrimage to gather six lost relics of Sun Wukong following the legendary Monkey King’s disappearance after refusing celestial servitude. Encounter iconic mythological beings, corrupted deities, and ancient demons across mountains, temples, and snowscapes.',
    isReleased: true,
    hasSpoilers: true,
    spoilerContent: 'In the climactic final chapter at Mount Huaguo, the Destined One faces the Stone Monkey and the Broken Shell of the Great Sage. Defeating the Great Sage allows the player to either claim the golden headband and perpetuate the celestial cycle, or unlock the true secret ending by defeating Erlang Shen and reclaiming Wukong’s memories without subjugation.',
    worldBuilding: 'Game Science digitized real historical Chinese Buddhist and Taoist temple architecture, stone pagodas, and cliffside shrines using high-density 3D photogrammetry.',
    characters: [
      {
        id: 'c7',
        name: 'The Destined One',
        role: 'Protagonist',
        description: 'A silent monkey warrior chosen to walk the path of the Great Sage Sun Wukong and recover his scattered relics.'
      },
      {
        id: 'c8',
        name: 'Bajie (Pigsy)',
        role: 'Companion / Guide',
        description: 'Sun Wukong’s former companion, humorous yet haunted by his ancient celestial romance.'
      },
      {
        id: 'c9',
        name: 'Erlang Shen',
        role: 'Divine Rival',
        description: 'The three-eyed celestial warrior of heaven testing the Destined One’s martial worthiness.'
      }
    ],
    gameplayMechanics: [
      'Three distinct staff martial stances: Smash Stance, Pillar Stance, and Thrust Stance',
      'The 72 Earthly Transformations allowing transformation into defeated bosses',
      'Spellcraft: Immobilize, Cloud Step, Rock Solid parry, and A Pluck of Many clones',
      'Gourd drinking and medicine soaking mechanics for custom combat buffs'
    ],
    missionsAndExploration: 'Multi-chapter journeys across Black Wind Mountain, Yellow Wind Ridge, the New West snowfields, and the Webbed Hollow caverns.',
    visualFeatures: [
      'Full Ray Tracing / Path Tracing with multi-bounce reflections',
      'Full Nanite virtualized geometry rendering authentic Chinese stone carvings',
      'DLSS 3.5 Ray Reconstruction and Frame Generation for optimal PC framerates'
    ],
    combatSystem: 'High-speed evasive martial combat emphasizing precision dodges, focus point generation, and crushing heavy staff finishers.',
    weaponsAndVehicles: [
      'Ruyi Jingu Bang staff and mythic variants crafted from spirit relics',
      'Somersault Cloud used for airborne exploration in chapter 6'
    ],
    minRequirements: {
      os: 'Windows 10 / 11 64-bit',
      cpu: 'Intel Core i5-8400 or AMD Ryzen 5 1600',
      gpu: 'NVIDIA GeForce GTX 1060 (6GB) or AMD Radeon RX 580 (8GB)',
      ram: '16 GB',
      vram: '6 GB',
      storage: '130 GB HDD (SSD strongly recommended)',
      directx: 'DirectX 11 / 12',
      notes: 'Lowest settings 1080p 30fps.'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i7-9700 or AMD Ryzen 5 5500',
      gpu: 'NVIDIA GeForce RTX 2060 / RTX 3060 or AMD Radeon RX 5700 XT',
      ram: '16 GB',
      vram: '8 GB',
      storage: '130 GB SSD space required',
      directx: 'DirectX 12',
      notes: '1080p 60fps at high settings without Ray Tracing.'
    },
    screenshots: [
      '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
      '/src/assets/images/hero_vice_overdrive_1792661617541.jpg'
    ],
    recentUpdates: [
      {
        date: 'October 2024',
        title: 'Patch 1.0.9.15179 Optimizes PC Memory Allocation',
        summary: 'Fixed boss battle crash bugs and improved DLSS frame pacing on modern high-core CPUs.',
        source: 'Game Science Official Steam Announcement'
      }
    ],
    sources: [
      { title: 'Black Myth Official Website', url: 'https://heishenhua.com' },
      { title: 'Steam Store Hub', url: 'https://store.steampowered.com/app/2358720' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: false,
    isTrending: true,
    rankingScore: 94,
    rating: 9.6
  },
  {
    id: 'game-6',
    slug: 'monster-hunter-wilds',
    title: 'Monster Hunter Wilds',
    tagline: 'Living ecosystems, relentless weather, and colossal beast hunts on PC.',
    coverImage: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    heroBanner: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    releaseDate: 'February 28, 2025',
    releaseDateSortable: '2025-02-28',
    releaseStatus: 'Confirmed',
    developer: 'Capcom',
    publisher: 'Capcom',
    platforms: ['PC (Steam)'],
    genres: ['Action and Adventure', 'RPG'],
    engine: 'RE Engine (Next-Gen Overhaul)',
    trailerYoutubeId: 'jL3sUuB_j_o',
    overview: 'The next generation in hunting action. Monster Hunter Wilds introduces dynamic shifting biomes with relentless sandstorms, lightning hazards, and herds of apex monsters fighting for territory.',
    storyConfirmed: 'The Hunter Guild dispatches the Research Commission into the Forbidden Lands, a mysterious unmapped wilderness where ancient civilization ruins intertwine with the terrifying new apex beast, the Arkveld (the White Wraith).',
    isReleased: false,
    hasSpoilers: false,
    worldBuilding: 'Maps transition in real time between the Fallow (harsh, resource-scarce sandstorm storms) and the Inclemency / Plenty seasons when lush vegetation blooms and subterranean waters surge.',
    characters: [
      {
        id: 'c10',
        name: 'The Hunter',
        role: 'Player Character',
        description: 'Elite guild hunter equipped with a Seikret mount and dual weapon loadout.'
      },
      {
        id: 'c11',
        name: 'Alma',
        role: 'Guild Handler',
        description: 'Intelligent field coordinator overseeing guild assignments and scientific surveys.'
      }
    ],
    gameplayMechanics: [
      'Focus Mode aiming allowing targeted attacks on monster wounds',
      'Seikret mount enabling mobile weapon sharpening, potion drinking, and secondary weapon switching',
      'Dynamic ecosystem pack behaviors where dozens of monsters clash simultaneously',
      'Seamless transition from base camp directly into the hunt with zero loading screens'
    ],
    missionsAndExploration: 'Windward Plains expeditions, crimson river basin tracking, and subterranean caverns filled with lightning-conducting ore deposits.',
    visualFeatures: [
      'Capcom RE Engine real-time volumetric weather simulation',
      'Detailed fur shading, mud deformation, and tail severing physics',
      'Support for ultrawide 21:9 and 32:9 displays on PC'
    ],
    combatSystem: 'All 14 iconic weapons return with Focus Strikes, clash counters, and power clashes against charging monsters.',
    weaponsAndVehicles: [
      'Great Sword, Long Sword, Dual Blades, Bow, Heavy Bowgun, Charge Blade, Switch Axe',
      'Feathered agile Seikret mount capable of automatic navigation'
    ],
    minRequirements: {
      os: 'Windows 10 (64-bit)',
      cpu: 'Intel Core i5-10600 or AMD Ryzen 5 3600',
      gpu: 'NVIDIA GeForce GTX 1660 Super (6GB) or AMD Radeon RX 5600 XT (6GB)',
      ram: '16 GB RAM',
      vram: '6 GB',
      storage: '140 GB SSD required',
      directx: 'DirectX 12',
      notes: '1080p 30fps at Lowest settings with Upscaling.'
    },
    recommendedRequirements: {
      os: 'Windows 10 / 11 (64-bit)',
      cpu: 'Intel Core i5-11600K or AMD Ryzen 5 3600X',
      gpu: 'NVIDIA GeForce RTX 2070 Super / RTX 4060 or AMD Radeon RX 6700 XT',
      ram: '16 GB RAM',
      vram: '8 GB',
      storage: '140 GB SSD required',
      directx: 'DirectX 12',
      notes: '1080p 60fps at Medium settings with Frame Generation enabled.'
    },
    screenshots: [
      '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
      '/src/assets/images/hero_vice_overdrive_1792661617541.jpg'
    ],
    recentUpdates: [
      {
        date: 'October 2024',
        title: 'Open Beta Test Details Announced for Steam',
        summary: 'Crossplay open beta announced with character creation transfer to full release.',
        source: 'Capcom Official Announcement'
      }
    ],
    sources: [
      { title: 'Capcom Monster Hunter Wilds Portal', url: 'https://www.monsterhunter.com/wilds' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: true,
    isTrending: true,
    rankingScore: 92
  },
  {
    id: 'game-7',
    slug: 'stalker-2-heart-of-chornobyl',
    title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
    tagline: 'Survive the radioactive Chornobyl Exclusion Zone in brutal Unreal Engine 5 fidelity.',
    coverImage: '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
    heroBanner: '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
    releaseDate: 'November 20, 2024',
    releaseDateSortable: '2024-11-20',
    releaseStatus: 'Released',
    developer: 'GSC Game World',
    publisher: 'GSC Game World',
    platforms: ['PC (Steam)', 'PC (GOG)', 'Epic Games Store', 'PC Game Pass'],
    genres: ['FPS and Tactical Shooter', 'Survival and Horror', 'Open World', 'Sci-Fi'],
    engine: 'Unreal Engine 5.1',
    trailerYoutubeId: 'SjDMwsbaSd8',
    overview: 'Discover the vast Chornobyl Exclusion Zone full of dangerous enemies, deadly anomalies, and powerful artifacts. Unfold your own non-linear story on the path to the Heart of Chornobyl.',
    storyConfirmed: 'You step into the boots of Skif, a lone stalker whose apartment was destroyed by a mysterious anomalous artifact. Entering the Zone illegally to extract answers, Skif gets entangled in war between the Ward, Spark, and Monolith factions fighting over the secret laboratories of the Noosphere.',
    isReleased: true,
    hasSpoilers: true,
    spoilerContent: 'The Heart of Chornobyl reveals the surviving C-Consciousness project researchers trapped in crystalline stasis chambers beneath the generators. Players choose whether to unleash the Noosphere onto the globe, hand control to the military Ward, or destroy the generator array at the cost of stabilizing anomalous emissions.',
    worldBuilding: 'A massive 64-square-kilometer seamless radioactive wasteland recreating real Pripyat landmarks, the Duga radar, Yaniv station, and the cooling towers.',
    characters: [
      {
        id: 'c12',
        name: 'Skif',
        role: 'Protagonist',
        description: 'A pragmatic stalker driven by survival and answers to anomalous incursions.'
      },
      {
        id: 'c13',
        name: 'Colonel Korshunov',
        role: 'Ward Commander',
        description: 'Ruthless military leader enforcing order through high-tech firepower in the Zone.'
      }
    ],
    gameplayMechanics: [
      'A-Life 2.0 simulating independent mutant migrations and stalker skirmishes',
      'Bolt tossing to identify gravity, thermal, and electrical anomalies',
      'Weapon degradation, jamming, and manual field cleaning kits',
      'Survival meters: hunger, bleeding, radiation poisoning, and sleep deprivation'
    ],
    missionsAndExploration: 'Non-linear quest paths where entire factions can turn hostile based on your actions; deep bunker artifact recovery.',
    visualFeatures: [
      'Unreal Engine 5 Lumen lighting creating photorealistic dark nights and lightning storms',
      'Nanite geometry rendering dense overgrown forests and decaying Soviet architecture',
      'Motion-captured mutant animations and gruesome procedural gore'
    ],
    combatSystem: 'Brutal tactical first-person combat where a single unarmored rifle bullet can prove fatal.',
    weaponsAndVehicles: [
      'Over 30 customizable firearms with modular suppressors, scopes, and extended magazines',
      'No vehicles: exploration is 100% on foot through minefields and radiation hotspots'
    ],
    minRequirements: {
      os: 'Windows 10 / 11 64-bit',
      cpu: 'AMD Ryzen 5 1600X or Intel Core i7-7700K',
      gpu: 'AMD Radeon RX 580 8GB or NVIDIA GeForce GTX 1060 6GB',
      ram: '16 GB Dual Channel',
      vram: '6 GB',
      storage: '150 GB SSD space required',
      directx: 'DirectX 12',
      notes: 'SSD is strictly required.'
    },
    recommendedRequirements: {
      os: 'Windows 10 / 11 64-bit',
      cpu: 'AMD Ryzen 7 3700X or Intel Core i7-9700K',
      gpu: 'AMD Radeon RX 6700 XT 12GB or NVIDIA GeForce RTX 3070 Ti 8GB',
      ram: '16 GB / 32 GB recommended',
      vram: '8 GB',
      storage: '150 GB NVMe SSD space',
      directx: 'DirectX 12 Ultimate',
      notes: 'Targeting 1080p / 1440p 60 FPS at High settings.'
    },
    screenshots: [
      '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
      '/src/assets/images/hero_deep_space_1792661617143.jpg'
    ],
    recentUpdates: [
      {
        date: 'December 2024',
        title: 'Major Hotfix 1.0.3 Resolves A-Life 2.0 Spawn Radii',
        summary: 'Fixed NPC patrol routes and enhanced CPU thread load balancing on Intel 13th/14th gen processors.',
        source: 'GSC Game World Patch Log'
      }
    ],
    sources: [
      { title: 'S.T.A.L.K.E.R. 2 Official Portal', url: 'https://www.stalker2.com' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: false,
    isTrending: false,
    rankingScore: 89,
    rating: 8.8
  },
  {
    id: 'game-8',
    slug: 'hollow-knight-silksong',
    title: 'Hollow Knight: Silksong',
    tagline: 'Ascend to the peak of a haunted kingdom ruled by silk and song.',
    coverImage: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    heroBanner: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    releaseDate: 'Release Date TBA',
    releaseDateSortable: '2026-12-31',
    releaseStatus: 'TBA',
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    platforms: ['PC (Steam)', 'PC (GOG)', 'Humble Store', 'PC Game Pass'],
    genres: ['Action and Adventure', 'Fantasy', 'Soulslike'],
    engine: 'Unity Custom 2D Pipeline',
    trailerYoutubeId: 'pFAknD_9U7c',
    overview: 'Play as Hornet, princess-protector of Hallownest, and adventure through a whole new kingdom ruled by silk and song! Captured and brought to this unfamiliar land, Hornet must battle foes and solve mysteries as she ascends on a deadly pilgrimage to the kingdom’s peak.',
    storyConfirmed: 'Hornet is captured by masked pilgrims and transported in a cage caravan to the kingdom of Pharloom. Breaking free after an explosive magical accident, she discovers a civilization under the thrall of a melodic curse and begins an ascent towards the high Citadel.',
    storySpeculation: 'Lore enthusiasts anticipate revelations regarding the Weavers who originally fled Hallownest, exploring Hornet’s dual royal and weaver lineage.',
    isReleased: false,
    hasSpoilers: false,
    worldBuilding: 'Pharloom is structured vertically, moving from molten Moss Grottoes and shimmering coral forests up through brass clockwork belltowers to the gilded Citadel.',
    characters: [
      {
        id: 'c14',
        name: 'Hornet',
        role: 'Protagonist',
        description: 'Lethal needle-wielding weaver princess with acrobatic leaps, thread stitching, and crafting prowess.'
      },
      {
        id: 'c15',
        name: 'Shakra',
        role: 'Cartographer & Warrior',
        description: 'Fierce clan warrior mapping the vertical depths of Pharloom while hunting her missing master.'
      }
    ],
    gameplayMechanics: [
      'Acrobatic diagonal needle lunges and ledge mantling',
      'Silk spool self-healing executed instantly without rooting Hornet to the spot',
      'Crafting tools, traps, pimpillo bombs, and throwing caltrops at resting benches',
      'Fulfill quest board requests from quirky pilgrim bugs across towns'
    ],
    missionsAndExploration: 'Over 165 entirely new enemies, massive multi-phase boss encounters, and interconnected vertical labyrinth biomes.',
    visualFeatures: [
      'Hand-drawn 2D animation with 60+ FPS fluid frame pacing',
      'Dynamic multi-layered parallax backgrounds with atmospheric lighting',
      'Orchestral score composed by Christopher Larkin with live strings and choir'
    ],
    combatSystem: 'High-speed kinetic combat rewarding continuous aggression, aerial agility, and silk resource spending.',
    weaponsAndVehicles: [
      'Threaded Needle, Sting Shards, Pimpillo Bombs, Straight Pins, Flea Brew',
      'Bell beast transport networks'
    ],
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i3-3220 or AMD FX-6300',
      gpu: 'NVIDIA GeForce GTX 650 or AMD Radeon HD 7750',
      ram: '8 GB RAM',
      vram: '2 GB',
      storage: '15 GB available space (SSD recommended)',
      directx: 'DirectX 11',
      notes: 'Extremely accessible hardware requirements.'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Intel Core i5-6600 or AMD Ryzen 3 1300X',
      gpu: 'NVIDIA GeForce GTX 1060 (6GB) or AMD Radeon RX 580',
      ram: '16 GB RAM',
      vram: '4 GB',
      storage: '15 GB SSD space',
      directx: 'DirectX 12',
      notes: 'Optimal for 4K 144Hz high-refresh-rate displays.'
    },
    screenshots: [
      '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
      '/src/assets/images/hero_cyber_orion_1792661614409.jpg'
    ],
    recentUpdates: [
      {
        date: '2024',
        title: 'Team Cherry Reassures Fans Game Remains in Active Development',
        summary: 'Team Cherry marketing lead Matthew Griffin stated development continues smoothly as the team polish every zone.',
        source: 'Team Cherry Discord & Socials'
      }
    ],
    sources: [
      { title: 'Official Team Cherry Silksong Portal', url: 'https://www.teamcherry.com.au' }
    ],
    lastVerifiedDate: 'October 2026',
    isFeatured: true,
    isTrending: true,
    rankingScore: 98
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'take-two-reiterates-gta-vi-pipeline-pc-roadmap-analysis',
    title: 'Take-Two Q3 Financials Reiterate GTA VI Window: What It Means for the PC Edition',
    teaser: 'Analyzing the publisher’s latest guidance, historical Rockstar PC release timelines, and how RAGE 9 is being optimized for desktop hardware.',
    content: `Take-Two Interactive has once again solidified its target release window during its latest quarterly earnings briefing. While the initial console launch leads the charge, PC gaming enthusiasts are closely watching Rockstar’s technological milestones with RAGE 9.

### Historical Precedent and the PC Gap

Rockstar Games has maintained a consistent cadence across its major flagships over the past two decades. From Grand Theft Auto IV (which reached PC eight months after consoles) to Grand Theft Auto V (which arrived with superior 60fps visuals, 4K textures, and the Rockstar Editor), PC players have historically received the definitive visual and mechanical iteration.

Industry analysts estimate a window of approximately 10 to 14 months following the console release for the PC edition. This timeline gives Rockstar’s engineering teams in Edinburgh and New England the necessary headroom to adapt Leonida’s complex volumetric simulation to the vast matrix of PC hardware configurations.

### Key Takeaways for PC Gamers:
- **DirectStorage & NVMe Mandate:** The dense urban fabric of Vice City renders traditional spinning hard drives obsolete. Expect PCIe Gen 3/4 NVMe SSDs to be a non-negotiable minimum requirement.
- **Hardware-Accelerated Path Tracing:** PC will likely feature uncapped ray-traced reflections, contact shadows, and realistic water refractions that console architectures must constrain.
- **Modding Architecture:** Take-Two’s acquisition of Cfx.re (the creators of FiveM) signals official, structured support for roleplay servers and custom creative frameworks.`,
    author: {
      name: 'Julian Vance',
      role: 'Senior Tech Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    publishedAt: 'October 20, 2026',
    category: 'Analysis',
    readTime: '5 min read',
    coverImage: '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
    relatedGameSlug: 'grand-theft-auto-vi',
    relatedGameTitle: 'Grand Theft Auto VI',
    tags: ['Rockstar Games', 'GTA VI', 'PC Hardware', 'RAGE 9', 'Industry Analysis'],
    keyTakeaways: [
      'Take-Two re-confirms window with high confidence in investor calls.',
      'PC port expected to showcase unconstrained RAGE 9 path tracing and DLSS 3.7 / FSR 3.1 support.',
      'NVMe SSD will be mandatory for high-velocity streaming of Vice City.',
      'Cfx.re acquisition signals native multiplayer roleplay ecosystem integration.'
    ],
    sourceUrl: 'https://www.take2games.com/ir',
    isFeatured: true
  },
  {
    id: 'news-2',
    slug: 'unreal-engine-5-4-next-gen-pc-rpg-witcher-polaris-deep-dive',
    title: 'How CD Projekt Red is Overhauling Unreal Engine 5.4 for The Witcher 4: Polaris',
    teaser: 'An inside look at CDPR’s engineering partnership with Epic Games: tackling open-world traversal stutter, Nanite foliage, and large-scale monster AI.',
    content: `When CD Projekt Red announced its strategic departure from the proprietary REDengine in favor of Epic Games’ Unreal Engine 5, skeptics pointed to stuttering issues in early UE5 PC releases. Today, the Polish studio is demonstrating why Polaris is establishing a new technical baseline.

### Custom Core Engine Modifications

CDPR engineers in Poland and Boston have contributed thousands of code commits back to Epic’s core engine repository. Specifically, Polaris incorporates:

1. **Virtualized Geometry for Dynamic Foliage:** Adapting Nanite to handle millions of swaying pine needles, bending birch branches, and wind-blown boreal flora without exorbitant draw-call penalties.
2. **Asynchronous DirectStorage Streaming:** Eliminating shader compilation stutter during rapid horseback traversal through high-priority background PSO cache generation.
3. **Lynx AI Cluster Behaviors:** Simulating predatory pack instincts where beasts track player scent trails across dynamic snow layers.

CD Projekt Chief Technology Officer noted that the UE5 migration has slashed iteration time for level designers while ensuring day-one PC stability.`,
    author: {
      name: 'Marek Nowak',
      role: 'Gaming Technology Correspondent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    publishedAt: 'October 16, 2026',
    category: 'Developer Interview',
    readTime: '6 min read',
    coverImage: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    relatedGameSlug: 'the-witcher-4-polaris',
    relatedGameTitle: 'The Witcher 4: Polaris',
    tags: ['CD Projekt Red', 'The Witcher', 'Unreal Engine 5', 'PC Tech', 'RPG'],
    keyTakeaways: [
      'Over 400 developers are actively working on Polaris across CDPR studios.',
      'Bespoke collaboration with Epic Games optimizes Nanite for dynamic open-world foliage.',
      'Elimination of shader compilation stutter via background PSO pre-caching.',
      'New Lynx School medallion officially confirms the shift to a fresh protagonist.'
    ],
    sourceUrl: 'https://www.cdprojekt.com/en/media/news/',
    isFeatured: true
  },
  {
    id: 'news-3',
    slug: 'capcom-monster-hunter-wilds-pc-specs-frame-generation-guide',
    title: 'Monster Hunter Wilds PC System Requirements Explained: What Hardware You Really Need',
    teaser: 'Breaking down Capcom’s official CPU and GPU tiers, DLSS/FSR frame generation mandates, and RAM bandwidth impact on 60 FPS gameplay.',
    content: `Capcom’s release of the official PC specifications for Monster Hunter Wilds ignited widespread debate across hardware communities. With the RE Engine pushing dynamic weather transformations and hundreds of concurrent monster entities, the hardware bar has stepped up.

### Understanding the Frame Generation Requirement

In Capcom’s recommended specs for 1080p 60fps at Medium settings, the studio explicitly notes that Frame Generation is enabled. For players on older GTX or early RTX architectures, raw rasterization will require fine-tuning:

- **CPU Core Bottlenecks:** The simulation of shifting pack hierarchies places heavy stress on single-core IPC and L3 cache size. AMD Ryzen X3D processors demonstrate substantial advantage.
- **VRAM Thresholds:** With high-resolution texture packs enabled, 8GB VRAM cards may encounter texture swapping during intense sandstorm weather events. 12GB to 16GB is the sweet spot.
- **DirectX 12 Agility:** Capcom has tailored the RE Engine pipeline to utilize mesh shaders and fast memory allocation.`,
    author: {
      name: 'Julian Vance',
      role: 'Senior Tech Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    publishedAt: 'October 12, 2026',
    category: 'Hardware & Tech',
    readTime: '4 min read',
    coverImage: '/src/assets/images/hero_witcher_polaris_1792661615562.jpg',
    relatedGameSlug: 'monster-hunter-wilds',
    relatedGameTitle: 'Monster Hunter Wilds',
    tags: ['Capcom', 'Monster Hunter', 'PC Hardware', 'Benchmarks', 'System Requirements'],
    keyTakeaways: [
      'Minimum specs require at least GTX 1660 Super with upscaling enabled.',
      '140GB SSD installation is strictly required across all graphical tiers.',
      'Focus Mode mechanics allow targeting monster injuries created during hunts.',
      'Open Beta verified cross-play support across Steam and console platforms.'
    ],
    sourceUrl: 'https://www.monsterhunter.com/wilds/en-us/pc/',
    isFeatured: false
  },
  {
    id: 'news-4',
    slug: 'blackwall-lore-deep-dive-cyberpunk-project-orion-theories',
    title: 'Beyond the Blackwall: What Cyberpunk: Project Orion’s Story Lore Means for Night City',
    teaser: 'Unpacking the apocalyptic AI entities, Mr. Blue Eyes, and the brewing Fifth Corporate War in CD Projekt’s upcoming sequel.',
    content: `Phantom Liberty concluded with somber warnings regarding the fragile barrier separating human networks from rogue superintelligent entities. As CD Projekt Red advances development on Project Orion in Boston, the narrative trajectory is coming into sharp focus.

### The Breakdown of the DataKrash Treaties

Since Rache Bartmoss destroyed the old Net in 2020, NetWatch has maintained the Blackwall through algorithmic ice and secretive truces with surviving AIs. In Project Orion, lore archives indicate that these entities are evolving autonomous methods to interface with biological hosts.

### The Role of Mr. Blue Eyes and Night Corp
Persistent clues throughout the original game’s secret endings point towards shadowy figures manipulating the mayoral elections and corporate boardrooms of Night City. With the sequel expanding scope, players may finally uncover who holds the strings behind the blue glowing ocular implants.`,
    author: {
      name: 'Kira Sterling',
      role: 'Lore & Narrative Specialist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    },
    publishedAt: 'October 8, 2026',
    category: 'Game Preview',
    readTime: '7 min read',
    coverImage: '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
    relatedGameSlug: 'cyberpunk-project-orion',
    relatedGameTitle: 'Cyberpunk 2: Project Orion',
    tags: ['Cyberpunk', 'Project Orion', 'CDPR', 'Lore', 'Sci-Fi'],
    keyTakeaways: [
      'Sequel expands beyond Night City to explore corporate espionage and orbital factions.',
      'The Blackwall containment protocols are collapsing, creating new existential threats.',
      'Built in Unreal Engine 5 by veteran developers who created Phantom Liberty.',
      'Expect deep branching narrative lifepaths with tangible political repercussions.'
    ],
    sourceUrl: 'https://www.cyberpunk.net',
    isFeatured: false
  }
];
