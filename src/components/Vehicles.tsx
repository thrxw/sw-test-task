import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, List, ListItem} from "@mui/material";

interface VehiclesProps {
    urls: string[];
}

const Vehicles: React.FC<VehiclesProps> = ({urls}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['vehicles', urls],
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

export default Vehicles;
