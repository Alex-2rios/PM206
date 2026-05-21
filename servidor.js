const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

// Base de datos compartida en memoria
const productos = [
  { id: 1, nombre: 'Espresso Solo', tipo: 'Bebida', precio: 45.00, stock: 15 },
  { id: 2, nombre: 'Cafe Americano', tipo: 'Bebida', precio: 58.00, stock: 20 },
  { id: 3, nombre: 'Capuccino Tradicional', tipo: 'Bebida', precio: 72.00, stock: 12 },
  { id: 4, nombre: 'Latte Macchiato', tipo: 'Bebida', precio: 78.00, stock: 10 },
  { id: 5, nombre: 'Caramel Frappuccino', tipo: 'Bebida', precio: 89.00, stock: 8 },
  { id: 6, nombre: 'Muffin de Chocolate', tipo: 'Comida', precio: 45.00, stock: 15 }
];

const pedidos = [];
let contadorPedidos = 1;

const rl = readline.createInterface({ input, output });

// Códigos de colores ANSI para mejorar la estética en la terminal
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  
  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",
  
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m"
};

function limpiarConsola() {
  console.clear();
}

function mostrarBanner() {
  limpiarConsola();
  console.log(colors.fgCyan + "**************************************************" + colors.reset);
  console.log(colors.fgCyan + "*" + colors.reset + colors.bright + colors.fgYellow + "            BIENVENIDO A COFFEE SHOP            " + colors.reset + colors.fgCyan + "*" + colors.reset);
  console.log(colors.fgCyan + "**************************************************" + colors.reset);
}

function mostrarTablaProductos() {
  console.log("");
  console.log(colors.bright + "=== LISTA DE PRODUCTOS DISPONIBLES ===" + colors.reset);
  console.log(colors.underscore + "ID  | Nombre                  | Tipo    | Precio  | Stock" + colors.reset);
  productos.forEach(p => {
    let priceStr = "$" + parseFloat(p.precio).toFixed(2);
    let stockStr = p.stock <= 0 ? (colors.fgRed + "AGOTADO" + colors.reset) : p.stock;
    console.log(
      String(p.id).padEnd(3) + " | " + 
      p.nombre.padEnd(23) + " | " + 
      p.tipo.padEnd(7) + " | " + 
      priceStr.padEnd(7) + " | " + 
      stockStr
    );
  });
  console.log("=======================================");
}

// ==================== MÓDULO CLIENTE ====================

async function consultarProductos() {
  mostrarBanner();
  mostrarTablaProductos();
  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar al menú...");
}

async function crearPedido() {
  mostrarBanner();
  console.log(colors.fgYellow + "\n--- REGISTRO DE NUEVO PEDIDO ---" + colors.reset);
  mostrarTablaProductos();

  let cliente = "";
  while (cliente.trim() === "") {
    cliente = await rl.question("\nIngrese el nombre del cliente: ");
    if (cliente.trim() === "") {
      console.log(colors.fgRed + "--> ¡Error! El nombre no puede estar vacío. Escríbalo de nuevo." + colors.reset);
    }
  }

  const itemsPedido = [];
  let agregarMas = true;

  while (agregarMas) {
    const idInput = await rl.question("\nIngrese el ID del café o producto a comprar: ");
    const prodId = parseInt(idInput);

    const producto = productos.find(p => p.id === prodId);
    if (!producto) {
      console.log(colors.fgRed + "--> ¡Error! Ese ID de producto no existe. Intenta con otro." + colors.reset);
      continue;
    }

    if (producto.stock <= 0) {
      console.log(colors.fgRed + "--> ¡Lo sentimos! Ya no tenemos stock de: " + producto.nombre + colors.reset);
      continue;
    }

    console.log("Seleccionado: " + colors.bright + producto.nombre + colors.reset + " | Precio: $" + parseFloat(producto.precio).toFixed(2) + " | Stock actual: " + producto.stock);

    let cantidad = 0;
    while (true) {
      const cantInput = await rl.question("¿Cuántos quieres llevar?: ");
      cantidad = parseInt(cantInput);

      if (isNaN(cantidad) || cantidad <= 0) {
        console.log(colors.fgRed + "--> ¡Ojo! Tienes que llevar al menos 1 unidad." + colors.reset);
      } else if (cantidad > producto.stock) {
        console.log(colors.fgRed + "--> ¡No hay tanto! Solo nos quedan " + producto.stock + " unidades." + colors.reset);
      } else {
        break;
      }
    }

    const itemExistente = itemsPedido.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      if (itemExistente.cantidad + cantidad > producto.stock) {
        console.log(colors.fgRed + "--> ¡Alerta! No puedes agregar más. Supera el stock disponible." + colors.reset);
      } else {
        itemExistente.cantidad += cantidad;
        itemExistente.subtotal = itemExistente.cantidad * producto.precio;
        console.log(colors.fgGreen + "--> Ok, cantidad actualizada para: " + producto.nombre + colors.reset);
      }
    } else {
      itemsPedido.push({
        producto: producto,
        cantidad: cantidad,
        subtotal: cantidad * producto.precio
      });
      console.log(colors.fgGreen + "--> Agregado al carrito de compras." + colors.reset);
    }

    const respuesta = await rl.question("\n¿Quieres agregar otra cosa al pedido? (s/n): ");
    agregarMas = respuesta.toLowerCase() === 's' || respuesta.toLowerCase() === 'si';
  }

  if (itemsPedido.length === 0) {
    console.log(colors.fgRed + "\n--> Pedido cancelado. No agregaste nada." + colors.reset);
    console.log("--------------------------------------------------");
    await rl.question("--> Presiona ENTER para volver...");
    return;
  }

  let total = 0;
  itemsPedido.forEach(item => {
    total += item.subtotal;
  });

  const idPedido = "PED-" + String(contadorPedidos).padStart(3, '0');

  mostrarBanner();
  console.log(colors.fgYellow + "\n--- CONFIRMACIÓN DE COMPRA - " + idPedido + " ---" + colors.reset);
  console.log("Cliente: " + colors.bright + cliente + colors.reset);
  console.log("Fecha:   " + new Date().toLocaleString());
  console.log("--------------------------------------------------");
  
  console.log("Detalle de la compra:");
  itemsPedido.forEach(item => {
    console.log("- " + item.producto.nombre.padEnd(25) + " x" + item.cantidad + " | Subtotal: $" + item.subtotal.toFixed(2));
  });
  console.log("--------------------------------------------------");
  console.log(colors.bright + "TOTAL A PAGAR: $" + total.toFixed(2) + colors.reset);
  console.log("--------------------------------------------------");

  const confirmar = await rl.question("\n¿Guardar este pedido en el sistema? (s/n): ");
  if (confirmar.toLowerCase() === 's' || confirmar.toLowerCase() === 'si') {
    itemsPedido.forEach(item => {
      item.producto.stock -= item.cantidad;
    });

    pedidos.push({
      id: idPedido,
      cliente: cliente,
      fecha: new Date(),
      items: itemsPedido,
      total: total,
      estado: "Pendiente"
    });

    contadorPedidos++;
    console.log(colors.fgGreen + "\n--> ¡Listo! Pedido " + idPedido + " registrado y stock descontado." + colors.reset);
  } else {
    console.log(colors.fgRed + "\n--> Pedido cancelado. No se realizó ningún cambio." + colors.reset);
  }

  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar al menú...");
}

async function listarPedidos() {
  mostrarBanner();
  console.log(colors.fgYellow + "\n=== HISTORIAL DE PEDIDOS ===" + colors.reset);

  if (pedidos.length === 0) {
    console.log(colors.fgRed + "\n--> ¡Aviso! No hay ningún pedido guardado todavía." + colors.reset);
    console.log("--------------------------------------------------");
    await rl.question("--> Presiona ENTER para volver...");
    return;
  }

  pedidos.forEach(p => {
    console.log("\n==================================================");
    let estadoColor = p.estado === "Entregado" ? colors.fgGreen : colors.fgYellow;
    console.log("Pedido ID: " + colors.bright + p.id + colors.reset + " | Cliente: " + colors.bright + p.cliente + colors.reset + " | Estado: " + estadoColor + p.estado + colors.reset);
    console.log("Fecha: " + p.fecha.toLocaleString());
    console.log("--------------------------------------------------");
    p.items.forEach(item => {
      console.log("  - " + item.producto.nombre.padEnd(22) + " x" + item.cantidad + " | Subtotal: $" + item.subtotal.toFixed(2));
    });
    console.log("--------------------------------------------------");
    console.log(colors.bright + "Total del Pedido: $" + p.total.toFixed(2) + colors.reset);
    console.log("==================================================");
  });

  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar al menú...");
}

async function moduloCliente() {
  let volver = false;
  while (!volver) {
    limpiarConsola();
    console.log(colors.fgGreen + "==================================================" + colors.reset);
    console.log(colors.fgGreen + "*" + colors.reset + colors.bright + "                  MÓDULO CLIENTE                " + colors.reset + colors.fgGreen + "*" + colors.reset);
    console.log(colors.fgGreen + "==================================================" + colors.reset);
    console.log("");
    console.log("1. Consultar cafés y productos");
    console.log("2. Crear pedido de café");
    console.log("3. Listar pedidos de clientes");
    console.log("4. Volver al menú principal");
    console.log(colors.fgGreen + "**************************************************" + colors.reset);
    
    const opcion = await rl.question("Elija una opción (1-4): ");
    
    switch (opcion.trim()) {
      case '1':
        await consultarProductos();
        break;
      case '2':
        await crearPedido();
        break;
      case '3':
        await listarPedidos();
        break;
      case '4':
        volver = true;
        break;
      default:
        console.log(colors.fgRed + "\n--> ¡Error! Opción no válida. Elige un número del 1 al 4." + colors.reset);
        console.log("--------------------------------------------------");
        await new Promise(resolve => setTimeout(resolve, 1500));
        break;
    }
  }
}


// ==================== MÓDULO COCINA (CRUD) ====================

async function verProductosCocina() {
  mostrarBanner();
  console.log(colors.fgMagenta + "\n--- COCINA: INVENTARIO DE PRODUCTOS ---" + colors.reset);
  mostrarTablaProductos();
  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar...");
}

async function agregarProductoCocina() {
  mostrarBanner();
  console.log(colors.fgMagenta + "\n--- COCINA: AGREGAR NUEVO PRODUCTO ---" + colors.reset);

  let nombre = "";
  while (nombre.trim() === "") {
    nombre = await rl.question("Nombre del nuevo producto: ");
    if (nombre.trim() === "") {
      console.log(colors.fgRed + "--> ¡Error! El nombre no puede estar vacío." + colors.reset);
    }
  }

  let tipo = "";
  while (tipo !== "Bebida" && tipo !== "Comida") {
    const tipoInput = await rl.question("Tipo (1 para Bebida, 2 para Comida): ");
    if (tipoInput.trim() === '1') {
      tipo = "Bebida";
    } else if (tipoInput.trim() === '2') {
      tipo = "Comida";
    } else {
      console.log(colors.fgRed + "--> ¡Error! Ingrese 1 o 2." + colors.reset);
    }
  }

  let precio = 0;
  while (true) {
    const precioInput = await rl.question("Precio: ");
    precio = parseFloat(precioInput);
    if (isNaN(precio) || precio <= 0) {
      console.log(colors.fgRed + "--> ¡Error! Ingrese un precio válido mayor a 0." + colors.reset);
    } else {
      break;
    }
  }

  let stock = 0;
  while (true) {
    const stockInput = await rl.question("Stock inicial: ");
    stock = parseInt(stockInput);
    if (isNaN(stock) || stock < 0) {
      console.log(colors.fgRed + "--> ¡Error! Ingrese un número de stock válido (0 o mayor)." + colors.reset);
    } else {
      break;
    }
  }

  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

  const nuevoProd = {
    id: nuevoId,
    nombre: nombre.trim(),
    tipo: tipo,
    precio: precio,
    stock: stock
  };

  productos.push(nuevoProd);
  console.log(colors.fgGreen + `\n--> ¡Excelente! Producto "${nombre}" agregado con éxito (ID: ${nuevoId}).` + colors.reset);
  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar...");
}

async function editarProductoCocina() {
  mostrarBanner();
  console.log(colors.fgMagenta + "\n--- COCINA: EDITAR PRODUCTO EXISTENTE ---" + colors.reset);
  mostrarTablaProductos();

  const idInput = await rl.question("\nIngrese el ID del producto que desea editar: ");
  const prodId = parseInt(idInput);

  const producto = productos.find(p => p.id === prodId);
  if (!producto) {
    console.log(colors.fgRed + "--> ¡Error! Ese ID de producto no existe." + colors.reset);
    console.log("--------------------------------------------------");
    await rl.question("--> Presiona ENTER para volver...");
    return;
  }

  console.log("\n(Presione ENTER si desea conservar el valor actual)");

  const nuevoNombre = await rl.question(`Nombre [${producto.nombre}]: `);
  if (nuevoNombre.trim() !== "") {
    producto.nombre = nuevoNombre.trim();
  }

  let nuevoTipo = "";
  while (true) {
    const tipoInput = await rl.question(`Tipo (${producto.tipo}) [1 para Bebida, 2 para Comida, ENTER para no cambiar]: `);
    if (tipoInput.trim() === "") {
      break;
    } else if (tipoInput.trim() === '1') {
      producto.tipo = "Bebida";
      break;
    } else if (tipoInput.trim() === '2') {
      producto.tipo = "Comida";
      break;
    } else {
      console.log(colors.fgRed + "--> ¡Error! Ingrese 1, 2 o presione ENTER." + colors.reset);
    }
  }

  while (true) {
    const precioInput = await rl.question(`Precio [$${parseFloat(producto.precio).toFixed(2)}]: `);
    if (precioInput.trim() === "") {
      break;
    }
    const precio = parseFloat(precioInput);
    if (isNaN(precio) || precio <= 0) {
      console.log(colors.fgRed + "--> ¡Error! Ingrese un precio válido mayor a 0." + colors.reset);
    } else {
      producto.precio = precio;
      break;
    }
  }

  while (true) {
    const stockInput = await rl.question(`Stock [${producto.stock}]: `);
    if (stockInput.trim() === "") {
      break;
    }
    const stock = parseInt(stockInput);
    if (isNaN(stock) || stock < 0) {
      console.log(colors.fgRed + "--> ¡Error! Ingrese un número de stock válido." + colors.reset);
    } else {
      producto.stock = stock;
      break;
    }
  }

  console.log(colors.fgGreen + `\n--> ¡Producto ID ${prodId} actualizado con éxito!` + colors.reset);
  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar...");
}

async function eliminarProductoCocina() {
  mostrarBanner();
  console.log(colors.fgMagenta + "\n--- COCINA: ELIMINAR PRODUCTO ---" + colors.reset);
  mostrarTablaProductos();

  const idInput = await rl.question("\nIngrese el ID del producto que desea eliminar de la carta: ");
  const prodId = parseInt(idInput);

  const indice = productos.findIndex(p => p.id === prodId);
  if (indice === -1) {
    console.log(colors.fgRed + "--> ¡Error! Ese ID de producto no existe." + colors.reset);
    console.log("--------------------------------------------------");
    await rl.question("--> Presiona ENTER para volver...");
    return;
  }

  const producto = productos[indice];
  const confirmar = await rl.question(`¿Seguro que desea eliminar "${producto.nombre}" de la carta? (s/n): `);
  if (confirmar.toLowerCase() === 's' || confirmar.toLowerCase() === 'si') {
    productos.splice(indice, 1);
    console.log(colors.fgGreen + `\n--> ¡El producto "${producto.nombre}" ha sido eliminado de la carta!` + colors.reset);
  } else {
    console.log(colors.fgYellow + "\n--> Operación cancelada." + colors.reset);
  }

  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar...");
}

async function despacharPedidosCocina() {
  mostrarBanner();
  console.log(colors.fgMagenta + "\n--- COCINA: PEDIDOS PENDIENTES ---" + colors.reset);

  const pendientes = pedidos.filter(p => p.estado === "Pendiente");

  if (pendientes.length === 0) {
    console.log(colors.fgGreen + "\n--> ¡Todo al día! No hay pedidos pendientes de preparar en cocina." + colors.reset);
    console.log("--------------------------------------------------");
    await rl.question("--> Presiona ENTER para volver...");
    return;
  }

  pendientes.forEach((p, idx) => {
    console.log(`\n[${idx + 1}] Pedido ID: ` + colors.bright + p.id + colors.reset + ` | Cliente: ` + colors.bright + p.cliente + colors.reset);
    p.items.forEach(item => {
      console.log(`    - ${item.producto.nombre} x${item.cantidad}`);
    });
  });

  console.log("\n--------------------------------------------------");
  const despacharInput = await rl.question("Ingrese el número del pedido a despachar (o ENTER para cancelar): ");
  if (despacharInput.trim() === "") {
    return;
  }

  const index = parseInt(despacharInput) - 1;
  if (isNaN(index) || index < 0 || index >= pendientes.length) {
    console.log(colors.fgRed + "--> ¡Opción no válida!" + colors.reset);
    console.log("--------------------------------------------------");
    await rl.question("--> Presiona ENTER para volver...");
    return;
  }

  const pedidoADespachar = pendientes[index];
  pedidoADespachar.estado = "Entregado";
  console.log(colors.fgGreen + `\n--> ¡Pedido ${pedidoADespachar.id} preparado y entregado con éxito!` + colors.reset);
  console.log("--------------------------------------------------");
  await rl.question("--> Presiona ENTER para regresar...");
}

async function moduloCocina() {
  let volver = false;
  while (!volver) {
    limpiarConsola();
    console.log(colors.fgMagenta + "==================================================" + colors.reset);
    console.log(colors.fgMagenta + "*" + colors.reset + colors.bright + "                  MÓDULO COCINA                 " + colors.reset + colors.fgMagenta + "*" + colors.reset);
    console.log(colors.fgMagenta + "==================================================" + colors.reset);
    console.log("");
    console.log("1. Ver lista de productos (CRUD: Leer)");
    console.log("2. Agregar nuevo producto (CRUD: Crear)");
    console.log("3. Editar producto existente (CRUD: Actualizar)");
    console.log("4. Eliminar producto de la carta (CRUD: Borrar)");
    console.log("5. Ver pedidos en cocina / Despachar");
    console.log("6. Volver al menú principal");
    console.log(colors.fgMagenta + "**************************************************" + colors.reset);
    
    const opcion = await rl.question("Elija una opción (1-6): ");
    switch (opcion.trim()) {
      case '1':
        await verProductosCocina();
        break;
      case '2':
        await agregarProductoCocina();
        break;
      case '3':
        await editarProductoCocina();
        break;
      case '4':
        await eliminarProductoCocina();
        break;
      case '5':
        await despacharPedidosCocina();
        break;
      case '6':
        volver = true;
        break;
      default:
        console.log(colors.fgRed + "\n--> ¡Error! Opción no válida. Elige un número del 1 al 6." + colors.reset);
        console.log("--------------------------------------------------");
        await new Promise(resolve => setTimeout(resolve, 1500));
        break;
    }
  }
}


// ==================== HILO PRINCIPAL DEL SISTEMA ====================

async function main() {
  let salir = false;
  
  while (!salir) {
    mostrarBanner();
    console.log("");
    console.log("1. Ir a Cliente (Venta de café y productos)");
    console.log("2. Ir a Cocina (Gestión de productos y stock)");
    console.log("3. Salir del programa");
    console.log(colors.fgCyan + "**************************************************" + colors.reset);
    
    const opcion = await rl.question("Elija una opción (1-3): ");
    
    switch (opcion.trim()) {
      case '1':
        await moduloCliente();
        break;
      case '2':
        await moduloCocina();
        break;
      case '3':
        limpiarConsola();
        console.log(colors.fgGreen + "\n¡Gracias por utilizar Coffee Shop Central! ¡Hasta pronto!\n" + colors.reset);
        salir = true;
        rl.close();
        break;
      default:
        console.log(colors.fgRed + "\n--> ¡Error! Esa opción no vale. Elige un número del 1 al 3." + colors.reset);
        console.log("--------------------------------------------------");
        await new Promise(resolve => setTimeout(resolve, 2000));
        break;
    }
  }
}

main().catch(err => {
  console.error("Error grave en el programa:", err);
  rl.close();
});
