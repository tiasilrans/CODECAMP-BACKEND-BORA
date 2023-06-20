console.log("하이하이 Command Line Interface");

function getToken() {
    const result = String(Math.floor(Math.random()* 1000000)).padStart(6, "0");
    console.log(result);
}

getToken();