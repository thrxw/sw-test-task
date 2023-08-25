import React from 'react';
import {Character} from '../types';
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

interface CharacterCardProps {
    character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    return (
        <Card
            sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
        >
            <CardActionArea>
                <CardMedia
                    component="div"
                    sx={{
                        height: '300px',
                    }}
                    image={`/assets/img/characters/${character?.url?.split('/').slice(-2, -1)}.jpg`}
                />
                <CardContent>
                    <Typography variant="h6">
                        {character.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CharacterCard;
