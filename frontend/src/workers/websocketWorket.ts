/* 
    capabilities of workers 
    1. Can import scripts
    2. Can create new workers
    3. Runs on a different thread
    4. Can fetch promises

*/


onmessage = (event) => {
    console.log("Message recieved on the worker");

}