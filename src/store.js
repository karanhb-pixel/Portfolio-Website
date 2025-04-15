// Simple global store
let name = '';

// Get the current name
export const getName = () => name;

// Set a new name
export const setName = (newName) => {
  name = newName;
};