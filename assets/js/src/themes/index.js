const testSpread = {
    name: "John",
    lastname: "Doe"
};

const testSpread2 = {
    age: 18,
    address: "blablabla"
};

const testSpread3 = {
    ...testSpread,
    ...testSpread2
};

const testFunction = () => {
    console.log("start function");
    console.log(this);
    console.log("end function");
};

testFunction();
console.log(testSpread3);
console.log("index");

const testPromise = new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => console.log(json))
        .then(resolve("done"));
});

testPromise.then(val => console.log(val));
