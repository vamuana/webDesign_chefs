import React, { useState } from 'react';
import NavBar from './Navbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Alert from './Alert';
import Success from './Success';

const RecipeForm = () => {
  const [error, setError] = useState(null); 
  const [successMsg, setSuccessMsg] = useState(null); 
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [''],
    description: '',
    directions: '',
  });
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setRecipe((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipe.name || recipe.ingredients.length === 0 || !recipe.description || !recipe.directions) {
      setError("Please fill in all fields!");
        setTimeout(() => setError(null), 3000);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    } else {
      setSuccessMsg(`Recipe "${recipe.name}" created successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setRecipe({
        name: '',
        ingredients: [''],
        description: '',
        directions: '',
      });
    }
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Box>
      <NavBar />
      <Toolbar />
      {successMsg && <Success msg={successMsg} />}
      {error && <Alert msg={error} />}
      <Box
        sx={{
          maxWidth: '600px',
          margin: '20px auto',
          padding: '20px',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Recipe
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Recipe Name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <Typography variant="h6" component="h2" sx={{ marginY: 2 }}>
            Ingredients
          </Typography>
          {recipe.ingredients.map((ingredient, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
              }}
            >
              <TextField
                fullWidth
                label={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                variant="outlined"
                required
              />
              {index > 0 && (
                <IconButton
                  onClick={() => removeIngredient(index)}
                  color="error"
                  sx={{ marginLeft: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            onClick={addIngredient}
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{
              marginTop: 1,
              backgroundColor: '#7fa845',
              '&:hover': { backgroundColor: '#2C5F2D' },
            }}
          >
            Add Ingredient
          </Button>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            label="Directions"
            name="directions"
            value={recipe.directions}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 3,
              fontWeight: 'bold',
              backgroundColor: '#7fa845',
              '&:hover': { backgroundColor: '#2C5F2D' },
            }}
          >
            Save Recipe
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RecipeForm;
