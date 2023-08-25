import React, {useEffect, useState} from 'react';
import {Character, inputType} from '../types';
import {Box, Button, CircularProgress, IconButton, Input, Stack, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form"
import {Cancel as CancelIcon, Edit as EditIcon, Save as SaveIcon} from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";

interface CharacterDetailProps {
    character: Character;
    handleSubmitForm: (data: Pick<Character, inputType>) => void;
}

const INPUT_CONFIG: Record<inputType, string> = {
    height: 'Height:',
    mass: 'Mass:',
    hair_color: 'Hair Color:',
    skin_color: 'Skin Color:',
    eye_color: 'Eye Color:',
    birth_year: 'Birth Year:',
    gender: 'Gender:',
}

const CharacterInfo: React.FC<CharacterDetailProps> = ({character, handleSubmitForm}) => {
    const [isEditing, setIsEditing] = useState(false);
    const {isLoading: isHomeworldLoading, data: homeworldData} = useQuery({
        queryKey: ['homeworld'],
        queryFn: () =>
            fetch(character.homeworld)
                .then((response) => response.json())
                .then((data) => data.name)
    });
    const {isLoading: isspeciesLoading, data: speciesData} = useQuery({
        queryKey: ['species'],
        queryFn: async () => {
            const promises = character.species.map((specie) =>
                fetch(specie)
                    .then((response) => response.json())
                    .then((data) => data.name)
            );

            return Promise.all(promises);
        }
    });
    const {control, handleSubmit, setValue} = useForm({
        defaultValues: {
            height: character.height,
            mass: character.mass,
            hair_color: character.hair_color,
            skin_color: character.skin_color,
            eye_color: character.eye_color,
            birth_year: character.birth_year,
            gender: character.gender
        },
    });


    useEffect(() => {
        if (character && isEditing) {
            setValue('height', character.height);
            setValue('mass', character.mass);
            setValue('hair_color', character.hair_color);
            setValue('skin_color', character.skin_color);
            setValue('eye_color', character.eye_color);
            setValue('birth_year', character.birth_year);
            setValue('gender', character.gender);
        }
    }, [character, isEditing]);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const onSubmit = (data: Pick<Character, inputType>) => {
        setIsEditing(false);
        handleSubmitForm(data);
    }

    return (
        <form className="character-card" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" sx={{color: 'primary.main'}}>Character Name: {character.name}</Typography>
            <Typography variant="h6" sx={{color: 'primary.light'}}>Homeworld: {isHomeworldLoading ?
                <CircularProgress size={15}/> : homeworldData}</Typography>
            <Typography variant="h6" sx={{color: 'primary.light'}}>Species: {isspeciesLoading ?
                <CircularProgress size={15}/> : speciesData}</Typography>

            {
                (Object.entries(INPUT_CONFIG) as [inputType, string][]).map(([key, title]) => (
                    <Stack direction="row" spacing={1} key={key}>
                        <Typography>{title}</Typography>
                        {isEditing
                            ?
                            <Controller
                                name={key}
                                control={control}
                                render={({field}) => <Input {...field} />}
                            />
                            : <Typography>{character[key]}</Typography>}
                    </Stack>
                ))
            }

            <Box className="edit-icon">
                {
                    !isEditing && <IconButton
                        aria-label="Edit"
                        onClick={onEdit}
                    >
                        <EditIcon/>
                    </IconButton>
                }
            </Box>

            {
                isEditing && <Stack direction="row" spacing={2} sx={{justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon={<SaveIcon/>} type="submit">
                        Save
                    </Button>
                    <Button variant="outlined" endIcon={<CancelIcon/>} onClick={onCancel}>
                        Cancel
                    </Button>
                </Stack>
            }
        </form>
    );
};

export default CharacterInfo;
