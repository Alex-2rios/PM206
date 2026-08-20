# JavaScript exercises

Coursework from my programming class, in Node. Practices, review sessions and the exams, plus the
console program that turned into a much bigger project later.

## What is in here

| Folder | What it covers |
|---|---|
| `practica1` to `practica5` | the graded practices, one concept at a time |
| `repaso1`, `repaso2` | review sessions before each exam |
| `examen2doP` | the second term exam |
| `servidor.js` | a café ordering system that runs in the console |
| `usuarioApi2.0` | a small user API, the first time I split client from server |
| `trio`, `survivak guide` | smaller class exercises |

## The one worth opening

`servidor.js` is a point of sale for a café that runs entirely in the terminal: a product
catalogue, orders with a running total, stock that goes down as things are sold. All of it in
memory, all of it driven by `readline`.

```bash
node servidor.js
```

It is also where [Terracota](https://github.com/Alex-2rios/terracota-restaurant-system) started.
Same problem, same domain, and the version that exists now has PostgreSQL behind it, an API in
front, a mobile app for the waiters and a web panel for administration. Reading the two next to
each other is the clearest before and after I have.

## What I learned

- Keeping the data in memory is fine until the program exits. Realising that everything typed in
  disappears on exit is what pushed me towards a real database.
- `readline/promises` makes console input readable instead of a pile of nested callbacks.
- Splitting `usuarioApi2.0` into a client and a server was the first time I had to think about
  what belongs on each side of a network boundary.

This is university work, kept as a record of where I started with JavaScript.
