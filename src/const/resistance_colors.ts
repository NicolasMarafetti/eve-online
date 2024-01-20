import EMResistIcon from '../images/icon_resist_em.png';
import thermResistIcon from '../images/icon_resist_therm.png';
import expResistIcon from '../images/icon_resist_exp.png';
import kinResistIcon from '../images/icon_resist_kin.png';

export type Resistance = {
    [key: string]: any
};

export const resistanceColors: Resistance = {
    EM: '#2e829c',
    Thermique: '#c74426',
    Explosive: '#eeb874',
    Kinetic: '#6d7371'
}

export const resistanceIcons: Resistance = {
    EM: EMResistIcon,
    Thermique: thermResistIcon,
    Explosive: expResistIcon,
    Kinetic: kinResistIcon
};