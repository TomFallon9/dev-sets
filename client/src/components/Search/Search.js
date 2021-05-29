import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Search.css';
import { Container, Input, Grid } from '@material-ui/core';
import API from '../../utils/API';
import ContentCard from '../homePage/card/card';
import UserCard from '../UserCard/UserCard';

const useStyles = makeStyles({
    root: {
        color: 'white'
    },
    searchbar: {
        marginTop: '20px',
        color: 'white'
    }
});

const Search = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [userCards, setUserCards] = useState([]);
    const [postCards, setPostCards] = useState([]);

    useEffect(() => {
        loadPosts();
        loadUsers();
    }, []);

    async function loadPosts() {
        const posts = await API.getSomePosts();
        setPostCards(posts.data);
    };

    async function loadUsers() {
        const users = await API.getUsers();
        setUserCards(users.data);
    };

    function filterUsers(user) {
        if (user.name.toLowerCase().includes(search.toLowerCase())) return user; 
    };

    function filterPosts(post) {
        const lowerTitle = post.title.toLowerCase();
        const lowerDesc = post.desc.toLowerCase();
        const lowerSearch = search.toLowerCase();
        if (lowerTitle.includes(lowerSearch) || lowerDesc.includes(lowerSearch)) return post;
    };

    return(
        <div>
            <Container maxWidth="lg" className="homeContent">
                <h1>Search for Users and DevSets</h1>
                <form
                    onChange={event => {setSearch(event.target.value)}}
                    id="search-form"
                >
                    <Input 
                        fullWidth="true"
                        placeholder="Search"
                        color="secondary"
                        className={classes.searchbar}
                        name="search"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </form>
            </Container>
            <Container maxWidth="lg" className="homeContent">            
                <Grid container spacing={2}>  
                    <Grid item xs={12} lg={6}>
                        <h2>Users</h2>
                        {userCards.filter(user => filterUsers(user)).map(user => (
                            <UserCard user={user} key={user.uid} />
                        ))}
                    </Grid>   
                    <Grid item xs={12} lg={6}>
                        <h2>Posts</h2>
                        {postCards.filter(post => filterPosts(post)).map(post => (
                            <ContentCard post={post} key={post.id} />
                        ))}
                    </Grid>                                  
                </Grid>
            </Container> 
        </div>
    )
}

export default Search;
