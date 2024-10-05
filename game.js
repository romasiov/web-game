
const characters = [
    { name: "Warrior", money: 1000, stocks: 10 },
    { name: "Mage", money: 1200, stocks: 8 },
    { name: "Thief", money: 900, stocks: 12 },
    // add more characters here...
];

const registrationScreen = document.querySelector('.registration');
const characterScreen = document.querySelector('.choose-character');
const usernameInput = document.getElementById('username');
const charactersDiv = document.getElementById('characters');
const startGameButton = document.getElementById('startGame');

startGameButton.addEventListener('click', () => {
    const username = usernameInput.value;
    if (username) {
        localStorage.setItem('username', username);
        showCharacterSelection();
    } else {
        alert('Please enter your name!');
    }
});

function showCharacterSelection() {
    registrationScreen.style.display = 'none';
    characterScreen.style.display = 'block';

    characters.forEach((character, index) => {
        const characterButton = document.createElement('button');
        characterButton.innerText = character.name;
        characterButton.addEventListener('click', () => chooseCharacter(index));
        charactersDiv.appendChild(characterButton);
    });
}

function chooseCharacter(index) {
    const selectedCharacter = characters[index];
    localStorage.setItem('character', JSON.stringify(selectedCharacter));
    window.location.href = 'character.html';
}

window.onload = function() {
    const characterData = JSON.parse(localStorage.getItem('character'));
    const username = localStorage.getItem('username');
    
    if (characterData && username) {
        document.getElementById('characterName').innerText = `${username} the ${characterData.name}`;
        document.getElementById('money').innerText = characterData.money;
        document.getElementById('stocks').innerText = characterData.stocks;
    } else {
        window.location.href = 'index.html';
    }
};

let market = JSON.parse(localStorage.getItem('market')) || [];

document.getElementById('sellStocks').addEventListener('click', () => {
    const sellAmount = parseInt(document.getElementById('sellAmount').value);
    const sellPrice = parseInt(document.getElementById('sellPrice').value);

    const characterData = JSON.parse(localStorage.getItem('character'));

    if (sellAmount > 0 && sellPrice > 0 && characterData.stocks >= sellAmount) {
        const stockForSale = {
            seller: characterData.name,
            amount: sellAmount,
            price: sellPrice
        };

        market.push(stockForSale);
        localStorage.setItem('market', JSON.stringify(market));

        characterData.stocks -= sellAmount;
        localStorage.setItem('character', JSON.stringify(characterData));

        alert('You have successfully listed your stocks for sale!');
        window.location.reload();
    } else {
        alert('Invalid amount or price, or not enough stocks!');
    }
});
    