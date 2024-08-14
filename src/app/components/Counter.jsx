"use client";
import { useState, useEffect, useRef } from 'react';
import Shake from 'shake.js';
import Image from 'next/image';
import logo from "../../../public/ShakeNoBg.png";
import Header from './Navigation/Header';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [energy, setEnergy] = useState({
        current: 100,
        max: 100
    });
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [increment, setIncrement] = useState(1);
    const frenzyBar = energy.max * 0.8;
    const myShakeEvent = useRef(null);
    const [frenzy, setFrenzy] = useState({
        isActive: false,
        count: 0
    });
    const frenzyTimer = useRef(null)
    const frenzyDuration = 5000;
    
    useEffect(() => {
        if (count === energy.max && myShakeEvent.current) {
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

    const startFrenzyTimer = () => {
                frenzyTimer.current = setTimeout(() => {
                    setFrenzy((prevFrenzy) => ({
                        ...prevFrenzy,
                        isActive: false
                    }));
                    setIncrement(1);
                    alert("Frenzy Mode Deactivated");
                }, frenzyDuration); 
    }

    const handleShake = () => {
        if (energy.current > 0) {
            if(frenzy.count >= frenzyBar && !frenzy.isActive){
                setFrenzy({
                    isActive: true,
                    count: 0
                });
                setIncrement(2);
                alert("Frenzy Mode Activated");
                startFrenzyTimer();
            }else { 

                setCount((prevCount) => prevCount + increment);
                setEnergy((prevEnergy) => ({
                    ...prevEnergy,
                    current: prevEnergy.current - 1
                }));

                if(frenzy.isActive){
                    setFrenzy({
                        isActive: frenzy.isActive,
                        count: 0
                    });
                }
                else { 
                    setFrenzy({
                        isActive: false,
                        count: frenzy.count + increment
                    });
                }
            }
        }else {
            alert("You have reached the maximum energy");
            if (myShakeEvent.current) {
                myShakeEvent.current.stop();
                window.removeEventListener('shake', handleShake, false);
            }
        }
    };

    return (
        <div className='w-full h-full'>
            <Header curEnergy={energy.current} maxEnergy={energy.max} />
            <div className={`h-[calc(100vh-9rem)] mt-5 flex items-center`}>
                <div className='w-full'>
                    <div className='flex flex-col text-center items-center gap-y-3'>
                        <h1 className='w-full font-bold text-2xl'>Shake to Increase Count</h1>
                        <p>Shake your phone to increase the count:</p>
                        <h2 className='mt-2 text-4xl'>{count}</h2>
                        <button
                            onClick={handleShake}
                            className='bg-blue-500 w-[50%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                        >
                            Klik to Shake
                        </button>
                        {!permissionGranted && (
                            <button
                                className='bg-slate-500 w-[50%] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4'
                                onClick={checkMotionPermission}
                            >
                                Allow Device Motion
                            </button>
                        )}
                    </div>
                    <div className='w-[90%] mx-auto'>
                        <div id='frenzybar' className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-5">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${frenzy.count/frenzyBar * 100}%` }}></div>
                        </div>
                    </div>
                    <Image className="h-auto w-[80%] mt-3 mx-auto" src={logo} alt="Shake" width={400} height={400} />
                </div>
            </div>
        </div>
    );
};

export default Counter;
