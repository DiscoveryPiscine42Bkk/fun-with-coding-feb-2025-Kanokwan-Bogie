function saveTasks() {
    const tasks = [];
    $('.task').each(function() {
        tasks.push($(this).text());
    });
    document.cookie = 'tasks=' + JSON.stringify(tasks) + '; path=/';
}

function loadTasks() {
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
        if (cookie.startsWith('tasks=')) {
            const tasks = JSON.parse(cookie.substring(6));
            tasks.forEach(task => addTask(task));
        }
    });
}

function addTask(taskText) {
    const taskDiv = $('<div></div>').addClass('task').text(taskText);
    taskDiv.click(function() {
        if (confirm('คุณต้องการลบงานนี้หรือไม่?')) {
            $(this).remove();
            saveTasks();
        }
    });
    $('#ft_list').prepend(taskDiv);
}

$(document).ready(function() {
    loadTasks();

    $('#newTaskBtn').click(function() {
        const taskText = prompt('กรุณากรอกชื่องานใหม่:');
        if (taskText) {
            addTask(taskText);
            saveTasks();
        }
    });
});
