const inputField = document.getElementById('input-field');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Check if localStorage is available
if (typeof(Storage) !== 'undefined') {
  // Get existing todo list items from localStorage
  const storedItems = JSON.parse(localStorage.getItem('todoListItems')) || [];
  // Show existing items on the todo list
  showTodoListItems(storedItems);
}

// Add event listener to add button
addBtn.addEventListener('click', () => {
  const inputValue = inputField.value.trim();
  
  // Do nothing if input is empty
  if (!inputValue) {
    return;
  }
  
  // Add new item to the todo list
  addItem(inputValue);
  // Reset input field
  inputField.value = '';
});

// Add item to the todo list
function addItem(value) {
  // Create new list item
  const newItem = document.createElement('li');
  newItem.textContent = value;
  
  // Add remove button to the list item
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    removeItem(newItem);
  });
  newItem.appendChild(removeBtn);
  
  // Add edit button to the list item
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    editItem(newItem);
  });
  newItem.appendChild(editBtn);
  
  // Add new item to the top of the todo list
  todoList.prepend(newItem);
  
  // Update localStorage
  updateLocalStorage();
}

// Remove item from the todo list
function removeItem(item) {
  item.remove();
  // Update localStorage
  updateLocalStorage();
}

// Edit item in the todo list
function editItem(item) {
  const currentValue = item.textContent;
  const newValue = prompt('Enter new value:', currentValue.trim());
  
  // Do nothing if new value is empty or same as current value
  if (!newValue || newValue === currentValue) {
    return;
  }
  
  item.textContent = newValue;
  // Update localStorage
  updateLocalStorage();
}

// Show existing todo list items
function showTodoListItems(items) {
  items.forEach((item) => {
    addItem(item);
  });
}

// Update localStorage with current todo list items
function updateLocalStorage() {
  const items = Array.from(todoList.children).map((item) => {
    return item.textContent.trim();
  });
  localStorage.setItem('todoListItems', JSON.stringify(items));
}
