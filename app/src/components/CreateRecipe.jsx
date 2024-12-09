import React, { useState, useRef } from 'react';
import NavBar from './Navbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
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
    photo: null,
  });
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [formError, setFormError] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  const handleRemovePhoto = () => {
    setRecipe((prev) => ({ ...prev, photo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!recipe.name) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setFormError("Please enter the recipe name!");
      setTimeout(() => setError(null), 3000);
      return;
    }
  
    if (recipe.ingredients.length === 0 || recipe.ingredients.some((ingredient) => !ingredient)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setFormError("Please add at least one ingredient!");
      return;
    }
  
    if (!recipe.description) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setFormError("Please enter the recipe description!");
      return;
    }
  
    if (!recipe.directions) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setFormError("Please enter the recipe directions!");
      return;
    }
    if (!recipe.name || recipe.ingredients.length === 0 || !recipe.description || !recipe.directions) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setFormError("Please fill in all fields!");
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      setFormError(null);
      setSuccessMsg(`Recipe "${recipe.name}" created successfully!`);
      setTimeout(() => setSuccessMsg(null), 4000);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setRecipe({
        name: '',
        ingredients: [''],
        description: '',
        directions: '',
        photo: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
        <Typography variant="h4" sx={{ fontFamily: "Titillium Web", fontWeight: 700 }} gutterBottom>
          Create a Recipe
        </Typography>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <TextField
            id="recipe-name"
            fullWidth
            label="Recipe Name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />

          {/* Photo Upload */}
          <Box sx={{ marginBottom: 2 }}>
          <Typography
          variant="h6"
          sx={{ fontFamily: "Titillium Web", fontWeight: 700 }}
          gutterBottom
        >
              Recipe Photo
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="upload-photo"
              ref={fileInputRef}
            />
            <label htmlFor="upload-photo">
              <Button variant="contained" component="span">
                Upload Photo
              </Button>
            </label>
            {recipe.photo && (
              <Box
                sx={{
                  position: 'relative',
                  marginTop: 2,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={recipe.photo}
                  alt="Recipe Preview"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                {isHovered && (
                  <IconButton
                    onClick={handleRemovePhoto}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>

          {/* Ingredients */}
          <Box id="ingredients-section">
          <Typography variant="h6" sx={{ fontFamily: "Titillium Web", fontWeight: 700 }} gutterBottom>
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
              marginTop: 3,
              fontWeight: 'bold',
              backgroundColor: '#15803D',
            }}
            className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
          >
            Add Ingredient
          </Button>
          </Box>
          {/* Description */}
          <TextField
            id="recipe-description"
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

          {/* Directions */}
          <TextField
            id="recipe-directions"
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
            type="button"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              marginTop: 3,
              fontWeight: 'bold',
              backgroundColor: '#15803D',
            }}
            className="w-full bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
          >
            Save Recipe
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RecipeForm;

