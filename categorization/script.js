const lakersPlayers = [
    { name: "Luka Dončić", number: 77, position: "guard" },
    { name: "Austin Reaves", number: 15, position: "guard" },
    { name: "Shake Milton", number: 20, position: "guard" },
    { name: "Gabe Vincent", number: 7, position: "guard" },
    { name: "Jordan Goodwin", number: 30, position: "guard" },
    { name: "Bronny James", number: 9, position: "guard" },
    { name: "Dalton Knecht", number: 4, position: "guard" },

    { name: "LeBron James", number: 23, position: "forward" },
    { name: "Rui Hachimura", number: 28, position: "forward" },
    { name: "Dorian Finney-Smith", number: 17, position: "forward" },
    { name: "Jarred Vanderbilt", number: 2, position: "forward" },
    { name: "Maxi Kleber", number: 14, position: "forward" },
    { name: "Cam Reddish", number: 5, position: "forward" },

    { name: "Jaxson Hayes", number: 11, position: "center" },
    { name: "Trey Jemison", number: 55, position: "center" },
    { name: "Alex Len", position: "center" },
    { name: "Christian Wood", position: "center" }
];

const positionDropdown = document.getElementById("positions");
const playerCards = document.getElementById("player-cards");

window.addEventListener("DOMContentLoaded", () => {
    lakersPlayers.forEach(player => {
        const card = createPlayerCard(player);
        playerCards.appendChild(card);
    });
});

positionDropdown.addEventListener("change", (position) => {
    console.log(position.target.value);
    playerCards.innerHTML = "";
    
    const selected = position.target.value;
    const filtered = selected === "all"
      ? lakersPlayers
      : lakersPlayers.filter(player => player.position === selected);
    
    filtered.forEach(player => {
      const card = createPlayerCard(player);
      playerCards.appendChild(card);
    });
    
});

function createPlayerCard(player) {
    const card = document.createElement("div");
    card.className = "player-card";

    const playerName = document.createElement("h3");
    playerName.textContent = player.name;
    card.appendChild(playerName);

    const playerNumber = document.createElement("p");
    playerNumber.textContent = `Number: ${player.number || "unknown"}`;
    card.appendChild(playerNumber);

    return card;
}



