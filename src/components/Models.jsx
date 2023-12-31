import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { AnimationMixer, LoopOnce, LoopRepeat, Clock, EquirectangularReflectionMapping, MathUtils } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import modelPath1 from '../models/1_4_c.glb';
import modelPath2 from '../models/2_4_c.glb';
import basicHdr from '../tex/basic.hdr';

const ModelRenderer1 = (props) => {
  const [mixer, setMixer] = useState(null);
  const { scene, animations } = useGLTF(modelPath1);
  const [actions, setActions] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const { camera, mouse } = useThree()
  const ref = useRef()

  useEffect(() => {
    if (animations && animations.length) {

      // making seperate instances because if use one the other animation is not completed
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
      setElapsedTime(clock.getElapsedTime())
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  useFrame((state, delta) => {
    if (mixer) {
      mixer[0].update(delta);
      mixer[1].update(delta);

      if (!actions[0].isRunning() && !actions[1].isRunning()) {
        actions[1].play();
      }
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

const Model1 = () => {
  const scrollRef = useRef()
  const scroll = useRef(0)

  return (
    <>
      <color attach='background' args={['black']}> </color>
      <ambientLight />
      <pointLight position={[-1, 1, 0]} intensity={10} />
      <Environment />
      <ModelRenderer1
        modelPath="1_4_c.glb"
        offset={[0, 0, 0]}
        rotation={[0, 0, -Math.PI / 180 * 45]}
        rotationSpeed={0.5}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
      />
      <group position={[0, -7, 0]}>
        <ModelRenderer2
          modelPath="2_4_c.glb"
          offset={[0, 0, 0]}
          rotation={[0, 0, -Math.PI / 180 * 45]}
          rotationSpeed={0.5}
          scale={[0.7, 0.7, 0.7]}
          position={[0, 0, 0]}
        />
      </group>
      <OrbitControls enableZoom={false} enablePan={true} enableRotate={false} />
    </>
  );
};
export default Model1;

