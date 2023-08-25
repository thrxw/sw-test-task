import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CharacterInfo from '../components/CharacterInfo';
import {Character, inputType} from '../types';
import {Card, CardMedia, Container, Grid, Paper, Skeleton} from '@mui/material';
import {useQuery} from "@tanstack/react-query";
import CharacterAdditionalDetail from "../components/CharacterAdditionalDetail";

const CharacterDetailPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const {isLoading, data} = useQuery({
        queryKey: ['charactersData', {id}],
        queryFn: () =>
            fetch(`https://swapi.dev/api/people/${id}`).then(
                (res) => res.json(),
            ),
    });

    useEffect(() => {
        if (data) {
            const localData = JSON.parse(localStorage.getItem('SW-characters') || '{}')[id] || {};

            setCharacter({
                ...data,
                ...localData
            })
        }
    }, [data, id]);

    const handleSubmitForm = (data: Pick<Character, inputType>) => {
        const localData = JSON.parse(localStorage.getItem('SW-characters') || '{}');
        const newValue = {
            ...character,
            ...data
        };

        localStorage.setItem('SW-characters', JSON.stringify({
            ...localData,
            [id]: newValue
        }));

        setCharacter(newValue as Character)
    };

    return (
        <Container sx={{pt: 4, pb: 0}} maxWidth="lg">
            <Grid container spacing={3} alignItems={"flex-start"}>
                <Grid item xs={12} md={5}>
                    <Card variant={'outlined'} sx={{borderRadius: 4}}>
                        {isLoading
                            ? <Skeleton variant="rectangular" height={550} animation="wave"/>
                            : <CardMedia
                                sx={{
                                    height: '550px',
                                }}
                                image={`/assets/img/characters/${character?.url?.split('/').slice(-2, -1)}.jpg`}
                            />}
                    </Card>
                </Grid>

                <Grid container spacing={3} item xs={12} md={7}>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, borderRadius: 4}}>
                            {
                                isLoading || !character
                                    ? <>
                                        <Skeleton animation="wave" height={40}/>
                                        <Skeleton animation="wave" height={30} width="80%"/>
                                        <Skeleton animation="wave" height={30} width="80%"/>
                                        <Skeleton animation="wave" height={30} width="80%"/>
                                        <Skeleton animation="wave" height={30} width="80%"/>
                                    </>
                                    : <CharacterInfo character={character} handleSubmitForm={handleSubmitForm}/>
                            }
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        {
                            character && <Paper sx={{p: 2, borderRadius: 4}}>
                                <CharacterAdditionalDetail character={character}/>
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CharacterDetailPage;
