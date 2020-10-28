import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";
import Anecdote from './components/Anecdote.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import About from './components/About.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import AnecdoteAdditionForm from './components/AnecdoteAdditionForm.jsx';

const padding = {
    paddingRight: 5
};

export default () => {
    const [msg, setMsg] = useState('');
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ]);

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    };

    return (
        <div>
            <Toast msg={msg} setMsg={setMsg} />
            <h1>Software anecdotes</h1>
            <Router>
                <Link to='/' style={padding}>anecdotes</Link>
                <Link to='/add-anecdote' style={padding}>create new</Link>
                <Link to='/about' style={padding}>about</Link>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/add-anecdote">
                        <AnecdoteAdditionForm addNew={addNew} setMsg={setMsg} />
                    </Route>
                    <Route path="/anecdotes/:id">
                        <Anecdote anecdotes={anecdotes} />
                    </Route>
                    <Route path="/">
                        <AnecdoteList anecdotes={anecdotes} />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
};