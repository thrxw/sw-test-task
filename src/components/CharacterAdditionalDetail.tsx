import React, {useState} from 'react';
import {Character} from '../types';
import {Tab, Tabs} from "@mui/material";
import {
    DirectionsCar as DirectionsCarIcon,
    RocketLaunch as RocketLaunchIcon,
    Theaters as TheatersIcon
} from '@mui/icons-material';
import TabPanel from './TabPanel';
import Films from './Films';
import Vehicles from './Vehicles';
import Starships from './Starships';

interface CharacterAdditionalDetailProps {
    character: Character;
}

const CharacterAdditionalDetail: React.FC<CharacterAdditionalDetailProps> = ({character}) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };


    return (
        <>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab icon={<TheatersIcon/>} label="Films"/>
                <Tab icon={<DirectionsCarIcon/>} label="Vehicles"/>
                <Tab icon={<RocketLaunchIcon/>} label="Starships"/>
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <Films urls={character.films}/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <Vehicles urls={character.vehicles}/>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <Starships urls={character.starships}/>
            </TabPanel>
        </>
    );
};

export default CharacterAdditionalDetail;
