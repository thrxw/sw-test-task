import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, List, ListItem} from "@mui/material";

interface StarshipsProps {
    urls: string[];
}

const Starships: React.FC<StarshipsProps> = ({urls}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['starships', urls],
        queryFn: async () => {
            const promises = urls.map((url) =>
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => data.name)
            );

            return Promise.all(promises);
        }
    });

    return (
        <>
            {
                isLoading ? <Box sx={{p: 2}}>
                    <CircularProgress/></Box> : <List>
                    {data?.map((film: string, index: number) => (
                        <ListItem key={index}>{film}</ListItem>
                    ))}
                </List>
            }
        </>
    );
};

export default Starships;
