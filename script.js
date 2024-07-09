// function back(a,b){
//     console.log(a+b);
// }

// function sum(a,b,schemecallback){
//     schemecallback(a,b);
// }

// sum(3,5,schemecallback);


// function yash(a,b){
//     console.log(a+b);
// }

// function raj(a,b,sum){
//     sum(a,b);
// }

// raj(2,4,sum);

// function getdata(getId){
//     console.log("data",getId)
// }

// function getdata(getId){
//     setTimeout(()=>{
//         console.log("data",getId)
//     },3000)
// }


// function getdata(getId , getNextId){
//     setTimeout(()=>{
//         console.log("data",getId)
//         if(getNextId){
//             getNextId();
//         }
// },2000)
// }

// getdata(1,()=>{
//     getdata(2,()=>{
//         getdata(3,()=>{

//         })
//     })}
// )


// function getData(getId,nextId){
//     setTimeout(()=>{
//         console.log("data",getId);
//         if(nextId){
//             nextId();
//         }
//     },2000)
// }

// getData(1,()=>{
//     console.log("getting data 2...");
//     getData(2,()=>{
//     console.log("getting data 3...");
//         getData(3,()=>{
//         console.log("getting data 4...");
//             getData(4,()=>{
//             console.log("getting data 5...");
//                 getData(5);
//             })
//         })
//     })
// })


// function getData(getId, nextId){
//     setTimeout(()=>{
//         console.log("data", getId);
//         if(nextId){
//             nextId();
//         }
//     },2000)
// }

// getData(1,()=>{
//     getData(2,()=>{
//         console.log("getting 3 ...")
//         getData(3,()=>{
//             getData(4);
//         })
//     })
// })


// let promise = new Promise((resolve, reject)=>{
//     console.log("THsii is a promise");
//     reject("some error occured");
//     resolve("this");

// });


// let getPromise =()=>{
//     return new Promise((resolve,reject)=>{
//         console.log("I am a promise");
//         resolve("success");
//         reject("error");
//     });
// };

// let promise = getPromise();

// promise.then((res)=>{
//     console.log("promise fullfilled",res);
// })

// promise.catch((err)=>{
//     console.log("error",err);
// })


// let asynchronous = ()=>{
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log("this is promise");
//             resolve("done");
//         },5000);
//     })
// }

// console.log("data fetching");
// let promise = asynchronous();

// promise.then((res)=>{
//     console.log("Fullfilled",res);
// })

// let container = document.querySelector(".contain");
// const URL = "https://cat-fact.herokuapp.com/facts";

// let getfacts = async()=>{
//     console.log("getting data");
//     let response = await fetch(URL);
//     console.log(response);
//     let data = await response.json();
//     console.log(data);
//     // container.innerHTML = data[0];

// }

// let container = document.querySelector(".contain");
// let btn = document.querySelector(".buttn");
// const URL = "https://cat-fact.herokuapp.com/facts";

// let getfacts = async() =>{
//     console.log("getting data....");
//     let response = await fetch(URL);
//     console.log(response);
//     let data =await response.json();
//     console.log(data[0].text);
//     container.innerHTML = data[0].text;
// }

// btn.addEventListener("click", getfacts);





const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});