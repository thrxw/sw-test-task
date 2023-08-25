import React from 'react';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

const CharacterCardSkeleton: React.FC = () => {
    return (
        <Card
            sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
        >
            <CardActionArea>
                <Skeleton variant="rectangular" height={300} animation="wave"/>
                <CardContent>
                    <Typography variant="h6">
                        <Skeleton animation="wave"/>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CharacterCardSkeleton;
