"use client"
import { useState, useEffect, useRef } from 'react';
import Shake from 'shake.js';
import Image from 'next/image';
import logo from "../../../public/shakeLogo.jpeg";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const btnRef = useRef(null);

    useEffect(() => {
        checkMotionPermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkMotionPermission = async () => {
        try {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                const permissionState = await DeviceMotionEvent.requestPermission();
                if (permissionState === 'granted') {
                    setPermissionGranted(true);
                    setupShakeEvent();
                } else {
                    if (btnRef.current) btnRef.current.style.display = 'block';
                }
            } else {
                // For non-iOS or iOS < 13 devices
                setPermissionGranted(true);
                setupShakeEvent();
            }
        } catch (error) {
            console.error('Error requesting DeviceMotionEvent permission:', error);
            if (btnRef.current) btnRef.current.style.display = 'block';
        }
    };

    const setupShakeEvent = () => {
        const myShakeEvent = new Shake({ threshold: 10, timeout: 150 });
        myShakeEvent.start();

        const handleShake = () => {
            setCount((prevCount) => prevCount + 1);
        };

        window.addEventListener('shake', handleShake, false);

        // Cleanup
        return () => {
            myShakeEvent.stop();
            window.removeEventListener('shake', handleShake, false);
        };
    };

    return (
        <div className='border h-screen flex flex-col justify-center items-center text-center'>
            <button
                ref={btnRef}
                className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
                style={{ display: 'none', padding: '1em', marginBottom: '1em' }}
                onClick={checkMotionPermission}
            >
                Allow Device Motion
            </button>
            <h1 className='font-bold text-2xl'>Shake to Increase Count</h1>
            <p>Shake your phone to increase the count:</p>
            <h2 className='mt-2 text-4xl'>{count}</h2>
            <Image className="mx-auto mt-5" src={logo} alt="Shake" width={450} height={450} />
        </div>
    );
};

export default Counter;
