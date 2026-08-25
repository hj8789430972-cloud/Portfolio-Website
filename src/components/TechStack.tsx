import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SkillItem {
  title: string;
  category: string;
  color: string;
}

const skillItems: SkillItem[] = [
  { title: "Python", category: "Language", color: "#38bdf8" },
  { title: "C", category: "Language", color: "#60a5fa" },
  { title: "C++", category: "Language", color: "#818cf8" },
  { title: "DSA", category: "Language", color: "#c084fc" },
  { title: "HTML", category: "Technology", color: "#f97316" },
  { title: "CSS", category: "Technology", color: "#38bdf8" },
  { title: "JavaScript", category: "Technology", color: "#facc15" },
  { title: "MySQL", category: "Database", color: "#06b6d4" },
  { title: "MongoDB", category: "Database", color: "#10b981" },
  { title: "DBMS", category: "Database", color: "#2dd4bf" },
  { title: "Problem Solving", category: "Soft Skill", color: "#ec4899" },
  { title: "Time Management", category: "Soft Skill", color: "#f43f5e" },
  { title: "Adaptability", category: "Soft Skill", color: "#a855f7" },
];

function createSkillTexture(
  title: string,
  category: string,
  accentColor: string
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background radial gradient
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      20,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "#1c1033");
    gradient.addColorStop(0.7, "#0e071c");
    gradient.addColorStop(1, "#05020a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Glowing outer circle border
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 14;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 30, 0, Math.PI * 2);
    ctx.stroke();

    // Inner subtle ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 50, 0, Math.PI * 2);
    ctx.stroke();

    // Category tag
    ctx.fillStyle = accentColor;
    ctx.font =
      "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.fillText(category.toUpperCase(), size / 2, size / 2 - 80);

    // Main skill title text
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
    ctx.shadowBlur = 20;

    const words = title.split(" ");
    if (words.length === 1) {
      ctx.font =
        "900 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(title, size / 2, size / 2 + 10);
    } else if (words.length === 2) {
      ctx.font =
        "bold 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(words[0], size / 2, size / 2 - 10);
      ctx.fillText(words[1], size / 2, size / 2 + 45);
    } else {
      ctx.font =
        "bold 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(words.slice(0, 2).join(" "), size / 2, size / 2 - 15);
      ctx.fillText(words.slice(2).join(" "), size / 2, size / 2 + 35);
    }

    // Bottom accent indicator bar
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 10;
    ctx.fillRect(size / 2 - 40, size / 2 + 95, 80, 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(28)].map(() => ({
  scale: [0.75, 0.95, 0.85, 1, 0.9][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Refresh ScrollTrigger so pin spacer distances are accurate
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const handleScroll = () => {
      const elem = document.getElementById("techstack");
      if (elem) {
        const rect = elem.getBoundingClientRect();
        setIsActive(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 20);
        setTimeout(() => {
          clearInterval(interval);
        }, 1200);
      });
    });
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return skillItems.map((skill) => {
      const texture = createSkillTexture(
        skill.title,
        skill.category,
        skill.color
      );
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.25,
        metalness: 0.4,
        roughness: 0.8,
        clearcoat: 0.1,
      });
    });
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      <div className="techstack-categories">
        <div className="tech-cat-pill">
          <strong>Languages:</strong> Python, C, C++, DSA
        </div>
        <div className="tech-cat-pill">
          <strong>Technologies:</strong> HTML, CSS, JavaScript
        </div>
        <div className="tech-cat-pill">
          <strong>Databases/Tools:</strong> MySQL, MongoDB, DBMS
        </div>
        <div className="tech-cat-pill">
          <strong>Soft Skills:</strong> Problem Solving, Time Management, Adaptability
        </div>
      </div>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
