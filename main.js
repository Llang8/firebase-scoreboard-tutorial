// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDbfV4-2wk1fU676GF2uQdF7d0NgjtpNR0",
    authDomain: "fir-scoreboard-e812d.firebaseapp.com",
    databaseURL: "https://fir-scoreboard-e812d.firebaseio.com",
    projectId: "fir-scoreboard-e812d",
    storageBucket: "fir-scoreboard-e812d.appspot.com",
    messagingSenderId: "706585798152",
    appId: "1:706585798152:web:f124759abe6427a6"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

let score = 0;

function increaseScore() {
    score++;
    document.getElementById('score').innerText = score;
}

function decreaseScore() {
    score--;
    document.getElementById('score').innerText = score;
}

function saveScore() {
    let name = document.getElementById('name').value;

    if(name !== "") {
        // Add a new document in collection "scores"
        db.collection("scores").doc().set({
            name: name,
            score: score
        })
        .then(function() {
            console.log("Document successfully written!");
            updateScores();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } else {
        alert('Please enter a name');
    }
}

window.onload = function() {
    updateScores();
}

function updateScores() {
    document.getElementById('scoreboard').innerHTML = '<tr><th>Name</th><th>Score</th></tr>';
    db.collection("scores").orderBy("score", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('scoreboard').innerHTML += '<tr>' +
            '<td>' + doc.data().name + '</td>' +
            '<td>' + doc.data().score + '</td>' +
            '</tr>';
        })
    })
}