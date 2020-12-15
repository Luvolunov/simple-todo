const modalBackground = document.getElementById('modal-background');
const goalForm = document.getElementById('goal-form');
const content = document.getElementById('content');
const goals = JSON.parse(localStorage.getItem('goals')) || [];

renderGoals(goals, content);

document.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-show-modal')) {
        modalBackground.style.display = 'block';
    }
    if (event.target.hasAttribute('data-close-modal')) {
        modalBackground.style.display = 'none';
    }
    if (event.target.hasAttribute('data-add-goal')) {
        goals.push({
            id: Math.random().toString(36).substr(2, 9),
            name: goalForm.name.value,
            description: goalForm.description.value
        });
        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals(goals, content);
        goalForm.name.value = '';
        goalForm.description.value = '';
        modalBackground.style.display = 'none';
    }
    if (event.target.hasAttribute('data-delete-goal')) {
        const idx = goals.findIndex((goal) => goal.id === event.target.getAttribute('data-delete-goal'));
        goals.splice(idx, 1);
        localStorage.setItem('goals', JSON.stringify(goals));
        clearNode(content);
        renderGoals(goals, content);
    }
})

function clearNode(node) {
    while (node.children.length) {
        node.removeChild(node.children[0]);
    }
}

function createGoal(goal) {
    const goalElement = document.createElement('div');
    const deleteGoalButton = document.createElement('div');
    const text = document.createElement('span');
    const view = goal.description
        ? goal.name + ': ' + goal.description
        : goal.name;
    text.textContent = view.slice(0, 20);
    deleteGoalButton.innerHTML = '&times;';
    deleteGoalButton.className = 'delete-goal';
    deleteGoalButton.setAttribute('data-delete-goal', goal.id);
    goalElement.className = 'goal';
    goalElement.appendChild(text);
    goalElement.appendChild(deleteGoalButton);
    return goalElement;
}

function renderGoals(goals, content) {
    clearNode(content);
    if (!goals.length) {
        content.appendChild(createTextButton());
        return;
    }
    goals.forEach(function (goal) { content.appendChild(createGoal(goal));})
}

function createTextButton() {
    const textButton = document.createElement('span');
    textButton.textContent = 'Добавить задачу...';
    textButton.setAttribute('data-show-modal', true);
    textButton.className = 'text-add-goal';
    return textButton;
}