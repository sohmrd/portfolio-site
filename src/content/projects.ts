export interface Section {
  heading: string;
  content: string;
  type?: "standard" | "stack" | "code" | "failure";
  images?: string[];
  slides?: string[];
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
  github?: string;
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
      "iOS app fusing LiDAR depth sensing with computer vision for real-time clothing measurement.",
    thumbnail: "/images/lidar/hero-measurements.png",
    tags: ["iOS", "Swift", "ARKit", "LiDAR", "Computer Vision", "Sensor Fusion"],
    summary:
      "After hitting the limits of camera-only garment detection, I built an iOS app that fuses LiDAR depth data with computer vision edge detection to capture actual clothing dimensions. The system processes spatial data through a custom pipeline combining 2D image contours with 3D point clouds, applying camera intrinsics to convert pixel coordinates into metric measurements.",
    timeline: "2024-2025",
    role: "Solo Developer: All code, design, and product strategy",
    duration: "6 months",
    tools: ["Swift", "ARKit", "Vision Framework", "SceneKit", "LiDAR APIs", "Xcode", "TestFlight"],
    heroImage: "/images/lidar/hero-measurements.png",
    sections: [
      {
        heading: "The Challenge",
        type: "standard",
        content:
          "After building a camera-only clothing detection system with YOLO, I hit a wall: computer vision could identify garments but could not measure them. I needed depth data. The iPhone Pro's LiDAR scanner provided 3D sensing, but the core problem became data fusion: how do you combine 2D edge detection (which understands shape boundaries) with 3D depth maps (which understand distance) to extract real garment dimensions like chest width, shoulder span, and inseam? Neither sensor alone was sufficient.",
        images: ["/images/lidar/capture-view.png", "/images/lidar/capture-error.png"],
      },
      {
        heading: "The Stack",
        type: "stack",
        content:
          "The system architecture combines sensor hardware with Apple's spatial computing frameworks. Hardware capabilities provide raw data streams, while software frameworks handle coordinate transformations, scene understanding, and computational geometry.",
        hardware: [
          "iPhone 12 Pro+ LiDAR Scanner (5m range, scene depth)",
          "TrueDepth Camera (12MP, 60fps capture)",
          "IMU (6-axis gyroscope/accelerometer for transforms)",
        ],
        software: [
          "ARKit (world tracking, scene reconstruction)",
          "Vision Framework (VNDetectContoursRequest for edge detection)",
          "SceneKit (3D rendering and point cloud visualization)",
          "Swift SIMD (matrix calculations, camera intrinsics)",
        ],
      },
      {
        heading: "The Logic",
        type: "code",
        content:
          "The core measurement algorithm uses pinhole camera model projection to convert 2D garment outline coordinates into 3D camera space. This function maps edge detection points along clothing boundaries to real-world positions by applying camera intrinsics and depth data. The intrinsics matrix (fx, fy, cx, cy) encodes the camera's optical properties, allowing accurate transformation from pixel space to metric garment dimensions.",
        language: "Swift",
        code: `/// Project 2D outline points to 3D camera space
/// using ARKit depth data and pinhole camera model
private func projectToCameraSpace(
    outlinePoints: [CGPoint],
    depthMap: CVPixelBuffer,
    intrinsics: simd_float3x3,
    imageSize: CGSize
) -> [SIMD3<Float>] {
    let fx = intrinsics.columns.0.x  // focal length x
    let fy = intrinsics.columns.1.y  // focal length y
    let cx = intrinsics.columns.2.x  // principal point x
    let cy = intrinsics.columns.2.y  // principal point y

    let depthWidth = CVPixelBufferGetWidth(depthMap)
    let depthHeight = CVPixelBufferGetHeight(depthMap)

    let cameraSpacePoints = outlinePoints.compactMap {
        point -> SIMD3<Float>? in
        let depthX = Int(Float(point.x)
            * Float(depthWidth) / Float(imageSize.width))
        let depthY = Int(Float(point.y)
            * Float(depthHeight) / Float(imageSize.height))

        guard depthX >= 0 && depthX < depthWidth
           && depthY >= 0 && depthY < depthHeight
        else { return nil }

        let depth = getDepth(at: depthX, depthY, from: depthMap)
        guard depth > 0 && depth < 5.0 else { return nil }

        // Pinhole model: pixel -> real-world coordinates
        let scaledFx = fx * Float(depthWidth)
            / Float(imageSize.width)
        let scaledFy = fy * Float(depthHeight)
            / Float(imageSize.height)
        let scaledCx = cx * Float(depthWidth)
            / Float(imageSize.width)
        let scaledCy = cy * Float(depthHeight)
            / Float(imageSize.height)

        let cameraX = (Float(depthX) - scaledCx)
            * depth / scaledFx
        let cameraY = (Float(depthY) - scaledCy)
            * depth / scaledFy

        return SIMD3<Float>(cameraX, cameraY, depth)
    }
    return cameraSpacePoints
}`,
      },
      {
        heading: "The Detection Pipeline",
        type: "standard",
        content:
          "The measurement pipeline executes as a multi-stage cascade with fallback strategies. First, I attempt hybrid CV+LiDAR detection using Vision framework contour detection to outline the garment, refined with depth clustering to isolate it from the background. If edge detection fails (wrinkled fabric, poor lighting, textured surfaces), the system falls back to pure depth-based segmentation. Each detection method feeds into the same 3D projection and measurement calculation, extracting chest width, body length, shoulder width, waist, front rise, and inseam depending on garment type.",
      },
      {
        heading: "Failure Log",
        type: "failure",
        content:
          "Each iteration revealed fundamental limitations in on-device computer vision processing.",
        images: ["/images/lidar/firework-contours.png", "/images/lidar/contour-detection.png", "/images/lidar/dark-shirt-error.png"],
        iterations: [
          {
            version: "v1: Vision Framework Edge Detection",
            issue:
              "VNDetectContoursRequest produced 'firework patterns' with hundreds of scattered line segments radiating from fabric edges instead of clean garment outlines. The Vision framework detected every texture variation, fold, and wrinkle as a potential contour.",
            fix: "Implemented Douglas-Peucker algorithm to simplify contours, combined with bounding box filtering and aspect ratio validation. Added depth-based refinement that searches perpendicular to detected edges to snap contour points to the actual object surface using a 15cm depth threshold.",
          },
          {
            version: "v2: Depth Clustering Accuracy",
            issue:
              "Pure LiDAR segmentation captured the general garment shape but missed fine details like sleeve curves and necklines. Median depth clustering created blocky, quantized outlines that lost measurement accuracy on clothing's complex, non-rigid geometry.",
            fix: "Built hybrid refinement pipeline: Vision framework detects initial shape, then LiDAR data refines boundary precision. For each edge point, I sample depths along the perpendicular direction and select the point closest to median object depth.",
          },
          {
            version: "v3: On-Device Processing Limitations",
            issue:
              "iPhone Vision framework could not match the robustness of server-side OpenCV libraries. Edge detection failed on many real-world clothing scenarios: patterned fabrics, similar-colored backgrounds, wrinkled or draped garments.",
            fix: "Identified this as a fundamental architecture decision. The correct solution would be moving CV processing to a Python backend and keeping only LiDAR capture + 3D projection on-device. Chose not to implement due to cloud compute costs for a personal project.",
          },
        ],
      },
      {
        heading: "The Outcome",
        type: "standard",
        content:
          "The app runs the complete pipeline: point the camera at a garment, and it detects boundaries, projects to 3D space, and outputs measurements. In controlled conditions (solid-colored clothing, even lighting, flat surface), it produces reasonable dimensional estimates. In real-world conditions, edge detection breaks down on patterned or wrinkled fabrics. The honest conclusion: on-device Vision framework cannot match server-side OpenCV for this use case, and the correct architecture would offload CV processing to a Python backend while keeping only LiDAR capture on-device. That architectural insight, knowing where to split the pipeline between edge and cloud, was the most valuable outcome of six months of building.",
        images: ["/images/lidar/hero-measurements.png"],
      },
    ],
    tier: 1,
    featured: true,
    visible: true,
  },
  {
    slug: "cv-clothing",
    title: "Computer Vision Fashion Detection",
    description:
      "Real-time clothing detection and classification across 10 garment categories using YOLOv11.",
    thumbnail: "/images/cv-clothing/hero-detection.png",
    tags: ["Python", "PyTorch", "YOLOv11", "Computer Vision", "ML Engineering", "OpenCV"],
    summary:
      "I built a continuous machine learning system for real-time fashion detection across 10 garment categories. Trained custom YOLOv11 models on Kaggle fashion datasets with multi-device GPU support (Apple Silicon MPS, NVIDIA CUDA, CPU) and deployed real-time inference with combined detection and pose estimation.",
    timeline: "2024",
    role: "Solo Developer: Training pipeline, model evaluation, real-time inference",
    duration: "2 months",
    tools: ["Python", "YOLOv11 (Ultralytics)", "PyTorch", "OpenCV", "Google Colab", "Kaggle", "Jupyter Notebooks"],
    heroImage: "/images/cv-clothing/hero-detection.png",
    sections: [
      {
        heading: "The Challenge",
        type: "standard",
        content:
          "I set out to build a real-time clothing detection system that could identify what garment someone is wearing, where it is in the frame, and classify it by type. The core challenge split into two problems: sourcing quality labeled fashion data (Kaggle had garment type labels but almost nothing for style attributes), and building a training pipeline that could run on consumer hardware without requiring expensive cloud GPU time for every iteration.",
      },
      {
        heading: "The Stack",
        type: "stack",
        content:
          "The system uses YOLOv11 for detection, PyTorch as the ML framework, and OpenCV for video processing. Training runs on Google Colab for cloud GPU access, with local fallback support for Apple Silicon (MPS), NVIDIA (CUDA), or CPU.",
        hardware: [],
        software: [
          "Python 3.12",
          "YOLOv11 (Ultralytics)",
          "PyTorch (MPS / CUDA / CPU)",
          "OpenCV (real-time video processing)",
          "Google Colab (cloud GPU training)",
          "Kaggle Datasets (10 garment classes)",
          "Jupyter Notebooks (experimentation)",
        ],
      },
      {
        heading: "The Logic",
        type: "code",
        content:
          "The training script handles automatic device detection (MPS for Apple Silicon, CUDA for NVIDIA, or CPU fallback), checkpoint management to avoid redundant training, and model validation with mAP metrics. This architecture allows seamless fashion model training across different hardware environments without code changes.",
        language: "Python",
        code: `def check_device():
    """Check available GPU: MPS, CUDA, or CPU."""
    if torch.backends.mps.is_available():
        device = "mps"
        print(f"[INFO] Using Apple M1/M2 GPU (MPS)")
    elif torch.cuda.is_available():
        device = "cuda"
        print(f"Using torch {torch.__version__} "
              f"({torch.cuda.get_device_properties(0).name})")
    else:
        device = "cpu"
        print(f"[WARNING] Using torch {torch.__version__} "
              f"(CPU - slow)")
    return device

def train_fashion_model():
    """Train with checkpoint management."""
    if TRAINED_MODEL_PATH.exists():
        print(f"[INFO] Trained model found at: "
              f"{TRAINED_MODEL_PATH}")
        return YOLO(str(TRAINED_MODEL_PATH))

    device = check_device()
    model = YOLO(PRETRAINED_MODEL)

    results = model.train(
        data=str(DATA_YAML),
        epochs=EPOCHS,
        batch=BATCH_SIZE,
        imgsz=IMG_SIZE,
        device=device,
        patience=50,
        save=True,
        plots=True,
        val=True,
        amp=False if device == "mps" else True
    )

    best_weights = (PROJECT_ROOT / "runs" / "detect"
        / "fashion_training" / "weights" / "best.pt")
    shutil.copy(best_weights, TRAINED_MODEL_PATH)
    return model`,
      },
      {
        heading: "Failure Log",
        type: "failure",
        content:
          "Three critical iterations shaped the final architecture.",
        iterations: [
          {
            version: "v1: TensorFlow on Mac",
            issue:
              "Started training with TensorFlow on a MacBook Pro but consistently ran out of RAM during model training. Local training would crash after a few epochs, making iteration impossible.",
            fix: "Migrated to Google Colab for cloud GPU access and switched to PyTorch/YOLOv11. This gave me access to high-memory GPUs and faster training cycles. Kept local inference capability for deployment.",
          },
          {
            version: "v2: Real-time Performance",
            issue:
              "Real-time webcam inference was stuttering badly on the local machine. Frame rate dropped below usable levels with full-resolution frames.",
            fix: "Downscaled video output resolution and optimized the inference loop. Reduced display resolution while maintaining model input size, achieving smooth real-time detection.",
          },
          {
            version: "v3: Dataset Limitations",
            issue:
              "Public Kaggle datasets provided good garment type labels but lacked fine-grained style attribute data. This limited what the model could classify beyond basic clothing categories.",
            fix: "Accepted limitation for proof of concept. For production, would need to build a proprietary dataset from user-generated data with custom attribute labeling.",
          },
        ],
      },
      {
        heading: "The Outcome",
        type: "standard",
        content:
          "The final system trains in Colab and runs real-time inference locally via terminal, with clothing classification and human pose estimation running simultaneously on a webcam feed, identifying garment types with bounding boxes and confidence scores. The model detects 10 garment classes (jacket, shirt, pants, dress, skirt, shorts, hat, sunglasses, bag, shoe) reliably in well-lit environments, though style attribute classification remains unsolved without better training data. This project built my foundation in ML engineering: PyTorch training pipelines, cloud compute workflows, and the gap between 'model works in a notebook' and 'model runs in real-time on live video.'",
        images: ["/images/cv-clothing/hero-detection.png", "/images/cv-clothing/webcam-detection.png"],
      },
    ],
    tier: 1,
    featured: true,
    visible: true,
  },
  {
    slug: "alivecor",
    title: "AliveCor Product Development",
    description:
      "Audited and redesigned the clinical configuration system for an AI-driven remote heart monitoring platform.",
    thumbnail: "/images/alivecor/workspace.jpg",
    tags: ["Product Strategy", "Medical AI", "UX Design", "Figma", "Cross-functional"],
    summary:
      "As Featured Intern at AliveCor, I mapped every setting interaction in the clinical platform through systematic testing, discovered hidden dependencies across the system, and designed self-service configuration flows that reduced setup complexity for clinical users.",
    timeline: "2024",
    role: "Product Development Intern (Featured Intern)",
    duration: "3 months (Summer 2024)",
    tools: ["Figma", "Jira", "Confluence", "Arduino", "Premiere Pro", "Google Suite"],
    heroImage: "/images/alivecor/workspace.jpg",
    sections: [
      {
        heading: "The Challenge",
        type: "standard",
        content:
          "AliveCor's remote heart monitoring platform serves both direct patient care and clinical studies, but the clinical-facing configuration system had grown organically over years without proper documentation. Healthcare professionals struggled with settings that had hidden interdependencies, and the engineering team kept shipping features without edge-case testing. No one on the team had a complete map of how the system actually behaved. I was tasked with auditing the entire configuration system, documenting its real behavior, and redesigning the interface to simplify clinical onboarding.",
      },
      {
        heading: "Cross-functional Research",
        type: "standard",
        content:
          "The configuration system touched every team, so I embedded with each one to understand their piece of the pipeline. With hardware engineers, I used Arduino boards to mimic ECG device signals for testing without clinical equipment. With the ML team, I learned how model outputs drove configuration requirements, specifically which settings affected data quality and which were cosmetic. With customer success and sales, I mapped real-world deployment contexts to understand which configurations clinical staff actually changed vs. which they left at defaults. This cross-functional mapping revealed where the system could be simplified.",
      },
      {
        heading: "The Stack",
        type: "stack",
        content:
          "I used Figma for interface redesign and prototyping the simplified configuration flows, Jira for sprint planning, and Confluence for the system documentation I created from scratch. Arduino boards simulated device signals for testing edge cases without clinical hardware.",
        hardware: [
          "Arduino (device signal simulation)",
          "AliveCor ECG hardware (testing)",
        ],
        software: [
          "Figma (interface redesign, prototyping)",
          "Jira (sprint planning)",
          "Confluence (system documentation)",
          "Google Sheets (dependency mapping)",
          "Premiere Pro (handoff video walkthroughs)",
        ],
      },
      {
        heading: "Failure Log",
        type: "failure",
        content:
          "The iterations and obstacles that shaped the final solution.",
        iterations: [
          {
            version: "v1: Configuration Audit",
            issue:
              "Started by asking engineers to document settings, but their knowledge was fragmented and contradictory. No one had a complete map of how configurations interacted. I discovered 'ghost dependencies' where changing one setting silently affected others.",
            fix: "Switched to systematic manual testing. Created test scenarios for every setting combination, building the source of truth from scratch. This audit became the foundation for designing which configurations could be automated.",
          },
          {
            version: "v2: Redesign Assumptions",
            issue:
              "Initial redesign assumed clinical staff understood the underlying system architecture. Figma prototype testing revealed they needed context-specific defaults, not a better-organized version of the same complexity.",
            fix: "Redesigned around deployment-context presets (patient monitoring vs. clinical trial) that pre-configure appropriate settings. The Figma prototype reduced required user decisions from 20+ to under 5 for standard deployments.",
          },
          {
            version: "v3: Implementation Handoff",
            issue:
              "Delivered the complete audit, documentation, and Figma redesign on schedule, but engineering implementation was scheduled after the internship ended.",
            fix: "Created detailed handoff documentation and recorded video walkthroughs. Scheduled follow-up calls post-internship to support the engineering team during implementation.",
          },
        ],
      },
      {
        heading: "D2C Strategy",
        type: "standard",
        content:
          "Beyond the platform redesign, I conducted user research to inform direct-to-consumer strategy. Interviews revealed that monitoring loved ones' health was a top motivator for platform adoption, particularly for families managing chronic conditions. I synthesized these findings into a subscription tier strategy proposal and presented it at the company's internal pitch day. The proposal modeled a path to 50% D2C market penetration growth over two years based on the adoption patterns I identified in the research.",
      },
      {
        heading: "The Outcome",
        type: "standard",
        content:
          "As Featured Intern, I delivered five artifacts: a complete configuration audit documenting every setting and its dependencies, a ghost dependency map that exposed bugs no one knew existed, a simplified Figma redesign of the clinical interface, comprehensive platform documentation (the first the team had), and a D2C strategy proposal with subscription tier modeling. The redesign and documentation were handed off to engineering for implementation after my internship. The most valuable skill I took away was learning to operate across hardware, ML, and UX teams simultaneously, translating between engineers who spoke in signal fidelity and clinicians who spoke in patient outcomes.",
      },
    ],
    tier: 1,
    featured: true,
    visible: true,
  },
  {
    slug: "ngram-text-generation",
    title: "Multi-Context N-Gram Prediction",
    description:
      "A typing assistant that trains separate language models per context and switches between them in real time.",
    thumbnail: "/images/ngram-text-generation/interface.png",
    tags: ["Python", "NLP", "Jupyter", "ML Engineering"],
    summary:
      "I built a context-aware text prediction system that trains independent trigram language models on personal, work, and hobby messaging data, then uses a backoff scoring algorithm with softmax normalization to detect which context you are typing in and suggest the most likely next words from the right model.",
    timeline: "2025",
    github: "https://github.com/sohmrd/Multi-Context-N-Gram-Text-Generation",
    role: "Solo Developer",
    duration: "3 weeks",
    tools: ["Python", "NumPy", "Jupyter Notebooks", "ipywidgets", "Pickle", "Matplotlib"],
    heroImage: "/images/ngram-text-generation/interface.png",
    sections: [
      {
        heading: "The Challenge",
        type: "standard",
        content:
          "I wanted to build a personalized typing assistant that goes beyond generic autocomplete. The core idea: people write differently depending on who they are talking to. A message to a friend uses different vocabulary than a Slack message to a coworker or a post about a hobby. I trained three separate trigram language models on personal, work, and hobby text data, then built a real-time context detection engine that scores incoming text against all three models and dynamically selects the best one for next-word prediction.",
        slides: [
          "/images/ngram-text-generation/slide-1.png",
          "/images/ngram-text-generation/slide-2.png",
          "/images/ngram-text-generation/slide-3.png",
          "/images/ngram-text-generation/slide-4.png",
        ],
      },
      {
        heading: "The Logic",
        type: "code",
        content:
          "The context detection engine scores user input against all three trained models using a backoff strategy: trigram matches carry full log-probability weight, bigram prefix matches get a partial bonus, and individual known words get a small boost. Out-of-vocabulary words receive a penalty. Scores are normalized per word count to avoid bias toward longer inputs, then converted to probabilities via softmax.",
        language: "Python",
        code: `def predict_context(text, models, vocabs, contexts):
    normalized_text = normalize_string(text)
    words = normalized_text.split()
    context_scores = {ctx: 0.0 for ctx in contexts}

    W_TRIGRAM = 1.0    # log-prob weight for trigram match
    W_BIGRAM  = 0.5    # bonus for bigram prefix match
    W_UNIGRAM = 0.2    # bonus for known word
    PENALTY   = -5.0   # out-of-vocabulary penalty

    for i, ctx in enumerate(contexts):
        vocab, model = vocabs[i], models[i]
        score = 0.0

        for word in words:
            score += W_UNIGRAM if word in vocab._word2token \\
                else PENALTY

        # Bigram scoring
        for j in range(len(words) - 1):
            w1, w2 = words[j], words[j + 1]
            if w1 in vocab._word2token and w2 in vocab._word2token:
                t1 = vocab.word2token(w1)
                t2 = vocab.word2token(w2)
                if t1 in model and t2 in model.get(t1, {}):
                    score += W_BIGRAM

        # Trigram scoring
        for j in range(len(words) - 2):
            w1, w2, w3 = words[j], words[j+1], words[j+2]
            if all(w in vocab._word2token for w in [w1, w2, w3]):
                t1, t2, t3 = [vocab.word2token(w)
                    for w in [w1, w2, w3]]
                prob = model.get(t1,{}).get(t2,{}).get(t3, 0)
                if prob > 0:
                    score += math.log(prob) * W_TRIGRAM

        context_scores[ctx] = score / max(len(words), 1)

    # Softmax normalization
    mx = max(context_scores.values())
    exp = {c: math.exp(s - mx) for c, s in context_scores.items()}
    total = sum(exp.values())
    return {c: e / total for c, e in exp.items()}`,
        images: ["/images/ngram-text-generation/interface.png"],
      },
      {
        heading: "Failure Log",
        type: "failure",
        content:
          "Three problems shaped the final architecture of the system.",
        iterations: [
          {
            version: "v1: Training Data",
            issue:
              "Personal chat data is not publicly available, and large text exports from messaging apps were inaccessible from Excel or any CSV-compatible tool.",
            fix: "Wrote Python scripts to clean raw chat exports from the terminal, converting CSV dumps to plain text files suitable for trigram training.",
          },
          {
            version: "v2: Data Structure",
            issue:
              "Started with NumPy arrays to store trigram counts, but memory usage scaled with vocabulary size cubed. Training on real conversation data was impractical.",
            fix: "Switched to sparse nested dictionaries ({t1: {t2: {t3: count}}}) for O(1) lookup with storage proportional only to observed trigrams, not the full vocabulary cube.",
          },
          {
            version: "v3: Training Time",
            issue:
              "Training on the full dataset took several hours, and every notebook restart required retraining from scratch.",
            fix: "Implemented Pickle serialization to save trained models and vocabularies to disk. Subsequent launches load instantly from the .pkl file instead of retraining.",
          },
        ],
      },
      {
        heading: "The Outcome",
        type: "standard",
        content:
          "The final system runs as an interactive Jupyter notebook with a real-time text input field, clickable autofill buttons showing the top three predicted words with probabilities, and a live context analysis bar chart showing the probability distribution across Personal, Work, and Hobby models. Typing a casual message like \"hey what are you doing\" shifts the context detector toward Personal (71%), while a phrase like \"I hope this email finds you\" pulls it toward Work. The project taught me the fundamentals of language modeling from scratch, before transformers, and gave me intuition for why context-specific models outperform one-size-fits-all approaches.",
      },
    ],
    tier: 2,
    featured: false,
    visible: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllVisibleProjects(): Project[] {
  return projects.filter((p) => p.visible);
}

export function getNextProject(slug: string): { slug: string; title: string } | null {
  const visible = projects.filter((p) => p.visible);
  const idx = visible.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const next = visible[(idx + 1) % visible.length];
  return { slug: next.slug, title: next.title };
}
