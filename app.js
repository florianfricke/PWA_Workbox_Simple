document.querySelector("h1").style.backgroundColor = 'lightgray';

// import axios from 'axios';
// const axios = require('axios');
const api = 'http://192.168.99.100:8085';

fetch(`${api}/tasks`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let html = '';
        data.forEach(task => {
            html += `<p><span>${task.taskID}</span>
                     <span>${task.name}</span>
                     <span>${task.description}</span>
                     <span>${task.priority}</span></p>`;
        });
        document.querySelector(".tasks").innerHTML = `${html}`;
    })