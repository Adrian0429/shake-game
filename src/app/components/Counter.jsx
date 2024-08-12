"use client";
import { useState, useEffect, useRef } from 'react';
import Shake from 'shake.js';
import Image from 'next/image';
import logo from "../../../public/ShakeNoBg.png";
import Header from './Navigation/Header';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const maxEnergy = 10;
    const frenzy = false

    // Define myShakeEvent outside the functions so it's accessible everywhere
    const myShakeEvent = useRef(null);

    useEffect(() => {
        
        if (!permissionGranted) {
            checkMotionPermission();
        }

        if (count === maxEnergy && myShakeEvent.current) {
            myShakeEvent.current.stop();
            window.removeEventListener('shake', handleShake, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, permissionGranted]);

    const checkMotionPermission = async () => {
        try {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                const permissionState = await DeviceMotionEvent.requestPermission();
                if (permissionState === 'granted') {
                    setPermissionGranted(true);
                    setupShakeEvent();
                }
            } else {
                setPermissionGranted(true);
                setupShakeEvent();
            }
        } catch (error) {
            console.error('Error requesting DeviceMotionEvent permission:', error);
        }
    };

    const setupShakeEvent = () => {
        myShakeEvent.current = new Shake({ threshold: 10, timeout: 150 });
        myShakeEvent.current.start();

        window.addEventListener('shake', handleShake, false);
    };

    const handleShake = () => {
        if (count < maxEnergy) {
            setCount((prevCount) => prevCount + 1);
        } else {
            alert("You have reached the maximum energy");
            if (myShakeEvent.current) {
                myShakeEvent.current.stop();
                window.removeEventListener('shake', handleShake, false);
            }
        }
    };

    return (
        <div className='w-full h-full'>
            <Header curEnergy={maxEnergy - count} maxEnergy={maxEnergy} />
            <div className={`h-[90vh] flex items-center`}>
                <div className='w-full'>
                    <div className='w-full text-center'>
                        <h1 className='w-full font-bold text-2xl'>Shake to Increase Count</h1>
                        <p>Shake your phone to increase the count:</p>
                        <h2 className='mt-2 text-4xl'>{count}</h2>
                        <button
                            onClick={handleShake}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                        >
                            Klik to Shake
                        </button>
                        {!permissionGranted && (
                            <button
                                className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4'
                                onClick={checkMotionPermission}
                            >
                                Allow Device Motion
                            </button>
                        )}
                    </div>
                    <div className='w-[90%] mx-auto'>
                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-5">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${(count / maxEnergy) * 100}%` }}> {`${(count / maxEnergy) * 100}%`} </div>
                        </div>
                    </div>
                    

                    <Image className="mx-auto mt-5" src={logo} alt="Shake" width={450} height={450} />
                </div>
            </div>
        </div>
    );
};

export default Counter;
