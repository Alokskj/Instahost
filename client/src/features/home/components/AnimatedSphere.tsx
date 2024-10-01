import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mesh } from 'three';

const AnimatedSphere: React.FC = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2.4} ref={meshRef}>
            <MeshDistortMaterial
                color="#a855f7"
                attach="material"
                distort={0.3}
                speed={1.5}
                roughness={0.4}
            />
        </Sphere>
    );
};

export default AnimatedSphere;
