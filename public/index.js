async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=APIKEYREMOVED")
    let result = await response.json()

    const { GME, MSFT, DIS, BNTX } = result;
    const stocks = [GME, MSFT, DIS, BNTX];

    // lines 16-46 are getting the four highest stock prices
    let stockValues = stocks.map(stock => stock.values)

    function findHighestNum(nums){
        let highest = 0;
        for(let i = 0; i < nums.length; i++){
            if(nums[i] > highest){
                highest = nums[i]
            }
        }
        return highest
    }

    let GMEHighs = [];
    let MSFTHighs = [];
    let DISHighs = [];
    let BNTXHighs = [];

    for (let i = 0; i < 30; i++) {
        GMEHighs.push(stockValues[0][i].high)
        MSFTHighs.push(stockValues[1][i].high)
        DISHighs.push(stockValues[2][i].high)
        BNTXHighs.push(stockValues[3][i].high)
    }

    let GMEHighNums = findHighestNum(GMEHighs.map(Number))
    let MSTFHighNums = findHighestNum(MSFTHighs.map(Number))
    let DISHighNums = findHighestNum(DISHighs.map(Number))
    let BNTXHighNums = findHighestNum(BNTXHighs.map(Number))

    let fourHighStockPrices = []
    fourHighStockPrices.push(GMEHighNums, MSTFHighNums, DISHighNums, BNTXHighNums)

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function getHighestPrice(){
        for (let i = 0; i < stocks.length; i++) {
            let stock = stocks[i]
            let stockIndex = 0
            let highValue = 0;
            let stockValue = stocks[stockIndex].values[i];
            
        }        
    }

//line graph

stocks.forEach(stock => stock.values.reverse())

    var stocksOverTime = new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

//bar graph

    let stockHighPrices = new Chart(highestPriceChartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: stocks.map(stock => stock.meta.symbol),
                datasets: [{
                    label: 'Highest Stock Price',
                    data: fourHighStockPrices,
                    backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    borderColor: stocks.map(stock => stock.meta.symbol)
                }]
            }
        });
}

main()






