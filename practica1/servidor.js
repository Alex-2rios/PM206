
console.log("Hola mundo JS desde el servidor");

/*Operaciones */
let edad1 = 11;
const edad2 = 42;

console.log("Edad promedio");
console.log((edad1 + edad2) / 2);

/*Medir el tiempo de un proceso */
console.time('miProceso')

    for (let i = 0; i < 100000000; i++) {}

console.timeEnd('miProceso')

/*Objetos tipo tabla */
let usuarios = [
    {nombre: "Juan", Edad:83},
    {nombre: "Maria", Edad: 25},
    {nombre: "Pedro", Edad: 42}
]
console.table(usuarios)