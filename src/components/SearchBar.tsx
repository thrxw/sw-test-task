import React, {useState} from 'react';
import {Divider, IconButton, InputBase, Paper} from '@mui/material';
import {Clear as ClearIcon, Search as SearchIcon} from '@mui/icons-material';

const SearchBar: React.FC<{ onSearch: (results: string) => void }> = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        onSearch(searchQuery.trim());
    };

    const handleClearSearch = async () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {!!searchQuery.length && <IconButton onClick={handleClearSearch}>
                <ClearIcon/>
            </IconButton>}
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton sx={{p: '10px'}} onClick={handleSearch}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
