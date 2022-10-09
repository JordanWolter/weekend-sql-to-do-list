//const { response } = require("express");

console.log('client js');

$(document).ready(function (){
    console.log('on ready');

    getTask();

    clickListeners();
});

function clickListeners(){
    $('#submitBtn').on('click', submitTask);
    $('#viewTask').on('click', '.deleteBtn', deleteTask);
    $('#completeTask').on('click', '.deleteBtn', deleteTask);
    $('#viewTask').on('click', '.completeBtn', completeTask);

};

function submitTask(){
    console.log('adding task');

    let taskToDo = {
        task: $('#task').val(),
        notes: $('#notes').val(),
        complete: 'FALSE'
    }

    console.log('new task', taskToDo);

    $.ajax({

        url: '/task',
        method: 'POST',
        data: taskToDo

    }).then((response) => {
        console.log('sending task', response);

        clearInputs();
        getTask();

    }).catch(err => {
        console.log('add task failed', err);

    })
};

function getTask(){
    console.log('get task');

    $.ajax({

        url: '/task',
        method: 'GET'

    }).then((response) => {
        console.log('GET response', response);

        renderTask(response);

    }).catch((err) => {
        console.log('GET failed', err);

    });
};

function deleteTask(){
    console.log('in deleteTask', $(this).data('id'));

    let taskId = $(this).data('id');

    $.ajax({

        url: `/task/${taskId}`,
        method: 'DELETE'

    }).then((response) => {
        console.log('end task');
        
        getTask();

    }).catch((err) => {
        console.log('error on delete', err);

    })
};


function completeTask(){
    console.log('complete task');

    let taskId = $(this).data('id');

    $.ajax({

        url: `/task/${taskId}`,
        method: 'PUT'

    }).then((response) => {
        console.log('update task');

        console.log('response complete', $(this))

        getTask();

    }).catch((err) => {
        console.log('task failed', err);

    })

    
  

};

function clearInputs(){
    $('#task').val('');
    $('#notes').val('');
};

function renderTask(list){
    console.log('render tasks');

    $('#viewTask').empty();
    $('#completeTask').empty();

    for(let index of list){
        console.log(index.complete);
        if(index.complete === true){
            $('#completeTask').append(`
            <tr class="row">
            <td class="taskColumn"><h3>${index.task}</h3></td>
            <td class="notesColumn">${index.notes}</td>
            <td class="deleteColumn"><button type='click' class='deleteBtn' data-id=${index.id}>Delete</button></td>
            </tr>
            `)
        }else{
            $('#viewTask').append(`
            <tr class="row">
            <td class="taskColumn"><h3>${index.task}<h3></td>
            <td class="notesColumn">${index.notes}</td>
            <td class="completeColumn"><button type='click' class='completeBtn' data-id=${index.id}>Complete</button></td>
            <td class="deleteColumn"><button type='click' class='deleteBtn' data-id=${index.id}>Delete</button></td>
            </tr>
            `)
        }
    };
};