import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {Box, Container, Grid, Pagination} from '@mui/material';

import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';
import CharacterCardSkeleton from '../components/CharacterCardSkeleton';

import {Character} from '../types';

const HomePage: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const {isLoading, data} = useQuery({
        queryKey: ['charactersData', {searchQuery, currentPage}],
        queryFn: () =>
            fetch(`https://swapi.dev/api/people/?search=${searchQuery}&page=${currentPage}`).then(
                (res) => res.json(),
            ),

    });

    useEffect(() => {
        if (data) {
            setCharacters(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        }
    }, [data]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (data: string) => {
        setSearchQuery(data);
        setCurrentPage(1);
    };

    return (
        <Container sx={{pt: 4, pb: 0}} maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item container spacing={2} justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item xs={12} lg={8}>
                        <SearchBar onSearch={handleSearch}/>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Box style={{display: 'flex', justifyContent: 'flex-end'}}>
                            {!!characters.length && <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                shape="rounded"
                            />}
                        </Box>
                    </Grid>
                </Grid>

                <Grid item container>
                    <Grid container spacing={4} columns={10}>
                        {
                            isLoading
                                ? [1, 2, 3, 4, 5].map((character, index) => (
                                    <Grid item key={index} xs={10} sm={5} md={2}>
                                        <CharacterCardSkeleton/>
                                    </Grid>
                                ))
                                : characters.map((character, index) => (
                                    <Grid item key={index} xs={10} sm={5} md={2}>
                                        <Link to={`/characters/${character.url.split('/').slice(-2, -1)}`}>
                                            <CharacterCard character={character}/>
                                        </Link>
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
