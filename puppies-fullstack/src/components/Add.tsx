import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Add() {
  const navigate = useNavigate();
  const [newPuppy, setNewPuppy] = useState({
    breed: '',
    name: '',
    dob: '',
  });

  const addPuppy = (newPup: { breed: string; name: string; dob: string }) => {
    fetch('http://localhost:8080/api/puppies', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(newPup),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      navigate('/');
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setNewPuppy({ ...newPuppy, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addPuppy(newPuppy);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{
          '& > :not(style)': { color: 'white' },
        }}
        id="outlined-basic"
        label="Name of Puppy"
        variant="outlined"
        value={newPuppy.name}
        name="name"
        onChange={handleChange}
      />
      <TextField
        sx={{
          '& > :not(style)': { color: 'white' },
        }}
        id="outlined-basic"
        label="Breed"
        variant="outlined"
        value={newPuppy.breed}
        name="breed"
        onChange={handleChange}
      />
      <TextField
        sx={{
          '& > :not(style)': { color: 'white' },
        }}
        id="outlined-basic"
        label="yyyy-mm-dd"
        variant="outlined"
        value={newPuppy.dob}
        name="dob"
        onChange={handleChange}
      />
      <Stack direction="row" spacing={2}>
      <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        Submit
      </Button>
    </Stack>
    </Box>
  );
}
