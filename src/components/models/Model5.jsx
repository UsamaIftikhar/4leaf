import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { AnimationMixer, LoopRepeat, Clock, EquirectangularReflectionMapping, MathUtils } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import modelPath from '../../models/5_4_c.glb';
import basicHdr from '../../tex/basic.hdr';

const Model = (props) => {
  const [mixer, setMixer] = useState(null);
  const { scene, animations } = useGLTF(modelPath);
  const [actions, setActions] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const { camera, mouse } = useThree()
  const ref = useRef()

  useEffect(() => {
    if (animations && animations.length) {
      console.log("animations", animations)
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
      ref={ref}>
      <ScrollContainer scroll={scroll}>
        <primitive object={scene} />
      </ScrollContainer>
    </mesh>
  );

};

function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree()
  const group = useRef()
  useFrame((state, delta) => {
    group.current.position.y = MathUtils.damp(group.current.position.y, viewport.height * scroll.current, 4, delta)
    // Or: group.current.position.lerp(vec.set(0, viewport.height * scroll.current, 0), 0.1)
  })
  return <group ref={group}>{children}</group>
}

function Environment() {
  const { scene } = useThree();
  const texture = useLoader(RGBELoader, basicHdr);

  useEffect(() => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  }, [texture, scene]);

  return null;
}

const Model5 = () => {
  const scrollRef = useRef()
  const scroll = useRef(0)

  return (
    <div className='canvas-scene' style={{ position: 'relative', width: '100vw', height: '120vh', paddingTop: '10vh' }}>
      <Suspense fallback={null}>
        <Canvas onCreated={(state) => state.events.connect(scrollRef.current)}>
          <color attach='background' args={['black']}> </color>
          <ambientLight />
          <PerspectiveCamera
            makeDefault  // This makes the camera the default one for the scene
            fov={40}     // Field of View (vertical angle) in degrees
            aspect={window.innerWidth / window.innerHeight} // Aspect ratio
            near={0.1}    // Near clipping plane distance
            far={100}     // Far clipping plane distance
            position={[0, 2, 5]} // Camera position as an array [x, y, z]
          />
          <pointLight position={[-1, 1, 0]} intensity={10} />
          <Environment />
          <Model
            modelPath="1_4_c.glb"
            offset={[0, 0, 0]}
            rotation={[-Math.PI/180*45, Math.PI/180*90, 0]}
            rotationSpeed={0.5}
            scale={[0.7, 0.7, 0.7]}
            position={[0, 0, 0]}
          />
          <OrbitControls enableZoom={false} enablePan={true} enableRotate={false} />
        </Canvas>
        <div style={{
          position: 'absolute',
          top: '20vh',
          left: '40vh',
          width: '50vw',
          height: '70vh',
          backgroundColor: 'rgba(0, 66, 235, 0.4)', // change this to your preferred color and opacity
          pointerEvents: 'none',
          filter: 'blur(200px)',
        }} />
        <div
          ref={scrollRef}
          onScroll={(e) => (scroll.current = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight))}
          className="scroll">
          <div style={{ height: `50vh`, pointerEvents: 'none' }}></div>
        </div>
      </Suspense>
    </div>
  );
};
export default Model5;

