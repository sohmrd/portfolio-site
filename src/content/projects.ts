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
      "A Bluetooth-connected water bottle that mixes custom flavors on demand, built for Coca-Cola.",
    thumbnail: "/images/ddv/product.jpg",
    tags: ["IoT", "Swift", "Arduino", "CAD", "Prototyping", "BLE"],
    summary:
      "I led firmware development and iOS app design for a smart water bottle that uses piezo-electric pumps to mix four flavors at user-defined intensities. Built in partnership with Coca-Cola as a senior capstone.",
    timeline: "2025",
    role: "Firmware Lead & iOS Developer",
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
    heroImage: "/images/ddv/product.jpg",
    sections: [
      {
        heading: "The Challenge",
        type: "standard",
        content:
          "Coca-Cola tasked our interdisciplinary team with designing a Dynamic Drinking Vessel: a reusable bottle that lets users instantly mix flavors and control intensity, sip by sip. The core constraint was keeping the main water reservoir clean while actively pumping flavor. Unlike competitors like Cirkul that rely on gravity and a single flavor, we needed to support four simultaneous flavors with precise Bluetooth-controlled dosing.",
        images: ["/images/ddv/ideation.jpg"],
      },
      {
        heading: "The Stack",
        type: "stack",
        content:
          "The system spans mechanical engineering, embedded firmware, and a native iOS companion app, all communicating over Bluetooth Low Energy.",
        hardware: [
          "4x Piezo-electric micro pumps",
          "Arduino Nano 33 BLE",
          "Custom PCB with pump drivers",
          "Tilt sensor + button input",
          "Rechargeable LiPo battery",
          "SolidWorks-designed bottle body + hexagonal cap",
        ],
        software: [
          "Arduino BLE (C++)",
          "Swift / SwiftUI",
          "CoreBluetooth framework",
          "Custom BLE service with 14 characteristics",
          "SolidWorks 2024",
          "InDesign (expo poster)",
        ],
        images: ["/images/ddv/electronics.jpg", "/images/ddv/mechanical.jpg"],
      },
      {
        heading: "The Logic: Firmware",
        type: "code",
        content:
          "The Arduino firmware manages four independent pump channels using non-blocking millis()-based timing. Each pump's frequency maps to a 1-10 intensity value set from the iOS app over BLE. A tilt sensor activates dispensing only when the user tips the bottle to drink.",
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
        heading: "The Logic: Companion App",
        type: "code",
        content:
          "The iOS app connects to the bottle over CoreBluetooth. On connection, it discovers two BLE services (flavor control + mode control) with 14 characteristics total. It syncs the current flavor values from the Arduino, then writes updates in real time as the user adjusts sliders.",
        language: "Swift",
        images: ["/images/ddv/app.png"],
        code: `class BLEManager: NSObject, ObservableObject {
  @Published var isConnected = false
  @Published var syncedFlavorValues: [UInt8]? = nil

  // Custom BLE service UUIDs matching Arduino firmware
  private let ledServiceUUID = CBUUID(
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
    // Sync flavor state from hardware
    if allCharacteristicsDiscovered {
      DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
        self.readFlavorValues()
      }
    }
  }
}`,
      },
      {
        heading: "Failure Log",
        type: "failure",
        content:
          "This project had real engineering failures, not hypotheticals. Each one pushed the design forward.",
        iterations: [
          {
            version: "v1 Gravity Prototype",
            issue:
              "Initial design relied on gravity to dispense flavor from top-mounted pods. Flow was inconsistent and could not be electronically controlled.",
            fix: "Switched to piezo-electric pumps that actively push fluid, enabling precise Bluetooth-controlled dosing.",
          },
          {
            version: "v2 Sealing Problems",
            issue:
              "Flavor leaked between cartridge and cap during tilting. O-ring seals deformed under repeated use.",
            fix: "Redesigned the cap with a rolling pinch valve mechanism (SolidWorks, 3 tolerance iterations) that pinches tubing shut when not dispensing.",
          },
          {
            version: "v3 Pump Driver Testing",
            issue:
              "First pump driver boards could not supply enough current for all 4 pumps simultaneously. Pumps stalled under load.",
            fix: "Added dedicated motor driver ICs per channel and upgraded to a higher-capacity LiPo battery. Validated with driver testing spreadsheet.",
          },
          {
            version: "v4 BLE Sync",
            issue:
              "iOS app and Arduino fell out of sync after reconnection. App would show stale flavor values from the previous session.",
            fix: "Added a full state sync on BLE connection: app reads all 4 flavor characteristics from the Arduino before allowing user interaction.",
          },
        ],
        images: ["/images/ddv/process.jpg"],
      },
      {
        heading: "The Outcome",
        type: "standard",
        content:
          "We delivered a working prototype demonstrated to Coca-Cola engineers at the Georgia Tech Capstone Expo. The Omni Bottle mixes up to 4 flavors with individually adjustable intensity (16+ combinations), controlled via iOS app or automatic tilt-to-dispense. The bottle keeps the main reservoir as clean water only, with flavor cartridges that are easy to swap and refill. Our team produced a complete technical binder, fabrication package, and branded expo poster.",
        images: ["/images/ddv/product.jpg", "/images/ddv/team.jpg"],
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
