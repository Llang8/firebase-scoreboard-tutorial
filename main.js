// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD-M2s_CW6hTEKJaVkK336fVZqPIRCRXBE",
    authDomain: "fir-scoreboard-eee29.firebaseapp.com",
    databaseURL: "https://fir-scoreboard-eee29.firebaseio.com",
    projectId: "fir-scoreboard-eee29",
    storageBucket: "fir-scoreboard-eee29.appspot.com",
    messagingSenderId: "221783806177",
    appId: "1:221783806177:web:f20634f87c385c92"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setup access to the database
let db = firebase.firestore();

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
    // Get name from input box
    let name = document.getElementById('name').value;

    // Make sure name has a value, if not send alert.
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

function updateScores() {
    // Clear current scores in our scoreboard
    document.getElementById('scoreboard').innerHTML = '<tr><th>Name</th><th>Score</th></tr>';
    
    // Get the top 5 scores from our scoreboard
    db.collection("scores").orderBy("score", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('scoreboard').innerHTML += '<tr>' +
            '<td>' + doc.data().name + '</td>' +
            '<td>' + doc.data().score + '</td>' +
            '</tr>';
        })
    })
}

window.onload = updateScores();