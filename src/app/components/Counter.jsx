"use client"
import { useState, useEffect, useRef } from 'react';
import Shake from 'shake.js';
import Image from 'next/image';
import logo from "../../../public/shakeLogo.jpeg";
import Link from 'next/link';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        if (!permissionGranted){
            checkMotionPermission();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            setCount((prevCount) => prevCount + 1);
        };

        window.addEventListener('shake', handleShake, false);

        // Cleanup
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
        <div className={`border-4 border-blue-500 justify-center items-center text-center`}>
            {!permissionGranted && (
                    <button
                        className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4'
                        onClick={checkMotionPermission}
                    >
                        Allow Device Motion
                    </button>                
            )}
            <h1 className='font-bold text-2xl'>Shake to Increase Count</h1>
            <p>Shake your phone to increase the count:</p>
            <h2 className='mt-2 text-4xl'>{count}</h2>
            <Image className="mx-auto mt-5" src={logo} alt="Shake" width={450} height={450} />
        </div>
    );
};

export default Counter;
