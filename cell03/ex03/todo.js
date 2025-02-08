document.addEventListener('DOMContentLoaded', function () {
    loadTasks();

    document.getElementById('newTaskBtn').addEventListener('click', function () {
        const taskText = prompt('กรุณากรอกชื่องานใหม่:');
        if (taskText) {
            addTask(taskText);
            saveTasks();
        }
    });
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        JSON.parse(storedTasks).forEach(task => addTask(task));
    }
}

function addTask(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.textContent = taskText;
    
    // จัดลิสต์ให้อยู่แนวตั้ง
    taskDiv.style.cursor = 'pointer';
    taskDiv.style.border = '1px solid black';
    taskDiv.style.margin = '5px 0';
    taskDiv.style.padding = '10px';
    taskDiv.style.display = 'block';
    taskDiv.style.width = '200px';

    taskDiv.addEventListener('click', function () {
        if (confirm('คุณต้องการลบงานนี้หรือไม่?')) {
            taskDiv.remove();
            saveTasks();
        }
    });

    document.getElementById('ft_list').prepend(taskDiv);
}
