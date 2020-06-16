//API
/*const api = "http://localhost:3000/api/teddies";

let teddy1Name = document.getElementById("teddy_1_name")
let teddy2Name = document.getElementById("teddy_2_name")
const getAllTeddies = () => {
    fetch(api).then(
            (response) => {
                console.log(response);
                return response.json();

            }
        )
        .then((data) => {
            console.log(data);
            teddy1Name.innerHTML = data[0].name;
            teddy2Name.innerHTML = data[1].name;

        })
        .catch((error) => {
            console.log(error);
        })
}

getAllTeddies();*/