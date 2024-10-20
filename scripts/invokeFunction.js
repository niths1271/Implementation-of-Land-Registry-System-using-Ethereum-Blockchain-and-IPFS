import Web3 from 'web3';
import { readFileSync, writeFileSync } from 'fs';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const web3 = new Web3('http://127.0.0.1:7545');


const abiPath = './LandRegistry.json'; // Path to the ABI JSON file
const contractABI = JSON.parse(readFileSync(abiPath, 'utf-8'));

const contractAddress = '0xFd0E34d05336D3035d7D6e9eB3322aa9bC834b41';

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
const accountAddress = '0xc430b4C918CC4aDa258aed41de81B0E5678b1843';
const privateKey = '3793df0e32aa4b92a1bf4c4eabf8fa1b7d70e9daa0b686b15c59001d3f7d3274';


const adminAccountAddress = '0x9866EC02daB89A799eC4c6AAB429951e66AD2844'
const adminPrivateKey = '7fd007a9f7fb9ea7fc44ad799e92215fabce886ff1e1f3f17079fba8ba80620c'


const numberOfInvocations = 100;

async function invokeAddLandFunction() {
     // Arrays to store gas estimates and execution times
     let gasEstimates = [];
     let executionTimes = [];
    try {
        for (let i = 0; i < numberOfInvocations; i++) {
            // Record the start time
            const startTime = Date.now();

            // Prepare the transaction data
            const txData = contract.methods.addLand(`DocHash_${i}`, `survey_${i}`, `pid_${i}`, `price_${i}`).encodeABI();
            // Estimate gas for the function call
            const gasEstimate = await web3.eth.estimateGas({
                from: accountAddress,
                to: contractAddress,
                data: txData,
            });
            // Store the gas estimate
            gasEstimates.push(gasEstimate);

            // Get the current gas price
            const gasPrice = await web3.eth.getGasPrice();

            // Create the transaction object
            const tx = {
                from: accountAddress,
                to: contractAddress,
                gas: gasEstimate,
                gasPrice: gasPrice,
                data: txData,
            };

            // Sign the transaction
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            // Send the transaction
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            // Record the end time and calculate the execution time
            const endTime = Date.now();
            const executionTime = endTime - startTime;
            executionTimes.push(executionTime);

            console.log(`Invocation ${i + 1}: Transaction hash: ${receipt.transactionHash}, Execution time: ${executionTime} ms`);
        }

     } catch (error) {
          console.error('Error invoking addLand function:', error);
          return;
      }
        console.log(gasEstimates)
        writeFileSync('executionTimes.json', JSON.stringify(executionTimes));

        await visualizeExecutionTimes(executionTimes);
}

async function invokeVerifyLandFunction() {
     // Arrays to store gas estimates and execution times
     let gasEstimates = [];
     let executionTimes = [];
     try {
         for (let i = 0; i < numberOfInvocations; i++) {
             // Record the start time
             const startTime = Date.now();
 
             // Prepare the transaction data
             const txData = contract.methods.verifyLand(i, true).encodeABI();
             // Estimate gas for the function call
             const gasEstimate = await web3.eth.estimateGas({
                 from: adminAccountAddress,
                 to: contractAddress,
                 data: txData,
             });
             // Store the gas estimate
             gasEstimates.push(gasEstimate);
 
             // Get the current gas price
             const gasPrice = await web3.eth.getGasPrice();
 
             // Create the transaction object
             const tx = {
                 from: adminAccountAddress,
                 to: contractAddress,
                 gas: gasEstimate,
                 gasPrice: gasPrice,
                 data: txData,
             };
 
             // Sign the transaction
             const signedTx = await web3.eth.accounts.signTransaction(tx, adminPrivateKey);
 
             // Send the transaction
             const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
 
             // Record the end time and calculate the execution time
             const endTime = Date.now();
             const executionTime = endTime - startTime;
             executionTimes.push(executionTime);
 
             console.log(`Invocation ${i + 1}: Transaction hash: ${receipt.transactionHash}, Execution time: ${executionTime} ms`);
         }
 
      } catch (error) {
           console.error('Error invoking verifyLand function:', error);
           return;
       }
         console.log(gasEstimates)
         writeFileSync('executionTimes.json', JSON.stringify(executionTimes));
 
         await visualizeExecutionTimes(executionTimes);
 }


async function visualizeExecutionTimes(executionTimes) {
     const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600, backgroundColour: 'white' }); // Light background
 
     const configuration = {
         type: 'line',
         data: {
             labels: executionTimes.map((_, index) => `${index + 1}`),
             datasets: [{
                 label: 'Execution Time (ms)',
                 data: executionTimes,
                 backgroundColor: 'rgba(70, 130, 180, 0.3)', // Light steel blue for the line area fill
                 borderColor: 'rgba(0, 0, 255, 1)', // Blue for the line color
                 borderWidth: 2,
                 fill: true, // Fill under the line
                 tension: 0.4, // Smoother line
                 pointRadius: 0, // Removes the points from the line
                 pointHoverRadius: 0, // No point enlargement on hover
             }],
         },
         options: {
             scales: {
                 y: {
                     min: 1500,
                     max: 3500,
                     title: {
                         display: true,
                         text: 'Execution Time (ms)',
                     },
                     ticks: {
                         color: 'black', // Y-axis tick color
                     },
                 },
                 x: {
                     title: {
                         display: true,
                         text: 'Transactions',
                     },
                     ticks: {
                         color: 'black', // X-axis tick color
                         autoSkip: true,
                         maxTicksLimit: 10, // Limits the number of ticks displayed
                     },
                 },
             },
             plugins: {
                 legend: {
                     labels: {
                         color: 'black', // Legend label color
                     },
                 },
             },
             layout: {
                 padding: {
                     top: 20,
                     bottom: 20,
                     left: 20,
                     right: 20,
                 },
             },
         },
     };
 
     const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
     writeFileSync('execution_times_line_chart_no_points.png', imageBuffer);
     console.log('Execution times line chart saved as execution_times.png');
 }


const array = [1844,2158,2073,2276,2155,2433,2262,2202,2316,2173,2077,2196,2066,2001,2232,2132,2066,1975,2519,2254,2107,2315,2103,2266,2044,2085,2248,2328,2272,2109,1975,2130,1924,2415,2228,2317,2137,2152,2120,2223,2134,2066,1912,2052,2088,1789,2563,2125,1925,2323,2429,2311,1888,1953,2354,2030,2309,2309,2155,1993,2112,2237,2116,2087,2115,2227,2408,2216,2357,1899,2169,2307,2183,2208,1943,2262,1971,2009,2172,2029,2624,2138,2136,2217,2213,2074,2209,2183,2071,2133,1945,1953,2126,2026,2438,2197,2212,1940,1998,2004]

visualizeExecutionTimes(array)

// invokeAddLandFunction();

// invokeVerifyLandFunction();











