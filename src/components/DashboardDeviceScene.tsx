import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DashboardDeviceScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.45, 9.8);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.set(-0.12, -0.38, 0.04);
    scene.add(root);

    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x102d43, roughness: 0.42, metalness: 0.32 });
    const trimMaterial = new THREE.MeshStandardMaterial({ color: 0x8bd2f2, roughness: 0.25, metalness: 0.6 });
    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x32b4e7, emissive: 0x0b6390, emissiveIntensity: 0.9, roughness: 0.2 });
    const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xf4fbff, roughness: 0.8 });

    const monitor = new THREE.Group();
    monitor.position.set(-1.55, 0.65, 0.1);
    const display = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.55, 0.16), darkMaterial);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.28), screenMaterial);
    screen.position.z = 0.1;
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.22), trimMaterial);
    stand.position.y = -1.06;
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.12, 0.7), darkMaterial);
    base.position.y = -1.42;
    monitor.add(display, screen, stand, base);
    root.add(monitor);

    const computer = new THREE.Group();
    computer.position.set(1.38, 0.22, -0.35);
    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.18, 2.45, 0.92), darkMaterial);
    const towerTrim = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.78, 0.06), trimMaterial);
    towerTrim.position.set(-0.35, 0, 0.49);
    const indicator = new THREE.Mesh(new THREE.SphereGeometry(0.08, 18, 18), screenMaterial);
    indicator.position.set(0.35, 0.72, 0.49);
    computer.add(tower, towerTrim, indicator);
    root.add(computer);

    const printer = new THREE.Group();
    printer.position.set(0.05, -1.45, 0.55);
    const printerBody = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.94, 1.5), darkMaterial);
    const printerTop = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.18, 1.18), trimMaterial);
    printerTop.position.y = 0.53;
    const paper = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.7, 0.06), paperMaterial);
    paper.position.set(-0.2, 0.79, 0.08);
    paper.rotation.x = -0.2;
    printer.add(printerBody, printerTop, paper);
    root.add(printer);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3.6, 48),
      new THREE.MeshBasicMaterial({ color: 0x53bce8, transparent: true, opacity: 0.16 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.08;
    root.add(floor);

    scene.add(new THREE.HemisphereLight(0xdaf4ff, 0x002a4e, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(-3, 5, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x41c7f4, 12, 10);
    rimLight.position.set(3, 2, 3);
    scene.add(rimLight);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const wideScene = camera.aspect > 1.7;
      root.position.x = wideScene ? 1.25 : 0.4;
      root.scale.setScalar(wideScene ? 1.1 : 0.9);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    const animationStartedAt = performance.now();
    const render = () => {
      const elapsed = (performance.now() - animationStartedAt) / 1000;
      if (!reducedMotion) {
        root.rotation.y = -0.38 + Math.sin(elapsed * 0.46) * 0.16;
        root.position.y = Math.sin(elapsed * 0.9) * 0.12;
        paper.position.y = 0.79 + Math.sin(elapsed * 1.1) * 0.07;
        indicator.scale.setScalar(0.9 + Math.sin(elapsed * 2) * 0.12);
      }
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="h-[15rem] w-full min-w-0 sm:h-[17rem]" aria-label="مشهد ثلاثي الأبعاد لأجهزة تقنية المعلومات" role="img" />;
}
