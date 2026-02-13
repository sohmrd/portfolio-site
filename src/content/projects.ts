export interface Section {
  heading: string;
  content: string;
  type?: "standard" | "stack" | "code" | "failure";
  images?: string[];
  // stack
  hardware?: string[];
  software?: string[];
  // code
  code?: string;
  language?: string;
  // failure
  iterations?: { version: string; issue: string; fix: string }[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  summary: string;
  timeline: string;
  role: string;
  duration: string;
  tools: string[];
  team?: string;
  heroImage: string;
  sections: Section[];
  tier: 1 | 2 | 3;
  featured: boolean;
  visible: boolean;
}

export const projects: Project[] = [
  {
    slug: "dynamic-drinking-vessel",
    title: "Dynamic Drinking Vessel",
    description:
      "A smart water bottle that mixes four flavors on demand via Bluetooth, built for Coca-Cola.",
    thumbnail: "/images/ddv/poster.jpg",
    tags: ["IoT", "Swift", "Arduino", "CAD", "Prototyping", "BLE"],
    summary:
      "I designed the bottle's form factor and mechanical internals, wrote the Arduino firmware, and built the iOS companion app. Two parallel designs: one electronic, one fully mechanical. Built for Coca-Cola as an interdisciplinary senior capstone at Georgia Tech.",
    timeline: "2025",
    role: "Product Designer, Mechanical CAD, Firmware Lead, iOS Developer",
    duration: "8 months",
    tools: [
      "SolidWorks",
      "Arduino",
      "Swift / SwiftUI",
      "CoreBluetooth",
      "Piezo Pumps",
      "InDesign",
    ],
    team: "6 students (Industrial Design, Mechanical Engineering, Electrical & Computer Engineering)",
    heroImage: "/images/ddv/poster.jpg",
    sections: [
      {
        heading: "The Brief",
        type: "standard",
        content:
          "Coca-Cola challenged our six-person team to design a \"Dynamic Drinking Vessel\" for young adults aged 18 to 24: a reusable bottle that lets users create custom-flavored drinks on the go. The requirements were specific. Users needed to mix multiple flavors simultaneously, control the intensity of each one, and the main water reservoir had to stay clean (no flavor contamination). Our closest competitor, Cirkul, only supports a single flavor through passive gravity flow. We needed to beat that with active, electronically controlled multi-flavor mixing.",
        images: ["/images/ddv/ideation.jpg"],
      },
      {
        heading: "The Product",
        type: "standard",
        content:
          "I led the product design for the Omni Water Bottle, shaping both the form factor and the internal architecture. Working with one mechanical engineer, I CAD'd two parallel designs in SolidWorks: an electronic version with Bluetooth-controlled piezo pumps, and a fully mechanical version using manual pressure valves as a low-cost fallback. Both share the same hexagonal cap housing up to four removable flavor cartridges around a central straw. The cap fits standard 2.8-inch cup holders while maximizing internal cartridge space. When the user sips, pumps inject precise doses of flavor concentrate into the water stream, so the main reservoir always stays as clean water.",
        images: ["/images/ddv/product.jpg"],
      },
      {
        heading: "The System",
        type: "stack",
        content:
          "I worked across all three layers of the system: the mechanical assembly I co-designed in SolidWorks, the embedded firmware I wrote for the Arduino Nano 33 BLE, and the native iOS companion app I built in SwiftUI. The hardware and software communicate over Bluetooth Low Energy using a custom protocol with 14 characteristics across two services.",
        hardware: [
          "4x Piezo-electric micro pumps (one per flavor channel)",
          "Arduino Nano 33 BLE (main controller)",
          "Custom PCB with dedicated motor driver ICs",
          "Tilt sensor for automatic sip detection",
          "Rechargeable LiPo battery (1+ day active use)",
          "Rolling pinch valves to prevent backflow",
        ],
        software: [
          "Arduino C++ firmware (non-blocking pump control)",
          "Swift / SwiftUI iOS app",
          "CoreBluetooth (14 BLE characteristics)",
          "SolidWorks 2024 (full mechanical assembly)",
        ],
        images: ["/images/ddv/electronics.jpg", "/images/ddv/mechanical.jpg"],
      },
      {
        heading: "What Went Wrong",
        type: "failure",
        content:
          "Over eight months, the project went through four major pivots. Each failure revealed a fundamental flaw in our assumptions and forced a redesign.",
        iterations: [
          {
            version: "v1: Gravity Feed",
            issue:
              "Our first prototype relied on gravity to drip flavor from top-mounted pods into the water stream. Flow rate was inconsistent, impossible to control electronically, and stopped entirely at certain tilt angles.",
            fix: "Replaced passive gravity with piezo-electric micro pumps that actively push fluid. This gave us precise, electronically controllable dosing regardless of bottle orientation.",
          },
          {
            version: "v2: Seal Failures",
            issue:
              "With pumps working, flavor began leaking between the cartridge housing and cap during normal use. The O-ring seals we selected deformed after repeated insertions and temperature changes.",
            fix: "I designed a rolling pinch valve mechanism in SolidWorks that physically pinches the tubing shut when pumps are off. Took three tolerance iterations between me and our ME to get the valve geometry right for reliable sealing.",
          },
          {
            version: "v3: Power Delivery",
            issue:
              "When all four pumps ran simultaneously, the first driver board could not supply enough current. Pumps stalled under load and the Arduino brownout-reset, losing BLE connection.",
            fix: "Replaced the shared driver with dedicated motor driver ICs per channel and upgraded to a higher-capacity LiPo. Each pump now has its own power path, eliminating current starvation.",
          },
          {
            version: "v4: State Sync",
            issue:
              "After the iOS app disconnected and reconnected (common during normal use), it displayed stale flavor values from the previous session instead of the Arduino's current state.",
            fix: "Added a full state synchronization on every BLE connection event: the app reads all four flavor characteristics from the Arduino before allowing any user interaction.",
          },
        ],
        images: ["/images/ddv/prototype.jpg", "/images/ddv/testing.jpg"],
      },
      {
        heading: "The Firmware",
        type: "code",
        content:
          "The Arduino firmware controls four pump channels independently using non-blocking timing. Each pump's frequency is mapped to a 1-to-10 intensity value received from the iOS app over BLE. A tilt sensor gates all dispensing so pumps only activate when the user tips the bottle to drink.",
        language: "C++",
        code: `void freqControl() {
  long now = millis();
  int speed1 = pumpSpeed(Flavor1);
  if (now - freq1Time >= speed1) {
    freq1Time = now;
    if (digitalRead(frequencyControl1) == HIGH
        || Flavor1 < frequencyOn) {
      digitalWrite(frequencyControl1, LOW);
    } else {
      digitalWrite(frequencyControl1, HIGH);
    }
  }
  // Repeat for channels 2-4...
}

int pumpSpeed(long intensity) {
  int speed = map(intensity, 1, 10, 1, 60);
  speed = constrain(speed, 1, 60);
  return 500 / speed;  // frequency in ms
}`,
      },
      {
        heading: "The Companion App",
        type: "code",
        content:
          "I built the iOS app in SwiftUI. It connects to the bottle over CoreBluetooth, discovers two BLE services (flavor control and mode control), and syncs the current state from the Arduino on every connection. Users adjust four flavor intensity sliders that write values to the Arduino in real time. The app also supports saved \"Quick Mix\" presets and a random mode.",
        language: "Swift",
        images: ["/images/ddv/app.png"],
        code: `class BLEManager: NSObject, ObservableObject {
  @Published var isConnected = false
  @Published var syncedFlavorValues: [UInt8]? = nil

  private let serviceUUID = CBUUID(
    string: "19b10000-e8f2-537e-4f6c-d104768a1214"
  )

  func connect(to peripheral: CBPeripheral) {
    stopScanning()
    peripheral.delegate = self
    centralManager.connect(peripheral, options: nil)
  }

  // On connection: discover services, cache characteristics,
  // then read all 4 flavor values from the Arduino
  func peripheral(_ peripheral: CBPeripheral,
    didDiscoverCharacteristicsFor service: CBService,
    error: Error?) {
    guard let chars = service.characteristics else { return }
    for char in chars {
      self.characteristics[char.uuid] = char
      if char.properties.contains(.notify) {
        peripheral.setNotifyValue(true, for: char)
      }
    }
    if allCharacteristicsDiscovered {
      DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
        self.readFlavorValues()
      }
    }
  }
}`,
      },
      {
        heading: "The Result",
        type: "standard",
        content:
          "We demonstrated a fully working prototype to Coca-Cola engineers at the Georgia Tech Interdisciplinary Capstone Expo. The Omni Bottle mixes up to four flavors with individually adjustable intensity (over 16 possible combinations), controlled through the iOS app or automatically via tilt-to-dispense. The main water reservoir stays clean at all times, and flavor cartridges are simple to swap and refill. We delivered a complete technical binder, fabrication package, bill of materials, and the branded expo poster shown in the hero image.",
        images: ["/images/ddv/team.jpg"],
      },
    ],
    tier: 1,
    featured: true,
    visible: true,
  },
  {
    slug: "lidar-room-scanner",
    title: "LiDAR Garment Measurement",
    description:
      "iOS app using iPhone LiDAR and computer vision to measure garments in 3D space.",
    thumbnail: "/images/lidar/hero.jpg",
    tags: ["iOS", "Swift", "ARKit", "LiDAR", "Computer Vision"],
    summary:
      "I built an iOS app that fuses iPhone LiDAR depth data with ARKit and the Vision framework to measure garment dimensions in real-time, exploring the boundary between on-device and cloud processing.",
    timeline: "2024-2025",
    role: "Solo Developer",
    duration: "6 months",
    tools: ["Swift", "ARKit", "Vision Framework", "SceneKit", "LiDAR"],
    heroImage: "/images/lidar/hero.jpg",
    sections: [],
    tier: 1,
    featured: true,
    visible: false,
  },
  {
    slug: "cv-clothing",
    title: "Computer Vision Fashion Detection",
    description:
      "YOLOv11 pipeline trained to detect and classify 10 garment types from images in real time.",
    thumbnail: "/images/cv/hero.jpg",
    tags: ["Python", "PyTorch", "YOLOv11", "Computer Vision", "ML Engineering"],
    summary:
      "I built a complete object detection pipeline using YOLOv11 to identify and classify clothing items across 10 garment categories, training on Kaggle datasets with custom data augmentation.",
    timeline: "2024",
    role: "ML Engineer",
    duration: "3 months",
    tools: ["Python", "PyTorch", "YOLOv11", "OpenCV", "Google Colab"],
    heroImage: "/images/cv/hero.jpg",
    sections: [],
    tier: 1,
    featured: true,
    visible: false,
  },
  {
    slug: "alivecor",
    title: "AliveCor Product Development",
    description:
      "Product strategy and configuration audit for a medical AI company making FDA-cleared ECG devices.",
    thumbnail: "/images/alivecor/hero.jpg",
    tags: ["Product Strategy", "Medical AI", "User Research", "Figma"],
    summary:
      "As a Featured Intern at AliveCor, I led a device configuration audit and developed a D2C product strategy based on cross-functional research with hardware, ML, and customer success teams.",
    timeline: "2024",
    role: "Product Development Intern",
    duration: "3 months",
    tools: ["Figma", "Jira", "Confluence", "Arduino", "Google Suite"],
    heroImage: "/images/alivecor/hero.jpg",
    sections: [],
    tier: 1,
    featured: true,
    visible: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getNextProject(slug: string): { slug: string; title: string } | null {
  const visible = projects.filter((p) => p.visible);
  const idx = visible.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const next = visible[(idx + 1) % visible.length];
  return { slug: next.slug, title: next.title };
}
