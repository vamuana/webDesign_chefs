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
  const [currentStep, setCurrentStep] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [formError, setFormError] = useState(null);
  const [preview, setPreview] = useState(null);

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
      setRecipe((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setRecipe((prev) => ({ ...prev, photo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipe.name) {
      setFormError("Please enter the recipe name!");
      return;
    }

    if (recipe.ingredients.length === 0 || recipe.ingredients.some((ingredient) => !ingredient)) {
      setFormError("Please add at least one ingredient!");
      return;
    }

    if (!recipe.description) {
      setFormError("Please enter the recipe description!");
      return;
    }

    if (!recipe.directions) {
      setFormError("Please enter the recipe directions!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", recipe.name);
      formData.append("description", recipe.description);
      formData.append("secondary_description", recipe.directions);

      recipe.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][name]`, ingredient);
      });

      if (recipe.photo) {
        formData.append("image", recipe.photo);
      }

      const response = await fetch("http://127.0.0.1:8000/api/create-recipe/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(`Error: ${errorData.error || "Something went wrong!"}`);
        return;
      }

      setSuccessMsg(`Recipe "${recipe.name}" created successfully!`);
      setTimeout(() => setSuccessMsg(null), 4000);

      resetForm();
    } catch (error) {
      console.error("Error:", error);
      setFormError("Failed to create the recipe!");
    }
  };

  const resetForm = () => {
    setRecipe({
      name: "",
      ingredients: [""],
      description: "",
      directions: "",
      photo: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box>
            <Typography variant="h5 bold" className="text-3xl font-bold mb-6 text-green-600" gutterBottom>
              Recipe Name
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Please provide a name for your recipe.
            </Typography>
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
            <Button
              variant="contained"
              onClick={() => recipe.name && setCurrentStep(2)}
              sx={{ marginTop: 3, fontWeight: 'bold', backgroundColor: '#15803D' }}
              className="w-full bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
              disabled={!recipe.name}
            >
              Next
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h5 bold" className="text-3xl font-bold mb-6 text-green-600" gutterBottom>
              Upload Photo
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Upload a photo to represent your recipe (optional).
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
                  src={preview}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(1)}
                sx={{ fontWeight: 'bold', backgroundColor: '#555' }}
                className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(3)}
                sx={{ fontWeight: 'bold', backgroundColor: '#15803D' }}
                className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h5 bold" className="text-3xl font-bold mb-6 text-green-600" gutterBottom>
              Ingredients
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Add all the ingredients required for your recipe.
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
              sx={{ marginTop: 3, fontWeight: 'bold', backgroundColor: '#15803D' }}
              className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
            >
              Add Ingredient
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(2)}
                sx={{ fontWeight: 'bold', backgroundColor: '#555' }}
                className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => recipe.ingredients.every((ingredient) => ingredient) && setCurrentStep(4)}
                sx={{ fontWeight: 'bold', backgroundColor: '#15803D' }}
                className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
                disabled={!recipe.ingredients.every((ingredient) => ingredient)}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h5 bold" className="text-3xl font-bold mb-6 text-green-600" gutterBottom>
              Directions
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Provide a detailed description and step-by-step directions for your recipe.
            </Typography>
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(3)}
                sx={{ fontWeight: 'bold', backgroundColor: '#555' }}
                className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{ fontWeight: 'bold', backgroundColor: '#15803D' }}
                className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
                disabled={!(recipe.description && recipe.directions)}
              >
                Save Recipe
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
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
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <form onSubmit={handleSubmit}>{renderStep()}</form>
      </Box>
    </Box>
  );
};

export default RecipeForm;
