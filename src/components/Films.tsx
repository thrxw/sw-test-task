import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, List, ListItem} from "@mui/material";
import {toRoman} from "../utils";

interface FilmsProps {
    urls: string[];
}

const Films: React.FC<FilmsProps> = ({urls}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['films', urls],
        queryFn: async () => {
            const promises = urls.map((url) =>
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {

                        return `Episode ${toRoman(data.episode_id)}: ${data.title}`
                    })
            );

            return Promise.all(promises);
        }
    });

    return (
        <>
            {
                isLoading ? <Box sx={{p: 2}}>
                        <CircularProgress/></Box>
                    : <List>
                        {data?.map((film: string, index: number) => (
                            <ListItem key={index}>{film}</ListItem>
                        ))}
                    </List>
            }
        </>
    );
};

export default Films;
