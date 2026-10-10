'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Spaceship3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 150, 500);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 6);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Create main rocket group
    const rocket = new THREE.Group();
    scene.add(rocket);

    // Main body (sleek cylindrical design)
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.35, 3, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0x3b82f6,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    rocket.add(body);

    // Outer shell accent (sleek stripes)
    const shellGeometry = new THREE.CylinderGeometry(0.42, 0.37, 2.9, 32);
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      emissive: 0x0284c7,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: false,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.position.z = 0.01;
    shell.castShadow = true;
    rocket.add(shell);

    // Nose cone (sophisticated point)
    const noseGeometry = new THREE.ConeGeometry(0.4, 1.2, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x22d3ee,
      metalness: 0.95,
      roughness: 0.05,
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 2;
    nose.castShadow = true;
    nose.receiveShadow = true;
    rocket.add(nose);

    // Nose tip (glowing point)
    const tipsGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const tipMaterial = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xd946ef,
      metalness: 1,
      roughness: 0.1,
    });
    const tip = new THREE.Mesh(tipsGeometry, tipMaterial);
    tip.position.y = 2.8;
    tip.castShadow = true;
    rocket.add(tip);

    // Fins (sleek delta wings)
    const finGeometry = new THREE.BoxGeometry(0.15, 1.2, 0.8);
    const finMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1e40af,
      metalness: 0.8,
      roughness: 0.2,
    });

    for (let i = 0; i < 3; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      const angle = (i * Math.PI * 2) / 3;
      fin.position.set(
        Math.cos(angle) * 0.55,
        -0.8,
        Math.sin(angle) * 0.55
      );
      fin.rotation.z = angle;
      fin.castShadow = true;
      rocket.add(fin);
    }

    // Engine base ring
    const engineRingGeometry = new THREE.CylinderGeometry(0.45, 0.5, 0.2, 32);
    const engineRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x4c1d95,
      metalness: 0.7,
      roughness: 0.3,
    });
    const engineRing = new THREE.Mesh(engineRingGeometry, engineRingMaterial);
    engineRing.position.y = -1.6;
    engineRing.castShadow = true;
    rocket.add(engineRing);

    // Engine flames (advanced particle system)
    const flameGeometry = new THREE.BufferGeometry();
    const flameCount = 150;
    const flamePositions = new Float32Array(flameCount * 3);
    const flameVelocities = new Float32Array(flameCount * 3);

    for (let i = 0; i < flameCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.3;
      flamePositions[i] = Math.cos(angle) * radius;
      flamePositions[i + 1] = 0;
      flamePositions[i + 2] = Math.sin(angle) * radius;

      flameVelocities[i] = (Math.random() - 0.5) * 0.05;
      flameVelocities[i + 1] = -Math.random() * 0.3;
      flameVelocities[i + 2] = (Math.random() - 0.5) * 0.05;
    }

    flameGeometry.setAttribute('position', new THREE.BufferAttribute(flamePositions, 3));
    const flameMaterial = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      map: createGradientTexture(),
    });
    const flames = new THREE.Points(flameGeometry, flameMaterial);
    flames.position.y = -1.8;
    rocket.add(flames);

    // Glow rings around body
    const glowGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x3b82f6,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
    });

    for (let i = 0; i < 2; i++) {
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.y = 0.5 - i * 1;
      glow.receiveShadow = true;
      rocket.add(glow);
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x60a5fa, 2);
    mainLight.position.set(3, 3, 3);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xa855f7, 1.5);
    accentLight.position.set(-3, 2, -3);
    scene.add(accentLight);

    const engineLight = new THREE.PointLight(0xff6b35, 2);
    engineLight.position.set(0, -2, 0);
    engineLight.distance = 15;
    scene.add(engineLight);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 300;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 200;
      starPositions[i + 1] = (Math.random() - 0.5) * 200;
      starPositions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animation variables
    let time = 0;
    const flameVelocitiesRef = flameVelocities;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth rocket rotation
      rocket.rotation.y += 0.008;
      rocket.rotation.x = Math.sin(time * 0.5) * 0.15;

      // Floating motion
      rocket.position.y = Math.sin(time * 0.6) * 0.3;

      // Animate flames
      if (flames.geometry.attributes.position) {
        const positions = flames.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += flameVelocitiesRef[i] * 2;
          positions[i + 1] += flameVelocitiesRef[i + 1] * 2;
          positions[i + 2] += flameVelocitiesRef[i + 2] * 2;

          // Reset particles
          if (positions[i + 1] < -2) {
            const j = (i / 3) * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.3;
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = 0;
            positions[i + 2] = Math.sin(angle) * radius;
          }
        }
        flames.geometry.attributes.position.needsUpdate = true;
      }

      // Pulse glow rings
      const rings = rocket.children.filter(
        (child) => child.geometry && child.geometry instanceof THREE.TorusGeometry
      );
      rings.forEach((ring, idx) => {
        ring.rotation.x += 0.002;
        ring.material.opacity = 0.5 + Math.sin(time + idx) * 0.3;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Helper function to create gradient texture
function createGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 200, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

