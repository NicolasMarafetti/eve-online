import React, { useState } from 'react';
import Image from 'next/image';
import modalBackground from '../images/add-ship-modal.webp'; // Remplacez par le chemin réel de votre image

const AddShipModal = () => {
    const [shipName, setShipName] = useState('');
    const [shipType, setShipType] = useState('Fregate'); // valeur par défaut
    const [shieldResistances, setShieldResistances] = useState({ EM: 0, Thermique: 0 });
    const [armorResistances, setArmorResistances] = useState({ EM: 0, Thermique: 0 });

    // Gérer les changements d'input
    const handleInputChange = (e: any, setter: any) => {
        const { name, value } = e.target;
        setter((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-black">
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
                        bottom: '12.5%',
                        transform: 'translate(-50%, 0)'
                    }}
                />
                <select
                    className="absolute bg-transparent text-sm"
                    value={shipType}
                    onChange={(e) => setShipType(e.target.value)}
                    style={{
                        left: 'calc(50% + 92px)',
                        top: '10.5%'
                    }}
                >
                    <option className="bg-[#485558]" value="Fregate">Fregate</option>
                    <option className="bg-[#485558]" value="Croiseur">Croiseur</option>
                    {/* Ajoutez plus d'options selon vos besoins */}
                </select>
                <input
                    className="absolute text-black"
                    type="number"
                    name="EM"
                    placeholder="Shield EM Resistance"
                    value={shieldResistances.EM}
                    onChange={(e) => handleInputChange(e, setShieldResistances)}
                    style={{
                        left: '10%',
                        top: '30%'
                    }}
                />
                {/* Répétez les inputs pour les autres résistances */}
            </div>
        </div>
    );
};

export default AddShipModal;