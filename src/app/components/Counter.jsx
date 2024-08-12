"use client"
import { useState, useEffect, useRef } from 'react';
import Shake from 'shake.js';
import Image from 'next/image';
import logo from "../../../public/ShakeNoBg.png";
import Link from 'next/link';
import Header from './Navigation/Header';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const maxEnergy = process.env.NEXT_PUBLIC_MAX_ENERGY;

    useEffect(() => {
        if (!permissionGranted){
            checkMotionPermission();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleClick = () => {
        if (count < maxEnergy) {
            setCount((prevCount) => prevCount + 1);
        }
    };

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
            if (btnRef.current) btnRef.current.style.display = 'block';
        }
    };

    const setupShakeEvent = () => {
        const myShakeEvent = new Shake({ threshold: 10, timeout: 150 });
        myShakeEvent.start();

        const handleShake = () => {
            if(count < maxEnergy){
                setCount((prevCount) => prevCount + 1);
            }
        };

        window.addEventListener('shake', handleShake, false);

        return () => {
            myShakeEvent.stop();
            window.removeEventListener('shake', handleShake, false);
        };
    };

    const loadTelegramWidget = () => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?19';
        script.async = true;
        script.setAttribute('data-telegram-login', 'shakeTongamebot'); // Replace with your bot's username
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', 'fendy-kocok.vercel.app/api/auth/telegram'); // Replace with your auth endpoint
        script.setAttribute('data-request-access', 'write');
        document.getElementById('telegram-login').appendChild(script);
    };

    return (
        <>
        <Header curEnergy={maxEnergy - count} maxEnergy={maxEnergy}/>
        <div className={`h-[calc(100vh-4rem)] flex items-center`}>
            <div className=''>
                {!permissionGranted && (
                    <button
                        className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4'
                        onClick={checkMotionPermission}
                    >
                        Allow Device Motion
                    </button>
                )}

                <div className='w-full text-center'>
                    <button onClick={handleClick}>klik</button>
                    <h1 className='w-full font-bold text-2xl'>Shake to Increase Count</h1>
                    <p>Shake your phone to increase the count:</p>
                    <h2 className='mt-2 text-4xl'>{count}</h2>
                </div>

                    <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        {/* <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={"width: 45%;"}> 45%</div> */}
                    </div>
                <Image className="mx-auto mt-5" src={logo} alt="Shake" width={450} height={450} />
            </div>
            
        </div>
        </>
    );
};

export default Counter;
