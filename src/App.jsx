import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';
import DownloadComponent from './download2Png';

function App() {
  const [screenshotTarget, setScreenshotTarget] = useState(null);

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    
    const gltfLoader = new GLTFLoader();
    
    // Use the onLoad callback to ensure the 3D model is loaded before setting screenshotTarget
    gltfLoader.load('./assets/shiba/scene.gltf', (gltfScene) => {
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene.add(gltfScene.scene);

      // Wait for the next frame to ensure proper rendering
      requestAnimationFrame(() => {
        setScreenshotTarget(document.getElementById("myThreeJsCanvas"));
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      test.animate(); // Make sure to call the animate method of your SceneInit instance
    };
    // Start the animation loop
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
      {screenshotTarget && <DownloadComponent screenshotTarget={screenshotTarget} />}
    </div>
  );
}

export default App;
