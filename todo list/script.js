let totalTasks = 0;
let completedTasks = 0;

document.getElementById('add-button').addEventListener('click', function() {
    const taskInput = document.getElementById('todo-input');
    const taskValue = taskInput.value;
    const errorMessage = document.getElementById('error-message');

    if (taskValue.trim() === "") {
        errorMessage.textContent = "Task cannot be empty!";
        errorMessage.style.display = "block";
    } else {
        addTask(taskValue);
        taskInput.value = ''; // ইনপুট বক্স খালি করা হচ্ছে
        errorMessage.style.display = "none"; // ইরর মেসেজ হাইড করা হচ্ছে
    }
});

function addTask(taskValue) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    li.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    deleteButton.addEventListener('click', function() {
        if (li.classList.contains('completed-task')) {
            updateCompletedCounter(-1);
        }
        todoList.removeChild(li);
        updateTaskCounter(-1);
    });

    editButton.addEventListener('click', function() {
        const inputField = document.createElement('input');
        inputField.value = taskText.textContent;
        li.insertBefore(inputField, taskText);
        li.removeChild(taskText);
        editButton.style.display = 'none';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        li.insertBefore(saveButton, deleteButton);

        saveButton.addEventListener('click', function() {
            taskText.textContent = inputField.value;
            li.insertBefore(taskText, inputField);
            li.removeChild(inputField);
            li.removeChild(saveButton);
            editButton.style.display = 'inline';
            completeTask(li, taskText);
        });
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
    updateTaskCounter(1);
}

function completeTask(li, taskText) {
    if (!li.classList.contains('completed-task')) {
        li.classList.add('completed-task');
        li.style.textDecoration = 'line-through';
        updateCompletedCounter(1);
    }
}

function updateTaskCounter(change) {
    totalTasks += change;
    document.getElementById('total-counter').textContent = totalTasks; // টাস্ক সংখ্যা আপডেট
}

function updateCompletedCounter(change) {
    completedTasks += change;
    document.getElementById('completed-counter').textContent = completedTasks; // কমপ্লিট টাস্ক সংখ্যা আপডেট
}
