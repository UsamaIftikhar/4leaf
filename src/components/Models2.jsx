import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { AnimationMixer, LoopOnce, LoopRepeat, Clock } from 'three';
import { useScroll } from 'react-use-gesture';
import modelPath1 from '../models/1_4_c.glb';
import modelPath2 from '../models/2_4_c.glb';

const ModelRenderer1 = (props) => {
  const [mixer, setMixer] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const { scene, animations } = useGLTF(modelPath1);
  const [actions, setActions] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const ref = useRef()
  // useScroll(({ xy: [, y] }) => setScrollY(y), {
  //   domTarget: window,
  // });

  useEffect(() => {
    if (animations && animations.length) {
      // making separate instances because if we use one, the other animation is not completed
      const mixerInstance1 = new AnimationMixer(scene);
      const mixerInstance2 = new AnimationMixer(scene);

      // action1 looping once
      const action1 = mixerInstance1.clipAction(animations[0]);
      action1.setLoop(LoopOnce);
      action1.clampWhenFinished = true;
      action1.play();

      // action2 looping infinity
      const action2 = mixerInstance2.clipAction(animations[1]);
      action2.timeScale = 0.2;
      action2.setLoop(LoopRepeat);

      setMixer([mixerInstance1, mixerInstance2]);
      setActions([action1, action2]);
    }
  }, [scene, animations]);

  // it is for updating the offset of the model
  useEffect(() => {
    const clock = new Clock();
    const animate = () => {
      setElapsedTime(clock.getElapsedTime());
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useFrame((state, delta) => {
    if (mixer) {
      mixer[0].update(delta);
      mixer[1].update(delta);

      if (!actions[0].isRunning() && !actions[1].isRunning()) {
        actions[1].play();
      }
    }

    // Now we use the scrollY state variable to set the position of the camera.
    const { camera } = state;
    camera.position.y = scrollY * 0.01; // Adjust this factor as needed
  });

  return (
    <mesh {...props} ref={ref}>
      <PerspectiveCamera
        makeDefault  // This makes the camera the default one for the scene
        fov={100}     // Field of View (vertical angle) in degrees
        aspect={window.innerWidth / window.innerHeight} // Aspect ratio
        near={0.1}    // Near clipping plane distance
        far={100}     // Far clipping plane distance
        position={[0, -5, 5]} // Camera position as an array [x, y, z]
      />
      <primitive object={scene} />
      <group position={[4, -2, 0]}>
        <Html position={[0, -1, 0]}>
          <h2 style={{color: 'white'}}>HTML Content After Model</h2>
        </Html>
      </group>
    </mesh>
  );
};

const ModelRenderer2 = (props) => {
  const [mixer, setMixer] = useState(null);
  const { scene, animations } = useGLTF(modelPath2);
  const [actions, setActions] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const { camera, mouse } = useThree()
  const ref = useRef()

  useEffect(() => {
    if (animations && animations.length) {
      const mixerInstance1 = new AnimationMixer(scene);
      const action1 = mixerInstance1.clipAction(animations[0]);
      action1.setLoop(LoopRepeat);
      action1.clampWhenFinished = true;
      action1.timeScale = 0.2;
      action1.play();

      setMixer([mixerInstance1]);
      setActions([action1]);
    }
  }, [scene, animations]);

  // it is for updating the offset of the model
  useEffect(() => {
    const clock = new Clock();
    const animate = () => {
      setElapsedTime(clock.getElapsedTime())
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  useFrame((state, delta) => {
    if (mixer) {
      mixer[0].update(delta);
    }

    if (ref.current) {
      ref.current.position.y += Math.sin(elapsedTime) / 2000
      ref.current.position.x = -(mouse.x / 5000 - camera.position.x) * 0.5
    }
  });

  const scroll = useRef(0)

  return (
    <mesh
      {...props}
      ref={ref}
      position={[0, 3, 0]}
    >
      <PerspectiveCamera
        makeDefault  // This makes the camera the default one for the scene
        fov={75}     // Field of View (vertical angle) in degrees
        aspect={window.innerWidth / window.innerHeight} // Aspect ratio
        near={0.1}    // Near clipping plane distance
        far={100}     // Far clipping plane distance
        position={[0, -1, 5]} // Camera position as an array [x, y, z]
      />
      <primitive object={scene} />
    </mesh>
  );

};

const Models2 = () => {
  const cameraSettings = {
    position: [0, 0, 5], // Set your desired camera position
    fov: 115, // Set the field of view (FOV)
    near: 0.1,
    far: 1000,
  };

  return (
    <div style={{ height: '100vh' }}>
      <Suspense fallback={null}>
        <Canvas
          style={{ minHeight: '600vh' }} // Set the desired height here
        >
          <ambientLight />
          <pointLight position={[-1, 1, 0]} intensity={10} />
          <ModelRenderer1
            modelPath="1_4_c.glb"
            offset={[0, 0, 0]}
            rotation={[0, 0, -Math.PI / 180 * 45]}
            rotationSpeed={0.5}
            scale={[0.3, 0.3, 0.3]}
            position={[-0.4, 0, 0]}
          />
          <ModelRenderer2
            modelPath="2_4_c.glb"
            offset={[0, 0, 0]}
            rotation={[0, 0, -Math.PI / 180 * 45]}
            rotationSpeed={0.5}
            scale={[0.3, 0.3, 0.3]}
            position={[0, 0, 0]}
          />
          <OrbitControls enableZoom={false} enablePan={true} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
};

function App() {
  return <Models2 />;
}

export default App;

// <pointLight position={[10, 10, 10]} />
// {boxes.map((box, index) => (
//   <Box key={index} position={box.position}>
//     <meshStandardMaterial color={box.color} />
//     <Html
//       position={[0, 0, 0]}
//     >
//       <p style={{ color: 'white', textAlign: 'center', fontSize: '1rem', margin: '0' }}>
//         Hello
//       </p>
//     </Html>
//   </Box>
// ))}