
const market = JSON.parse(localStorage.getItem('market')) || [];

function showMarket() {
    const marketDiv = document.getElementById('market');
    marketDiv.innerHTML = '';

    if (market.length > 0) {
        market.forEach(stock => {
            const stockDiv = document.createElement('div');
            stockDiv.innerText = `${stock.seller} продает ${stock.amount} акций за ${stock.price} монет каждая.`;
            marketDiv.appendChild(stockDiv);

            const buyButton = document.createElement('button');
            buyButton.innerText = 'Купить';
            buyButton.addEventListener('click', () => buyStock(stock));
            stockDiv.appendChild(buyButton);
        });
    } else {
        marketDiv.innerText = 'Нет доступных акций на продажу.';
    }
}

function buyStock(stock) {
    const characterData = JSON.parse(localStorage.getItem('character'));
    const totalCost = stock.price * stock.amount;

    if (characterData.money >= totalCost) {
        characterData.money -= totalCost;
        characterData.stocks += stock.amount;

        const stockIndex = market.indexOf(stock);
        if (stockIndex > -1) {
            market.splice(stockIndex, 1);
            localStorage.setItem('market', JSON.stringify(market));
            localStorage.setItem('character', JSON.stringify(characterData));

            alert('Purchase successful!');
            showMarket();
        }
    } else {
        alert('Недостаточно денег для покупки!');
    }
}

showMarket();
