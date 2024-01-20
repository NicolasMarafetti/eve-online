import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import modalBackground from '../../images/add-ship-modal.webp';

import styles from './AddingShipModal.module.scss';
import AddShipModalArmorResistance from '../AddShipModalArmorResistance';
import { Resistance } from '@/const/resistance_colors';
import AddShipModalShieldResistance from '../AddShipModalShieldResistance';

const AddShipModal = () => {
    const [shipName, setShipName] = useState('');
    const [shipType, setShipType] = useState('Fregate'); // valeur par défaut
    const [shieldResistances, setShieldResistances] = useState({ EM: 20, Thermique: 10, Explosive: 10, Kinetic: 10 });
    const [armorResistances, setArmorResistances] = useState({ EM: 20, Thermique: 10, Explosive: 10, Kinetic: 10 });

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        });
        return () => {
            window.removeEventListener('resize', () => {
                setWindowWidth(window.innerWidth);
                setWindowHeight(window.innerHeight);
            });
        };
    }, [])

    // Gérer les changements d'input
    const handleInputChange = (e: any, setter: any) => {
        const { name, value } = e.target;
        setter((prev: any) => ({ ...prev, [name]: value }));
    };

    const calculateGenericBottomPosition = (normalBottomPositionPercentage: number) => {
        const imageWidth = 1792;
        const imageHeight = 1024;

        const screenResolution = windowWidth / windowHeight;
        const imageResolution = imageWidth / imageHeight;

        if (screenResolution < imageResolution) return `${normalBottomPositionPercentage}%`;

        const imageRatio = windowWidth / imageWidth;
        const imageActualHeight = imageHeight * imageRatio;
        const imageHighestPosition = 0 - (imageActualHeight - windowHeight) / 2;
        const bottomPosition = `${imageHighestPosition + (imageActualHeight * normalBottomPositionPercentage / 100)}px`;
        return bottomPosition;
    }

    const calculateGenericLeftPosition = (normalLeftPositionPercentage: number) => {
        const imageWidth = 1792;
        const imageHeight = 1024;

        const screenResolution = windowWidth / windowHeight;
        const imageResolution = imageWidth / imageHeight;

        if (screenResolution > imageResolution) return `calc(${normalLeftPositionPercentage}%)`;

        const imageRatio = windowHeight / imageHeight;
        const imageActualWidth = imageWidth * imageRatio;
        const imageLeftestPosition = 0 - (imageActualWidth - windowWidth) / 2;
        const leftPosition = `${imageLeftestPosition + (imageActualWidth * normalLeftPositionPercentage / 100)}px`;
        return leftPosition;
    }

    const calculateGenericTopPosition = (normalTopPositionPercentage: number) => {
        const imageWidth = 1792;
        const imageHeight = 1024;

        const screenResolution = windowWidth / windowHeight;
        const imageResolution = imageWidth / imageHeight;

        if (screenResolution < imageResolution) return `${normalTopPositionPercentage}%`;

        const imageRatio = windowWidth / imageWidth;
        const imageActualHeight = imageHeight * imageRatio;
        const imageHighestPosition = 0 - (imageActualHeight - windowHeight) / 2;
        const topPosition = `${imageHighestPosition + (imageActualHeight * normalTopPositionPercentage / 100)}px`;
        return topPosition;
    }

    const handleArmorResistanceClick = (resistanceType: string, resistancePercentage: number) => {
        // Updating the state with the calculated percentage.
        // Ensure that this percentage is clamped between 0 and 100.
        setArmorResistances({
            ...armorResistances,
            [resistanceType]: Math.min(100, Math.max(0, resistancePercentage))
        });
    }

    const handleShieldResistanceClick = (resistanceType: string, resistancePercentage: number) => {
        // Updating the state with the calculated percentage.
        // Ensure that this percentage is clamped between 0 and 100.
        setShieldResistances({
            ...shieldResistances,
            [resistanceType]: Math.min(100, Math.max(0, resistancePercentage))
        });
    }

    const shipNameBottomPosition = () => {
        return calculateGenericBottomPosition(12.5);
    }

    const shipTypeLeftPosition = () => {
        return calculateGenericLeftPosition(55.5);
    }

    const shipTypeTopPosition = () => {
        return calculateGenericTopPosition(11.5);
    }

    return (
        <div className={`${styles.adding_ship_modal} absolute left-0 right-0 bottom-0 top-0 bg-black`}>
            {/* Utilisez Image de Next.js pour un meilleur rendu et optimisation */}
            <Image src={modalBackground} alt="Ship Modal Background" layout='fill' objectFit='cover' />

            {/* Les éléments modifiables par l'utilisateur */}
            <div className="absolute top-0 left-0 bottom-0 right-0 modal-content">
                <input
                    className="absolute bg-transparent text-center text-white"
                    type="text"
                    value={shipName}
                    onChange={(e) => setShipName(e.target.value)}
                    placeholder="Nom du vaisseau"
                    style={{
                        left: '50.5%',
                        bottom: shipNameBottomPosition(),
                        transform: 'translate(-50%, 0)'
                    }}
                />
                <select
                    className="absolute bg-transparent text-sm"
                    value={shipType}
                    onChange={(e) => setShipType(e.target.value)}
                    style={{
                        left: shipTypeLeftPosition(),
                        // left: 'calc(50% + 92px)',
                        top: shipTypeTopPosition(),
                        transform: 'translate(0, -50%)'
                    }}
                >
                    <option className="bg-[#485558]" value="Fregate">Fregate</option>
                    <option className="bg-[#485558]" value="Croiseur">Croiseur</option>
                    {/* Ajoutez plus d'options selon vos besoins */}
                </select>
                <AddShipModalArmorResistance armorResistances={armorResistances} handleArmorResistanceClick={handleArmorResistanceClick} />
                <AddShipModalShieldResistance shieldResistances={shieldResistances} handleShieldResistanceClick={handleShieldResistanceClick} />
                {/* Répétez les inputs pour les autres résistances */}
            </div>
        </div>
    );
};

export default AddShipModal;