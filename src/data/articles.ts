import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'f1-art-01',
    order: 1,
    slug: 'fp1-fp2-aerodynamics-setup-tyre-degradation',
    title: 'FP1 & FP2: Aerodynamics Setup & Tyre Degradation Breakdown',
    subtitle: 'Deciphering flow-vis aerodynamic correlation, ride-height windows, and compound thermal degradation across Friday practice sessions.',
    category: 'Tech',
    sessionCode: 'FP1/FP2',
    readTime: '7 min read',
    publishedDate: 'Friday, 14:30 CET',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Principal Aerodynamicist & Technical Analyst',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 car flow-vis aero test',
    featured: true,
    excerpt: 'Friday practice isn’t about sheer headline lap times. It is an exacting forensic exercise in ground-effect floor pressure mapping, ride height sealing, and measuring long-run tyre thermal degradation curves across Pirelli’s C2, C3, and C4 compounds.',
    metaDescription: 'Analyze Formula 1 aerodynamics correlation and Pirelli tyre thermal degradation curves across Friday practice sessions at the Monza Grand Prix.',
    tags: ['Aerodynamics', 'Tyre Degradation', 'Practice Sessions', 'Ground Effect', 'Flow-Vis'],
    interactiveType: 'telemetry',
    specs: [
      { label: 'Downforce Level', value: 'High Efficiency Trim', delta: '-4.2% Drag' },
      { label: 'Floor Edge Height', value: '9.8 mm Dynamic', delta: '±0.4 mm Variance' },
      { label: 'Track Temp FP1', value: '38.4 °C', note: 'Air 24.1 °C' },
      { label: 'C3 Soft Fall-off', value: '0.14s / lap', note: 'Thermal cliff at lap 11' }
    ],
    quote: {
      text: 'If your floor edge lifts by even 1.5 millimetres over high-speed yaw transitions, you surrender roughly twenty points of downforce—equivalent to throwing away two-tenths in high-speed apexes.',
      author: 'Adrian Newey',
      role: 'Chief Technical Officer'
    },
    sections: [
      {
        title: '1. How Do F1 Teams Calibrate Aerodynamics Using Flow-Vis Paint and Aero Rakes?',
        content: `**Answer:** Formula 1 teams calibrate aerodynamic correlation during Free Practice 1 by coating critical surfaces in fluorescent paraffin flow-vis paint and mounting kiel-probe aero rakes, physically validating whether track airflow matches computational fluid dynamics (CFD) and 60% scale wind tunnel simulations.

As the green light illuminated the pit lane exit at 13:30 local time for FP1, cars emerged sporting fluorescent flow-vis paint across front wing endplates, sidepod undercut tunnels, and rear diffuser strakes. The primary objective in FP1 is not chasing headline lap times on low fuel; it is establishing absolute empirical correlation between numerical simulations and open-air boundary layer physics.

Engineers focus on flow separation at the leading edge of the Venturi tunnels. Modern ground-effect regulations demand that the underfloor throat produces the vast majority of downforce without inducing aerodynamic stall or vertical oscillation (porpoising). With dynamic ride heights running under 10 mm at 300 km/h, the interaction between tyre squirt turbulence and the floor edge seal dictates whether the diffuser stays attached under sustained lateral loads.`,
        keyMetric: {
          stat: '1,420 kg',
          description: 'Total vertical load generated at 280 km/h by floor underbody tunnels alone'
        }
      },
      {
        title: '2. How Does Track Temperature Evolution Affect Tyre Grip and Graining Between FP1 and FP2?',
        content: `**Answer:** A rapid drop in circuit temperature between afternoon and twilight sessions triggers front axle graining, because the tyre surface slides over micro-rough asphalt before the inner carcass reaches its mandatory 100°C operating window.

Between FP1 in the heat of early afternoon and FP2 under twilight conditions, Monza track temperatures dropped precipitously from 41°C to 29°C. This 12-degree delta completely reorders mechanical grip dynamics.

In cooler track temperatures, front axle graining becomes the preeminent operational hazard. When the tyre surface slides without sufficient bulk core temperature, microscopic tears propagate across the tread blocks. Drivers reported noticeable understeer through the mid-speed complexes as the front tyres entered surface scrubbing before reaching their target 100°C carcass operating window.`,
        highlightBox: {
          title: 'Engineering Debrief: Surface vs. Carcass Temperature',
          body: 'Pirelli telemetry sensors measure both inner tread bulk temperature and surface infrared thermal imaging. A 15°C discrepancy between surface flash temperature and core pressure leads to instantaneous snap-oversteer on corner exit.'
        }
      },
      {
        title: '3. What Do FP2 Long-Run Simulations Reveal About Tyre Degradation Gradients?',
        content: `**Answer:** FP2 high-fuel race simulations reveal that the Medium (C3) compound degrades at a manageable 0.082s per lap, whereas the Soft (C4) compound suffers steep 0.165s per lap thermal degradation and falls off a performance cliff on lap 9.

The final 35 minutes of FP2 were dedicated to high-fuel race simulations with 105 kg fuel ballast. Across a continuous 16-lap stint on the Medium (C3) compound, the degradation slope stabilized at 0.082 seconds per lap. Contrast this with the Soft (C4) compound, which exhibited rapid thermal degradation of 0.165s/lap, reaching the critical performance cliff on lap 9.

This stark contrast virtually confirms that the Soft tyre will remain an exclusively qualifying rubber option for Sunday’s Grand Prix, forcing teams toward a Medium-to-Hard one-stop or Medium-Hard-Medium aggressive two-stop baseline.`
      }
    ]
  },
  {
    id: 'f1-art-02',
    order: 2,
    slug: 'fp3-fine-tuning-telemetry-secrets-ahead-of-qualifying',
    title: 'FP3 Fine-Tuning: Telemetry Secrets Ahead of Qualifying',
    subtitle: 'From mechanical spring rates to differential entry pre-load: how engineers transform overnight simulation runs into razor-sharp Saturday morning single-lap pace.',
    category: 'Tech',
    sessionCode: 'FP3',
    readTime: '6 min read',
    publishedDate: 'Saturday, 12:45 CET',
    author: {
      name: 'Elena Rostova',
      role: 'Senior Race Strategy & Telemetry Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 telemetry velocity traces',
    featured: false,
    excerpt: 'The Saturday morning 60-minute window is the final opportunity to lock in suspension geometry, damper stiffness, and differential ramp angles before Parc Fermé regulations permanently freeze car specifications.',
    metaDescription: 'Discover how F1 race engineers decode telemetry speed traces, heave damper setups, and differential ramp angles ahead of Saturday qualifying.',
    tags: ['FP3', 'Telemetry', 'Set-up', 'Parc Ferme', 'Differential'],
    interactiveType: 'telemetry',
    specs: [
      { label: 'Apex Minimum Speed', value: '184.2 km/h', delta: '+3.1 km/h vs FP2' },
      { label: 'Differential Pre-Load', value: '45 Nm Mid-Corner', delta: 'Tighter lock' },
      { label: 'Heave Spring Stiffness', value: '1,250 N/mm', note: 'Prevents floor grounding' },
      { label: 'Telemetry Channels', value: '300+ Live Sensors', note: '1.2 GB data / lap' }
    ],
    sections: [
      {
        title: '1. How Do Teams Use Overnight Simulator Correlation to Fix Car Balance for FP3?',
        content: `**Answer:** Factory test drivers run hundreds of overnight laps in driver-in-the-loop (DiL) simulators using Friday FP2 telemetry, fine-tuning suspension roll stiffness and hydraulic heave damping to resolve front-end balance issues before Saturday practice.

While race drivers slept, factory test drivers in Brackley and Maranello pounded out hundreds of simulated laps until 04:30 AM. Telemetry logged from Friday FP2 was fed into multi-body vehicle dynamics simulators to solve front-end balance deficiencies identified in Sector 2.

The key breakthrough came in third-element heave spring stiffness. By softening the front mechanical roll stiffness by 4% while stiffening the high-speed hydraulic heave damper, the aerodynamic platform was stabilized across kerb strikes without destabilizing the Venturi throat under 4.5G lateral cornering loads.`
      },
      {
        title: '2. What Telemetry Traces Reveal About Throttle Application and Differential Pre-Load?',
        content: `**Answer:** Telemetry velocity traces and throttle curves show that looser differential ramp angles allow sharper apex rotation at the expense of twitchiness, while higher differential pre-load locks the rear axle for stability at the cost of slight entry understeer.

Telemetry overlays between the leading factory entries revealed contrasting philosophies in corner entry stability. Car #1 ran a looser differential ramp angle on coast (35° off-throttle), allowing the rear axle to rotate effortlessly into apexes at the cost of slight steering corrections.

Conversely, Car #16 dialed in extra differential pre-load (50 Nm), ensuring the rear axle remained firmly tied down. While this eliminated oversteer snaps over the kerbs, it demanded earlier trail-braking pressure modulation to avoid pushing the front tyres wide onto the marble-strewn line.`
      },
      {
        title: '3. How Do Qualifying Engine Modes and MGU-K Strat Settings Boost Lap Times?',
        content: `**Answer:** Deploying Qualifying Engine Mode 1 and MGU-K Strat 2 delivers an instantaneous 120 kW (160 bhp) electric boost without battery clipping down straights, shaving roughly 0.45 seconds compared to practice setups.

During the final 10 minutes of FP3, teams conducted dress-rehearsal qualifying simulation runs. Power units were dialled up into ICE Mode 1 and MGU-K Strat 2 (Qualifying Energy Deployment).

With 120 kW (160 bhp) of electric boost deployed without clipping down the 1.1 km main straight, drivers experienced an immediate 0.45-second delta improvement over their Friday baselines, setting the stage for one of the tightest qualifying sessions in recent memory.`
      }
    ]
  },
  {
    id: 'f1-art-03',
    order: 3,
    slug: 'q1-to-q3-flying-lap-anatomy-and-sector-splits',
    title: 'Q1 to Q3: The Flying Lap Anatomy and Sector Splits',
    subtitle: 'Track evolution, out-lap tyre temperature conditioning, and the microscopic micro-sector splits that determined pole position by 0.018 seconds.',
    category: 'Qualifying',
    sessionCode: 'QUALIFYING',
    readTime: '8 min read',
    publishedDate: 'Saturday, 17:15 CET',
    author: {
      name: 'Liam Sterling',
      role: 'Chief Motorsport Correspondent',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 car apex qualifying lap',
    featured: true,
    excerpt: 'Anatomy of the ultimate qualifying battle: how tyre preparation on the out-lap, micro-sector apex speeds, and millimeter precision over track limits decided pole position on the edge of the razor.',
    metaDescription: 'Break down the anatomy of an F1 qualifying flying lap, out-lap tyre preparation, and micro-sector splits that decided pole position by 0.018s.',
    tags: ['Qualifying', 'Pole Position', 'Sector Splits', 'Flying Lap', 'Track Limits'],
    interactiveType: 'telemetry',
    specs: [
      { label: 'Pole Position Lap', value: '1:18.842', delta: '-0.018s to P2' },
      { label: 'Sector 1 Split', value: '25.104s', delta: 'Purple' },
      { label: 'Sector 2 Split', value: '29.312s', delta: 'Yellow (+0.042)' },
      { label: 'Sector 3 Split', value: '24.426s', delta: 'Purple (-0.060)' }
    ],
    sections: [
      {
        title: '1. Why Is Out-Lap Pirelli Tyre Temperature Conditioning Crucial for a Flying Lap?',
        content: `**Answer:** Out-lap preparation dictates flying lap grip because exceeding 112°C bulk rear temperature guarantees thermal degradation at the end of the lap, while cold front brakes below 400°C cause instant lockups into Turn 1.

A qualifying lap is won or lost before crossing the start-finish line. If a driver pushes too aggressively on the out-lap through turns 8 and 9, the rear tyre bulk temperature spikes to 112°C, guaranteeing thermal degradation and traction loss at the final chicane. Conversely, if trapped behind slower traffic in the final sector, the front brake discs drop below 400°C, leading to instant lock-ups into Turn 1.

The sweet spot requires a meticulous delta pace: rolling brake heating sequences, weaving to generate carcass flexion, and hitting the final acceleration zone at precisely 98°C across all four corners.`
      },
      {
        title: '2. How Does Track Grip Evolution Create Q1 and Q2 Elimination Drama?',
        content: `**Answer:** Track evolution adds approximately 0.12 seconds of mechanical grip every six minutes as cars lay down rubber, meaning early lap times rapidly become vulnerable to elimination as the track ramps up.

As 20 cars continuously laid fresh rubber onto the racing line, track evolution yielded roughly 0.12 seconds of free grip every six minutes. Drivers on early runs in Q1 found themselves hovering on the brink of elimination, requiring frantic second runs on fresh softs.

In Q2, tyre conservation took center stage. With the midfield separated by a microscopic 0.28 seconds from P7 down to P16, any hesitation over exit kerbs spelled disaster. Three drivers suffered lap-time deletions for white line infringements at Turn 4, where the FIA optical timing sensors detected wheels exceeding boundaries by less than 12 millimeters.`
      },
      {
        title: '3. What Micro-Sector Splits Decided the Q3 Pole Position Shootout?',
        content: `**Answer:** Pole position was decided by a microscopic 0.018 seconds when superior low-drag straightline speed in Sector 1 was countered by mid-corner traction in Sector 2, with the final exit traction out of the Parabolica settling the outcome.

In the dying 90 seconds of Q3, the track reached peak grip. Sector 1 belonged to the Red Bull of Verstappen, exploiting high-efficiency low-drag top speed to post a 25.104. Yet through the twisty medium-speed sequence of Sector 2, Ferrari clawed back two-tenths with superior mechanical traction and rapid direction change.

The decider came in the final acceleration zone out of the Parabolica. By waiting two meters longer before unleashing full throttle and avoiding rear wheel slip, pole position was snatched at the line by just eighteen thousandths of a second—the equivalent of 105 centimeters at 320 km/h.`
      }
    ]
  },
  {
    id: 'f1-art-04',
    order: 4,
    slug: 'grid-formation-and-tyre-strategies-undercut-vs-overcut',
    title: 'Grid Formation & Tyre Strategies: Undercut vs. Overcut',
    subtitle: 'The chess match before lights out: pit window calculations, pit lane transit delta loss, and simulation models comparing aggressive undercuts against overcut track position.',
    category: 'Strategy',
    sessionCode: 'GRID',
    readTime: '7 min read',
    publishedDate: 'Sunday, 11:30 CET',
    author: {
      name: 'Elena Rostova',
      role: 'Senior Race Strategy & Telemetry Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 pit wall strategy monitors',
    featured: false,
    excerpt: 'Before 20 cars assemble on the grid, race strategists run billions of Monte Carlo simulations to calculate the exact lap window where pitting early unleashes fresh tyre pace to leapfrog rivals.',
    metaDescription: 'Compare F1 undercut vs overcut pit stop strategies, pit lane transit delta loss, and compound stint life models ahead of Sunday lights out.',
    tags: ['Strategy', 'Undercut', 'Overcut', 'Pit Stop Delta', 'Tyre Degradation'],
    interactiveType: 'strategy',
    specs: [
      { label: 'Pit Transit Loss', value: '21.4 Seconds', note: 'Speed limiter 80 km/h' },
      { label: 'Undercut Delta Power', value: '1.8s / Out-lap', note: 'Fresh C2 Hard Tyre' },
      { label: 'Optimal Pit Window', value: 'Laps 19 - 24', note: 'Medium to Hard baseline' },
      { label: 'Overtaking Difficulty', value: 'High (Index 7.8)', note: 'Favors track position' }
    ],
    sections: [
      {
        title: '1. How Does Pit Lane Transit Loss Dictate Formula 1 Race Strategy?',
        content: `**Answer:** Pit lane transit loss establishes the required pit window delta—here costing 21.4 seconds at 80 km/h—meaning a driver must create at least a 22-second gap or drop into clear air to preserve track position after stopping.

At every Grand Prix circuit, the fundamental metric governing strategic flexibility is the pit lane transit loss. At this venue, a 380-meter pit road with an 80 km/h speed limiter costs a driver 21.4 seconds compared to cars continuing at full racing speed on track.

To execute a successful pit stop and retain track position, a driver must either build a 22-second gap ahead or drop into clean air where traffic will not obstruct their out-lap pace. Dropping into a DRS train of midfield cars negates all strategic advantage of new tyres.`
      },
      {
        title: '2. What Is the Difference Between an Undercut and an Overcut Strategy in F1?',
        content: `**Answer:** The undercut gains position by pitting first to exploit 1.5 to 2.2 seconds of fresh-tyre pace, whereas the overcut stays out in clean air when new tyres warm up slowly or grain on cold out-laps.

The **Undercut** involves pitting one or two laps earlier than the rival directly ahead. Upon fitting fresh tyres, the driver immediately gains the grip differential—typically 1.5 to 2.2 seconds per lap faster than worn tyres. When the leading car pits on the following lap, the chaser sweeps past as the leader rejoins the track on cold rubber.

However, the **Overcut** becomes devastating when tyre warm-up is slow or graining is severe on out-laps. If the chaser struggles to bring new tyres up to temperature through their first three corners, the car staying out in clear air can pump in qualifying-style laps to emerge ahead.`
      },
      {
        title: '3. Why Is a One-Stop Strategy Preferred Over an Aggressive Two-Stop Attack?',
        content: `**Answer:** While a two-stop strategy is theoretically 4.2 seconds faster on paper, teams overwhelmingly prefer a one-stop baseline because dirty air makes on-track overtakes high-risk and costly in tyre life.

Strategy models indicate that a Medium (Laps 1-22) to Hard (Laps 23-53) strategy yields a theoretical total race duration of 1 hour 24 minutes and 12 seconds. A two-stop Medium-Hard-Medium is theoretically 4.2 seconds faster over 53 laps on paper, but carries the massive downside of requiring two on-track overtakes through dirty air.`
      }
    ]
  },
  {
    id: 'f1-art-05',
    order: 5,
    slug: 'turn-1-chaos-launch-physics-and-reaction-times',
    title: 'Turn 1 Chaos: Launch Physics and Reaction Times',
    subtitle: 'Dual-clutch bite-point calibration, 0-200 km/h in 4.2 seconds, dirty vs clean grid slots, and surviving the bottleneck into the first braking zone.',
    category: 'Race Day',
    sessionCode: 'RACE START',
    readTime: '6 min read',
    publishedDate: 'Sunday, 14:45 CET',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Principal Aerodynamicist & Technical Analyst',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 Turn 1 grid start',
    featured: false,
    excerpt: 'The most dangerous, adrenaline-soaked 600 meters in world sport: dissecting the launch physics of human reaction times, clutch paddles, tyre wheelspin, and 300 km/h heavy braking into Turn 1.',
    metaDescription: 'Examine F1 clutch bite-point launch physics, driver reaction times, and 340 km/h heavy braking dynamics into the chaos of Turn 1.',
    tags: ['Race Start', 'Launch Control', 'Reaction Time', 'Turn 1', 'Braking Physics'],
    interactiveType: 'pitstop',
    specs: [
      { label: 'Average Reaction Time', value: '0.19 - 0.24 Seconds', delta: 'To five red lights out' },
      { label: '0 to 100 km/h', value: '2.4 Seconds', note: 'Mechanical grip limited' },
      { label: '0 to 200 km/h', value: '4.3 Seconds', note: '1,000+ HP hybrid deployment' },
      { label: 'Turn 1 Braking Force', value: '5.4 G Deceleration', note: '140 kg brake pedal force' }
    ],
    sections: [
      {
        title: '1. How Do F1 Drivers Find the Clutch Bite-Point Without Automated Launch Control?',
        content: `**Answer:** With automated launch control strictly banned by the FIA, drivers manually discover the clutch friction bite-point during the formation lap and modulate a single steering-wheel paddle to hold 11,500 RPM at lights out.

Under modern FIA regulations, automated launch control and torque mapping algorithms are strictly banned. The driver controls the start using a single tactile clutch paddle mounted behind the steering wheel.

During the formation lap, drivers conduct practice bite-point discovery runs. On the grid, the driver must pull the paddle, hold engine RPM at precisely 11,500, and release the paddle to a predetermined percentage the millisecond all five red lights extinguish. Release too little, and the engine bogs down; release too much, and the rear tyres ignite into uncontrollable wheelspin.`
      },
      {
        title: '2. Why Does the Clean Side of the Starting Grid Have an Advantage Over the Dirty Side?',
        content: `**Answer:** The odd-numbered clean grid slots sit directly on the racing line where rubber has accumulated all weekend, giving P1, P3, and P5 a 1.2-meter launch advantage by 100 km/h over dusty even-numbered slots.

Because the racing line runs along the odd-numbered grid slots (P1, P3, P5...), the 'clean side' features rubber laid down throughout the entire weekend. The even-numbered 'dirty side' (P2, P4, P6...) contains dust, debris, and lower micro-texture grip.

Historical data confirms a 1.2-meter launch deficit by 100 km/h for the dirty side, often allowing P3 to slipstream alongside P2 before the 200-meter braking marker.`
      },
      {
        title: '3. How Do F1 Cars Decelerate from 340 km/h into Turn 1 Under 5.4 Gs?',
        content: `**Answer:** Drivers apply over 140 kg of leg pressure to carbon brake pedals to generate 5.4 Gs of deceleration into Turn 1, while actively compensating for a 30% downforce loss caused by turbulent dirty air.

Approaching Turn 1, drivers must slam the carbon brake pedal with upwards of 140 kilograms of leg force. Deceleration exceeds 5.4 G—shifting bodily blood forward into the eyes and helmet.

With cold brakes and 20 cars jostling within centimeters of each other, aerodynamic dirty air washes over the front wings, temporarily slashing downforce by 30%. Managing this instantaneous loss of front grip is what separates a race leader from an opening-lap carbon fiber pileup.`
      }
    ]
  },
  {
    id: 'f1-art-06',
    order: 6,
    slug: 'pit-stop-precision-how-mechanics-execute-1-9-second-stop',
    title: 'Pit Stop Precision: How Mechanics Execute a 1.9-Second Stop',
    subtitle: 'Twenty human beings, four 18-inch wheels, pneumatic torque guns running at 10,000 RPM, and milliseconds of pure biomechanical perfection.',
    category: 'Tech',
    sessionCode: 'PIT STOP',
    readTime: '6 min read',
    publishedDate: 'Sunday, 15:30 CET',
    author: {
      name: 'Liam Sterling',
      role: 'Chief Motorsport Correspondent',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: '/images/ferrari-pit-stop.jpg',
    imageAlt: 'Formula 1 pit stop in pit lane with 22 crew mechanics servicing race car',
    featured: true,
    excerpt: 'Inside the synchronized choreography of the world’s fastest pit crews: wheel guns, quick-release front jacks, automated traffic lights, and why human reaction time is pushed to its absolute limits.',
    metaDescription: 'Explore how 22 mechanics execute a sub-2.0 second F1 pit stop using 10,500 RPM pneumatic wheel guns and synchronized choreography.',
    tags: ['Pit Stop', 'Pit Crew', 'Wheel Gun', 'Choreography', 'Biomechanics'],
    interactiveType: 'pitstop',
    specs: [
      { label: 'World Record Stop', value: '1.80 Seconds', note: 'McLaren, Qatar GP' },
      { label: 'Wheel Nut Torque', value: '450 Nm', note: 'Secured in 0.18s' },
      { label: 'Wheel Gun RPM', value: '10,500 RPM', note: 'Pneumatic 30-bar pressure' },
      { label: 'Crew Members', value: '22 Specialists', note: '3 per wheel corner' }
    ],
    sections: [
      {
        title: '1. What Roles Do the 22 Mechanics Play During a Sub-2-Second F1 Pit Stop?',
        content: `**Answer:** A 22-person pit crew divides into 3 specialists per wheel corner (Gunner, Wheel-Off, Wheel-On) plus front and rear jack operators, 2 side car stabilisers, 2 wing flap adjusters, and an automated gantry release controller.

A Formula 1 pit stop is the ultimate fusion of sports science and industrial automation. Each of the four wheel corners features three specialized mechanics:
1. **The Gunner**: Operates the high-torque pneumatic wheel gun.
2. **The Wheel-Off**: Strips away the blistering 110°C used tyre.
3. **The Wheel-On**: Slots the fresh 18-inch tyre onto the hub drive pins.

Additionally, front and rear jack operators lift the 798 kg machine into the air, two side stabilisers prevent sway, two wing-adjusters dial aerodynamic flaps, and a pit controller monitors the automated green light gantry.`,
        keyMetric: {
          stat: '1.80s',
          description: 'Official all-time Formula 1 world record stationary pit stop duration'
        }
      },
      {
        title: '2. How Do Captive Wheel Nuts and Optical Torque Sensors Guarantee Instant Release?',
        content: `**Answer:** Captive wheel nuts integrated inside the wheel rim prevent lost hardware, while internal optical encoders inside the 10,500 RPM wheel guns automatically signal the pit gantry the millisecond 450 Nm torque is reached.

Modern wheel nuts are integrated directly into the wheel rim rather than free-floating pieces, eliminating lost nuts. The wheel guns feature internal optical rotation encoders and torque transducers.

When the nut reaches its target 450 Nm torque setting, the gun transmits an electronic signal to the car’s overhead gantry. Once all four corners acknowledge completion and the pit lane pit-box exit sensor detects no oncoming traffic, the light flashes green and the front jack drops automatically.`,
        highlightBox: {
          title: 'Engineering Debrief: Pneumatic Gun Specifications',
          body: 'Wheel guns are powered by dry compressed air or nitrogen at 30-bar (435 psi), generating 450 Nm of torque in less than 0.20 seconds to seat the central locking nut.'
        }
      },
      {
        title: '3. Why Is Human Reaction Time Buffered by FIA Technical Directives During Pit Stops?',
        content: `**Answer:** FIA Technical Directive TD18 mandates an artificial 0.15-second electronic reaction delay to prevent mechanics from anticipating actions before wheel nuts are fully torqued, prioritizing safety.

Under FIA Technical Directives (TD18), safety delays ensure mechanics do not anticipate actions prematurely. An intentional 0.15-second human reaction buffer is factored into the electronic release system.

Despite these restrictions, elite crews routinely execute stationary stops between 1.95 and 2.10 seconds lap after lap.`
      }
    ]
  },
  {
    id: 'f1-art-07',
    order: 7,
    slug: 'safety-car-drama-and-pit-window-windows',
    title: 'Safety Car Drama & Pit Window Windows',
    subtitle: 'Virtual Safety Car vs Full Bernd Mayländer deployment: calculating the "cheap pit stop" delta discount and tyre temperature drop-off.',
    category: 'Strategy',
    sessionCode: 'SAFETY CAR',
    readTime: '7 min read',
    publishedDate: 'Sunday, 16:05 CET',
    author: {
      name: 'Elena Rostova',
      role: 'Senior Race Strategy & Telemetry Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 Safety Car leading pack',
    featured: false,
    excerpt: 'When yellow flags fly and race control deploys the Safety Car or triggers VSC deltas, the entire competitive hierarchy can invert in seconds. Here is the mathematical reality behind the "cheap pit stop".',
    metaDescription: 'Learn the mathematics behind Virtual Safety Car cheap pit stops, tyre carcass cooling hazards, and race restart cat-and-mouse tactics.',
    tags: ['Safety Car', 'Virtual Safety Car', 'Strategy', 'Pit Window', 'Restart Tactics'],
    interactiveType: 'strategy',
    specs: [
      { label: 'Normal Pit Loss', value: '21.4 Seconds', note: 'At racing speed' },
      { label: 'VSC Pit Loss Delta', value: '9.8 Seconds', note: 'Pack running at 60% pace' },
      { label: 'Full Safety Car Loss', value: '11.2 Seconds', note: 'Massive field compression' },
      { label: 'Tyre Core Temp Loss', value: '-18 °C / 3 Laps', note: 'Restart grip danger' }
    ],
    sections: [
      {
        title: '1. Why Does a Virtual Safety Car Offer a "Cheap Pit Stop" Delta Advantage?',
        content: `**Answer:** A Virtual Safety Car reduces effective pit stop loss from 21.4 seconds down to under 10 seconds because the pack on track travels roughly 40% slower, covering far less distance while you are in the pit lane.

Why is pitting under a Safety Car or Virtual Safety Car hailed as a strategic goldmine? Under green flag conditions, your competitors complete laps in roughly 1 minute 20 seconds. If you pit, you lose 21.4 seconds relative to them.

However, during a Virtual Safety Car, all cars on track must adhere to a strict delta lap time that is approximately 40% slower than racing pace. Because cars on track travel so much slower, they cover less track distance during the 20 seconds you spend in the pit lane. As a result, your effective time loss drops from 21.4 seconds down to under 10 seconds—effectively cutting the pit penalty in half!`
      },
      {
        title: '2. What Makes Tyre Temperature Drop-Off Dangerous Behind the Safety Car?',
        content: `**Answer:** Driving 8 to 10 seconds per lap slower behind the Safety Car removes lateral cornering forces, causing tyre core temperatures to drop from 105°C to the 70s, slashing inflation pressures and creating extreme restart snap-oversteer.

While a cheap pit stop delivers track position, driving behind the Safety Car creates acute technical hazards. Even driving at maximum pace, the Mercedes-AMG GT Black Series Safety Car laps roughly 8 to 10 seconds slower than an F1 car.

Without 5G lateral cornering loads, tyre core temperatures plummet from 105°C down into the 70s. When tyre pressure drops in tandem, the car loses aerodynamic ride height and mechanical grip, leaving drivers vulnerable to vicious snap-oversteer on the restart.`
      },
      {
        title: '3. How Does the Race Leader Exploit Cat-and-Mouse Tactics During a Safety Car Restart?',
        content: `**Answer:** The leader dictates pace once Safety Car roof lights extinguish, often slowing to a crawl before the final chicane to bunch the field and accelerating unpredictably at the apex before rivals can react.

Once the Safety Car turns off its roof lights signaling in-lap, the race leader assumes total control of the pace. The regulations state that the leader may not brake erratically, but can dictate whatever speed they desire until crossing the control line.

Savvy leaders back the pack into a crawl at the final hairpin, compress the trailing cars, and punch full throttle at the apex before rivals can anticipate the acceleration spike.`
      }
    ]
  },
  {
    id: 'f1-art-08',
    order: 8,
    slug: 'drs-trains-overtaking-tactics-ers-energy-deployment',
    title: 'DRS Trains, Overtaking Tactics, and ERS Energy Deployment',
    subtitle: 'Aerodynamic wake physics, DRS flap stall velocity deltas, 800-volt MGU-K battery harvesting, and breaking the frustrating DRS train deadlock.',
    category: 'Race Day',
    sessionCode: 'RACE BATTLE',
    readTime: '7 min read',
    publishedDate: 'Sunday, 16:35 CET',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Principal Aerodynamicist & Technical Analyst',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 DRS train straight slipstream',
    featured: false,
    excerpt: 'Why do faster cars get trapped behind slower machinery for 20 laps? We examine the fluid dynamics of DRS flap stalls, dirty air thermal degradation, and tactical ERS battery clipping.',
    metaDescription: 'Analyze aerodynamic wake wash turbulence, rear wing DRS flap stalls, and 800V MGU-K energy harvesting tactics in high-speed overtaking duels.',
    tags: ['DRS', 'ERS Battery', 'Overtaking', 'Aerodynamics', 'Slipstream'],
    interactiveType: 'telemetry',
    specs: [
      { label: 'DRS Speed Delta', value: '+18 to +24 km/h', delta: 'Flap opens 85 mm' },
      { label: 'ERS Max Deployment', value: '4.0 MJ / lap', note: '120 kW (160 bhp)' },
      { label: 'Downforce Wake Loss', value: '-22% at 1.0s gap', note: 'Aerodynamic wake wash' },
      { label: 'Braking Zone Overlap', value: '18 meters', note: 'Late braking pass' }
    ],
    sections: [
      {
        title: '1. What Causes a Formula 1 "DRS Train" and Why Is It Hard to Break?',
        content: `**Answer:** A DRS train forms when multiple consecutive cars each stay within 1.0 second of the car ahead, giving all chasers an identical 18 to 24 km/h DRS top-speed boost that neutralizes any overtaking delta.

Drag Reduction System (DRS) was designed to counteract the severe loss of aerodynamic downforce caused by running in the turbulent wake of another car. When within 1.000 second at the detection line, the trailing car opens its rear wing flap by 85 mm, shedding massive aerodynamic drag and gaining up to 24 km/h in top speed.

However, when four or five cars run nose-to-tail, each car enjoys DRS from the car ahead except for the leader. Because everyone down the straight possesses the top-speed advantage simultaneously, the net delta evaporates, locking the group into an unbreakable "DRS Train."`
      },
      {
        title: '2. How Do Drivers Manage 4 Megajoules of ERS Battery Deployment to Avoid Clipping?',
        content: `**Answer:** FIA rules limit MGU-K hybrid deployment to 4.0 Megajoules (roughly 33.3 seconds of 160 bhp boost) per lap, requiring drivers to save battery mid-lap so they don't suffer sudden power "clipping" down the straights.

Under FIA regulations, the Energy Recovery System (ERS) is restricted to deploying a maximum of 4.0 Megajoules per lap through the MGU-K. This equals approximately 33.3 seconds of full electric horsepower boost per lap.

To execute an overtake or defend a position, drivers must "super-charge" their energy stores. Defending drivers conserve battery through mid-corner phases to dump full power at the start of the straight. If a driver runs out of usable energy mid-straight—known as "clipping"—their car suddenly loses 160 horsepower, becoming a sitting duck for the pursuer.`
      },
      {
        title: '3. How Do Drivers Use Dummy Divebombs and Detection Line Tactics to Overtake?',
        content: `**Answer:** Drivers strategically brake early before the DRS detection line to remain behind their rival at the sensor, ensuring they receive the DRS flap opening on the primary straight to execute the definitive pass.

Modern wheel-to-wheel combat also features strategic detection line games. Drivers frequently hold back on the straight prior to the detection line, deliberately staying behind their opponent so that THEY get DRS down the subsequent main straight, turning the hunter into the hunted.`
      }
    ]
  },
  {
    id: 'f1-art-09',
    order: 9,
    slug: 'podium-finish-and-chequered-flag-race-recap',
    title: 'Podium Finish & Chequered Flag Race Recap',
    subtitle: 'A thrilling 53-lap masterclass: the final stint dogfight, bonus points for fastest lap, and celebrating glory under the podium lights.',
    category: 'Race Day',
    sessionCode: 'CHEQUERED FLAG',
    readTime: '6 min read',
    publishedDate: 'Sunday, 17:45 CET',
    author: {
      name: 'Liam Sterling',
      role: 'Chief Motorsport Correspondent',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'F1 chequered flag podium finish',
    featured: true,
    excerpt: 'From lights out to the chequered flag, recap how strategic mastery, relentless pace management, and an audacious final-lap fastest lap dash sealed a legendary Grand Prix victory.',
    metaDescription: 'Relive the closing stint dogfight, fastest lap bonus point hunt, and official podium celebrations in this complete Monza Grand Prix race recap.',
    tags: ['Race Recap', 'Podium', 'Fastest Lap', 'Chequered Flag', 'Victory'],
    specs: [
      { label: 'Race Winning Margin', value: '+1.428 Seconds', delta: 'After 53 laps' },
      { label: 'Fastest Lap Time', value: '1:21.044', note: 'Set on Lap 52 with Softs' },
      { label: 'Total Race Time', value: '1h 22m 14.891s', note: 'Average 224.8 km/h' },
      { label: 'Overtakes Recorded', value: '47 Passes', note: 'Dry race conditions' }
    ],
    sections: [
      {
        title: '1. How Did the Race Leader Defend Against Fresher Medium Tyres in the Closing Stint?',
        content: `**Answer:** The race leader protected victory on 28-lap-old Hard tyres by placing the car defensively at Turn 1 and exploiting aerodynamic wake turbulence to erode the challenger's front downforce.

With eight laps remaining, the race hung on a knife-edge. The race leader on 28-lap-old Hard tyres saw their lead slashed by three-tenths per lap by the charging challenger on fresher Medium rubber.

Telemetry showed the chaser extracting maximum traction from Turn 7, closing the delta down to 1.4 seconds with two laps to go. However, as the dirty air turbulence began stripping away front wing downforce, the leader defended the inside line into Turn 1 with clinical precision.`
      },
      {
        title: '2. Why Do Teams Make a Late Pit Stop to Hunt the Fastest Lap Bonus Point?',
        content: `**Answer:** When running with a sufficient gap over trailing cars (greater than the 21.4-second pit loss), teams pit for fresh soft tyres and empty batteries on the penultimate lap to claim the championship bonus point.

Behind the podium battle, P4 held a 28-second cushion over P5. Sensing a free pit stop window, the team radioed: "Box, box for Softs." Emerging on lap 51 with blazing fresh red-walled tyres, the driver uncorked full battery deployment to obliterate the previous fastest lap by 1.2 seconds, claiming the world championship bonus point.`
      },
      {
        title: '3. Why Do F1 Drivers Intentionally Pick Up Rubber Marbles on the Cooldown Lap?',
        content: `**Answer:** Drivers drive through off-line rubber marbles on the in-lap to fuse hot molten rubber onto tyre treads, adding up to 2 kg of ballast to guarantee compliance with the FIA 798 kg minimum weight limit.

As the chequered flag dropped, drivers were immediately instructed over team radio to "pick up rubber." Driving off-line through the marble zones forces molten rubber debris to stick onto hot tyres, adding up to 2 kilograms of artificial weight to ensure the car safely complies with the FIA 798 kg minimum weight limit during post-race inspection.`
      }
    ]
  },
  {
    id: 'f1-art-10',
    order: 10,
    slug: 'post-race-scrutineering-parc-ferme-constructors-points',
    title: 'Post-Race Scrutineering, Parc Fermé, and Constructors Points',
    subtitle: 'Fuel sample chemical chromatography, skid block plank thickness micrometers, and the mathematical championship consequences of Sunday’s result.',
    category: 'Tech',
    sessionCode: 'SCRUTINEERING',
    readTime: '7 min read',
    publishedDate: 'Sunday, 19:30 CET',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Principal Aerodynamicist & Technical Analyst',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'FIA Parc Fermé technical inspection',
    featured: false,
    excerpt: 'The Grand Prix isn’t truly over until the FIA Technical Delegate issues Document 64. Step inside the rigorous post-race scrutineering tests that protect the integrity of Formula 1.',
    metaDescription: 'Inspect the FIA Parc Fermé post-race scrutineering process, 10mm titanium skid plank wear tests, fuel chromatography, and constructor points.',
    tags: ['Scrutineering', 'FIA', 'Parc Ferme', 'Plank Wear', 'Constructors Points'],
    specs: [
      { label: 'Minimum Weight Limit', value: '798.0 kg', note: 'Car + Driver combined' },
      { label: 'Plank Wear Allowance', value: '10.0 mm ± 0.2 mm', note: 'Max 1.0mm wear permitted' },
      { label: 'Fuel Sample Required', value: '1.00 Litre', note: 'Gas chromatography test' },
      { label: 'Constructor Points', value: '44 Points Claimed', delta: '+12 pts in standings' }
    ],
    sections: [
      {
        title: '1. How Does the FIA Enforce the Strict 798 kg Minimum Weight in Parc Fermé?',
        content: `**Answer:** Post-race scrutineering weighs both driver and car on calibrated digital load cells; falling short by even 100 grams results in strict, mandatory disqualification under Technical Article 4.1.

Minutes after stepping out of the cockpit, all top-finishers are guided to the official FIA scales while holding their steering wheel, helmet, HANS device, and racing overalls.

The car itself is hoisted onto digital load cells calibrated to within 100 grams. If a car weighs 797.9 kg—even by a microscopic margin of 100 grams—the technical delegate has no discretionary leeway; instant disqualification follows under Article 4.1 of the Technical Regulations.`
      },
      {
        title: '2. Why Does Excessive Titanium Skid Block Plank Wear Cause Instant Disqualification?',
        content: `**Answer:** The FIA measures four designated inspection holes in the 10.0 mm underfloor plank with digital micrometers; exceeding 1.0 mm of plank wear proves the car ran illegally low to generate unapproved downforce.

Underneath every Formula 1 car sits a Jabroc laminated beechwood plank equipped with titanium skid blocks. The plank starts with an exact thickness of 10.0 mm.

To prevent teams from running their ground-effect floors dangerously low to the ground to generate illegal downforce, the FIA measures four designated inspection holes using digital depth micrometers. If wear exceeds 1.0 mm (reducing thickness below 9.0 mm), the car is deemed illegal, as occurred in dramatic disqualifications at Austin.`
      },
      {
        title: '3. How Does Post-Race Fuel Gas Chromatography Confirm Championship Legality?',
        content: `**Answer:** Scrutineers extract 1.0 litre of fuel and run gas chromatography against the pre-season chemical fingerprint; any illegal additives lead to immediate exclusion before points are officially ratified.

The final test is fuel sampling. Scrutineers extract a 1.0-litre sample directly from the fuel tank cell. Using gas chromatography, the chemical fingerprint of the fuel is matched against the reference sample submitted before the season. Any unauthorised anti-knock additives or density discrepancies leads to immediate exclusion.

With all ten cars cleared and technical documents ratified, constructors points are officially awarded, shaking up the title race and establishing the development benchmark heading into the next Grand Prix.`
      }
    ]
  }
];

export const RACE_WEEKEND_INFO = {
  grandPrixName: 'Formula 1 Italian Grand Prix 2026',
  circuitName: 'Autodromo Nazionale Monza',
  circuitLength: '5.793 km',
  raceLaps: 53,
  lapRecord: '1:21.046 (Rubens Barrichello)',
  currentTrackTemp: '34°C',
  currentAirTemp: '24°C',
  weatherStatus: 'Track Dry · Humidity 42%',
  tyreCompounds: ['C2 Hard (White)', 'C3 Medium (Yellow)', 'C4 Soft (Red)']
};
