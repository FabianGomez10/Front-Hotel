let urlConexion = "http://129.151.119.82:8080/api";
//let urlConexion = "http://localhost:8080/api/";
let moduloCategory = "Category";
let moduloRoom = "Room";
let moduloClient = "Client";
let moduloMessage = "Message";
let moduloReservation = "Reservation";
let opcionGetAll = "/all";
let opcionSave = "/save";
let opcionUpdate = "/update";
let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Consultar las categorias
 */
function consultarCategorias() {
   $.ajax({
      url: urlConexion + moduloCategory + opcionGetAll,
      type: "GET",
      dataType: "json",
      success: function (json) {
         crearLista("Category", json);
      }
   });
}

/**
 * Consultar las habitaciones
 */
function consultarHabitaciones() {
   $.ajax({
      url: urlConexion + moduloRoom + opcionGetAll,
      type: "GET",
      dataType: "json",
      success: function (json) {
         crearLista("Room", json);
      }
   });
}

/**
 * Consultar los clientes
 */
function consultarClientes() {
   $.ajax({
      url: urlConexion + moduloClient + opcionGetAll,
      type: "GET",
      dataType: "json",
      success: function (json) {
         crearLista("Client", json);
      }
   });
}

/**
 * Consultar los mensajes
 */
function consultarMensajes() {
   $.ajax({
      url: urlConexion + moduloMessage + opcionGetAll,
      type: "GET",
      dataType: "json",
      success: function (json) {
         crearLista("Message", json);
      }
   });
}

/**
 * Consultar las reservas
 */
function consultarReservas() {
   $.ajax({
      url: urlConexion + moduloReservation + opcionGetAll,
      type: "GET",
      dataType: "json",
      success: function (json) {
         crearLista("Reservation", json);
      }
   });
}

/**
 * Aspecto de la tabla
 * @param {*} panel
 * @param {*} registros
 */
function crearLista(panel, registros) {
   $("#pnlLista" + panel).empty();
   let tblRegistros =
      "<table id='tblRegistros' class='table table-success table-striped table-bordered text-center'>";
   if (typeof registros === "undefined" || (typeof registros != "undefined" && registros.length === 0)) {
      tblRegistros += "<tr>";
      tblRegistros +=
         "<td colspan='5'><center><strong>No existen registros.</strong></center></td>";
      tblRegistros += "</tr>";
   } else {
      tblRegistros += crearHeaders(panel);
      tblRegistros += crearDatos(panel, registros);
   }
   tblRegistros += "</table>";
   $("#pnlLista" + panel).append(tblRegistros);
   $(":input").val("");
   $("#btnActualizar").attr("style", "display: none !important");
}

/**
 * Crear titulos de las columnas de la tabla
 * @param {*} tabla
 * @returns titulos de las tablas
 */
function crearHeaders(tabla) {
   let headers = "<tr>";
   let accion = "<td class='align-middle'><strong>Accion</strong></td>";
   if (tabla === "Category") {
      headers += accion;
      headers += "<td class='align-middle'><strong>Nombre</strong></td>";
      headers += "<td class='align-middle'><strong>Descripción</strong></td>";
   } else if (tabla === "Room") {
      headers += accion;
      headers += "<td class='align-middle'><strong>Nombre</strong></td>";
      headers += "<td class='align-middle'><strong>Hotel</strong></td>";
      headers += "<td class='align-middle'><strong>Estrellas</strong></td>";
      headers += "<td class='align-middle'><strong>Descripción</strong></td>";
      headers += "<td class='align-middle'><strong>Categoría</strong></td>";
   } else if (tabla === "Client") {
      headers += accion;
      headers += "<td class='align-middle'><strong>E-mail</strong></td>";
      headers += "<td class='align-middle'><strong>Contraseña</strong></td>";
      headers += "<td class='align-middle'><strong>Nombre</strong></td>";
      headers += "<td class='align-middle'><strong>Edad</strong></td>";
   } else if (tabla === "Message") {
      headers += accion;
      headers += "<td class='align-middle'><strong>Mensaje</strong></td>";
      headers += "<td class='align-middle'><strong>Cliente</strong></td>";
      headers += "<td class='align-middle'><strong>Habitación</strong></td>";
   } else if (tabla === "Reservation") {
      headers += accion;
      headers += "<td class='align-middle'><strong>Fecha inicio</strong></td>";
      headers +=
         "<td class='align-middle'><strong>Fecha devolución</strong></td>";
      headers += "<td class='align-middle'><strong>Cliente</strong></td>";
      headers += "<td class='align-middle'><strong>Habitación</strong></td>";
   }
   headers += "</tr>";
   return headers;
}

/**
 * Cargar datos a la tabla
 * @param {*} tabla
 * @param {*} datos
 * @returns los datos de la tabla
 */
function crearDatos(tabla, datos) {
   let headers = "";
   if (tabla === "Category") {
      for (i = 0; i < datos.length; i++) {
         headers += `
         <tr>
         <td class="align-middle"><button class="btn btn-danger" style="width: 75px" onclick="borrar(${datos[i].id},'Category')">Borrar</button><button onclick="editar('${tabla}',${datos[i].id})" class="btn btn-warning" style="width: 75px">Editar</button></td>
         <td class="align-middle">${datos[i].name}</td>
         <td class="align-middle">${datos[i].description}</td>
         </tr>
         `
      }
   } else if (tabla === "Room") {
      for (i = 0; i < datos.length; i++) {
         headers += `
            <tr>
            <td class='align-middle'><button class='btn btn-danger' style='width: 75px' onclick="borrar(${datos[i].id},'${tabla}')">Borrar</button><button class='btn btn-warning' style='width: 75px' onclick="editar('${tabla}',
            ${datos[i].id})">Editar</button></td>
            <td class='align-middle'>${datos[i].name}</td>
            <td class='align-middle'>${datos[i].hotel}</td>
            <td class='align-middle'>${datos[i].stars}</td>
            <td class='align-middle'>${datos[i].description}</td>
            `
         if (datos[i].category != null) {
            headers += `<td class='align-middle'>${datos[i].category.name}</td>`
         } else {
            headers += `<td class='align-middle'><em>Sin Definir</em></td>`
         }
         headers += `</tr>`
      }
   } else if (tabla === "Client") {
      for (i = 0; i < datos.length; i++) {
         headers += `
         <tr>
         <td class='align-middle'><button class='btn btn-danger' style='width: 75px' onclick="borrar(${datos[i].idClient},'${tabla}')">Borrar</button><button class='btn btn-warning' style='width: 75px' onclick="editar('${tabla}',${datos[i].idClient})">Editar</button></td>
         <td class='align-middle'>${datos[i].email}</td>
         <td class='align-middle'>${datos[i].password}</td>
         <td class='align-middle'>${datos[i].name}</td>
         <td class='align-middle'>${datos[i].age}</td>
         </tr>
         `
      }
   } else if (tabla === "Message") {
      for (i = 0; i < datos.length; i++) {
         headers += `
         <tr>
         <td class='align-middle'><button class='btn btn-danger' style='width: 75px' onclick="borrar(${datos[i].idMessage},'${tabla}')">Borrar</button><button class='btn btn-warning' style='width: 75px' onclick="editar('${tabla}',${datos[i].idMessage})">Editar</button></td>
         <td class='align-middle'>${datos[i].messageText}</td>
         `
         if (datos[i].client != null) {
            headers += `<td class='align-middle'>${datos[i].client.name}</td>`
         } else {
            headers += `<td class='align-middle'><em>Sin Definir</em></td>`
         }
         if (datos[i].room != null) {
            headers += `<td class='align-middle'>${datos[i].room.name}</td>`
         } else {
            headers += `<td class='align-middle'><em>Sin Definir</em></td>`
         }
         headers += `</tr>`
      }
   } else if (tabla === "Reservation") {
      for (i = 0; i < datos.length; i++) {
         headers += `
         <tr>
         <td class='align-middle'><button class='btn btn-danger' style='width: 75px' onclick="borrar(${datos[i].idReservation},'${tabla}')">Borrar</button><button class='btn btn-warning' style='width: 75px' onclick="editar('${tabla}',${datos[i].idReservation})">Editar</button></td>
         <td class='align-middle'>${datos[i].startDate.split("T")[0]}</td>
         <td class='align-middle'>${datos[i].devolutionDate.split("T")[0]}</td>
         `
         if (datos[i].client != null) {
            headers += `<td class='align-middle'>${datos[i].client.name}</td>`
         } else {
            headers += `<td class='align-middle'><em>Sin Definir</em></td>`
         }
         if (datos[i].room != null) {
            headers += `<td class='align-middle'>${datos[i].room.name}</td>`
         } else {
            headers += `<td class='align-middle'><em>Sin Definir</em></td>`
         }
         headers += `</tr>`
      }
   }
   return headers;
}

/**
 * Consultar listas desplegables con datos de API
 */
function consultarCategoriasLista() {
   $.ajax({
      url: urlConexion + moduloCategory + opcionGetAll,
      type: "GET",
      dataType: "json",
      error: crearLista2("Category", []),
      success: function (json) {
         crearLista2("Category", json);
      },
   });
}

/**
 * Consultar todos los clientes
 */
function consultarClientesLista() {
   $.ajax({
      url: urlConexion + moduloClient + opcionGetAll,
      type: "GET",
      dataType: "json",
      error: crearLista2("Client", []),
      success: function (json) {
         crearLista2("Client", json);
      },
   });
}

/**
 * Consultar todas las habitaciones
 */
function consultarHabitacionesLista() {
   $.ajax({
      url: urlConexion + moduloRoom + opcionGetAll,
      type: "GET",
      dataType: "json",
      error: crearLista2("Room", []),
      success: function (json) {
         crearLista2("Room", json);
      },
   });
}

/**
 * Crear select de los formularios
 * @param {*} panel
 * @param {*} registros
 */
function crearLista2(panel, registros) {
   $("#pnlSel" + panel).empty();
   let tblRegistros =
      "<select class='form-control rounded-0 border-top-0 border-right-0 border-left-0' id='sel" + panel + "' name='sel" + panel + "' >";
   tblRegistros += crearItemInicial(panel);
   if (typeof registros != "undefined" && registros.length != 0) {
      tblRegistros += crearDatosLista(panel, registros);
   }
   tblRegistros += "</select>";
   $("#pnlSel" + panel).append(tblRegistros);
}

/**
 * Crear opcion por defecto de los select de los formularios
 * @param {*} tabla
 * @returns
 */
function crearItemInicial(tabla) {
   let headers = "";
   if (tabla === "Category") {
      headers += "<option value=''>Categoria...</option>";
   } else if (tabla === "Client") {
      headers += "<option value=''>Cliente...</option>";
   } else if (tabla === "Room") {
      headers += "<option value=''>Habitación...</option>";
   }
   return headers;
}

/**
 * Cargar datos a los select de los formularios
 * @param {*} tabla
 * @param {*} datos
 * @returns
 */
function crearDatosLista(tabla, datos) {
   let headers = "";
   if (tabla === "Category" || tabla === "Room") {
      for (i = 0; i < datos.length; i++) {
         headers +=
            "<option value=" + datos[i].id + ">" + datos[i].name + "</option>";
      }
   } else if (tabla === "Client") {
      for (i = 0; i < datos.length; i++) {
         headers +=
            "<option value=" +
            datos[i].idClient +
            ">" +
            datos[i].name +
            "</option>";
      }
   }
   return headers;
}

/**
 * Borrar una entidad
 * @param {*} id 
 * @param {*} entidad 
 */
function borrar(id, entidad) {
   $.ajax({
      url: urlConexion + entidad + "/" + id,
      type: "DELETE",
      dataType: "json",
      success: function (json) {
         alert("Se elimino correctamente");
         if (entidad == "Category") {
            consultarCategorias();
         } else if (entidad == "Room") {
            consultarHabitaciones();
         } else if (entidad == "Client") {
            consultarClientes();
         } else if (entidad == "Message") {
            consultarMensajes();
         } else {
            consultarReservas();
         }
      },
      error: function () {
         if (entidad == "Category") {
            alert("Elimine las habitaciones asociadas a esta categoria");
         } else if (entidad == "Room") {
            alert("Elimine los mensajes y/o reservas asociad@s a esta habitacion");
         } else if (entidad == "Client") {
            alert("Elimine los mensajes y/o reservas asociad@s a este cliente");
         }
      }
   });
}

/**
 * Editar un registro
 * @param {*} panel 
 * @param {*} id 
 */
function editar(panel, id) {
   $("#btnAgregar").attr("style", "display: none !important");
   $("#btnActualizar").attr("style", "display: block !important");
   $.ajax({
      url: urlConexion + panel + "/" + id,
      type: "GET",
      dataType: "json",
      success: function (json) {
         if (panel == "Category") {
            $('#btnActualizar').attr('onclick', `validarCategoria('actualizar',${json.id})`);
            $("#txtName").val(json.name);
            $("#txtDescription").val(json.description);
         } else if (panel == "Room") {
            $('#btnActualizar').attr('onclick', `validarHabitacion('actualizar',${json.id})`);
            $("#txtName").val(json.name),
               $("#txtStars").val(json.stars),
               $("#selCategory").val(json.category.id),
               $("#txtHotel").val(json.hotel),
               $("#txtDescription").val(json.description)
         } else if (panel == "Client") {
            $('#btnActualizar').attr('onclick', `validarCliente('actualizar',${json.idClient})`);
            $("#txtName").val(json.name);
            $("#txtEmail").val(json.email);
            $("#txtPassword").val(json.password);
            $("#txtAge").val(json.age);
         } else if (panel == "Message") {
            $('#btnActualizar').attr('onclick', `validarMensaje('actualizar',${json.idMessage})`);
            $("#txtMessageText").val(json.messageText);
            $("#selClient").val(json.client.idClient);
            $("#selRoom").val(json.room.id);
         } else {
            $('#btnActualizar').attr('onclick', `validarReserva('actualizar',${json.idReservation})`);
            $("#txtStartDate").val(json.startDate.split("T")[0]);
            $("#txtDevolutionDate").val(json.devolutionDate.split("T")[0]);
            $("#selClient").val(json.client.idClient);
            $("#selRoom").val(json.room.id);
         }

         //$('#btnActualizar').attr('onclick', "actualizarCategoria('"+json.id+"')");
         //$('#btnActualizar').attr('onclick', "actualizarCategoria(" + json.id + ", 'Category')");
         //'onclick','editar('Reservation'," +datos[i].idReservation +")'

      },
      error: function () {
         alert("Ocurrio un error");
      }
   });
}

/**
 * Validar campos
 */
function validarCategoria(opcion, id) {
   event.preventDefault();
   if ($("#txtName").val() === "") {
      alert("Ingrese el Nombre de la Categoría.");
      $("#txtName").focus();
   } else if ($("#txtDescription").val() === "") {
      alert("Ingrese la Descripción de la Categoría.");
      $("#txtDescription").focus();
   } else if (opcion == "agregar") {
      registrarNuevo("Category");
   } else {
      actualizarRegistro(id, "Category");
   }
}

/**
 * Validar campos
 */
function validarHabitacion(opcion, id) {
   event.preventDefault();
   if ($("#txtName").val() === "") {
      alert("Ingrese el Nombre de la Habitación.");
      $("#txtName").focus();
   } else if ($("#txtStars").val() === "") {
      alert("Ingrese las Estrellas de la Habitación.");
      $("#txtStars").focus();
   } else if ($("#selCategory").val() === "") {
      alert("Indique la categoría de la Habitación.");
      $("#selCategory").focus();
   } else if ($("#txtHotel").val() === "") {
      alert("Ingrese el Hotel de la Habitación.");
      $("#txtHotel").focus();
   } else if ($("#txtDescription").val() === "") {
      alert("Ingrese la Descripción de la Habitación.");
      $("#txtDescription").focus();
   } else if (opcion == "agregar") {
      registrarNuevo("Room");
   } else {
      actualizarRegistro(id, "Room");
   }
}

/**
 * Validar campos
 */
function validarCliente(opcion, id) {
   event.preventDefault();
   if ($("#txtName").val() === "") {
      alert("Ingrese el nombre del Cliente.");
      $("#txtName").focus();
   } else if ($("#txtEmail").val() === "") {
      alert("Ingrese el e-mail del Cliente.");
      $("#txtEmail").focus();
   } else if (!mail_format.test($("#txtEmail").val())) {
      alert("Ingrese un E-mail de Cliente válido");
      $("#txtEmail").focus();
   } else if ($("#txtPassword").val() === "") {
      alert("Ingrese la contrasña del Cliente.");
      $("#txtPassword").focus();
   } else if ($("#txtAge").val() === "") {
      alert("Ingrese la edad del Cliente.");
      $("#txtAge").focus();
   } else if (opcion == "agregar") {
      registrarNuevo("Client");
   } else {
      actualizarRegistro(id, "Client");
   }
}

/**
 * Validar campos
 */
function validarMensaje(opcion, id) {
   event.preventDefault();
   if ($("#txtMessageText").val() === "") {
      alert("Ingrese el texto del Mensaje.");
      $("#txtMessageText").focus();
   } else if ($("#selClient").val() === "") {
      alert("Indique el cliente del Mensaje.");
      $("#selClient").focus();
   } else if ($("#selRoom").val() === "") {
      alert("Indique la habitación del Mensaje.");
      $("#selRoom").focus();
   } else if (opcion == "agregar") {
      registrarNuevo("Message");
   } else {
      actualizarRegistro(id, "Message");
   }
}

/**
 * Validar campos
 */
function validarReserva(opcion, id) {
   event.preventDefault();
   if ($("#txtStartDate").val() === "") {
      alert("Ingrese la fecha de inicio de la Reserva.");
      $("#txtStartDate").focus();
   } else if ($("#txtDevolutionDate").val() === "") {
      alert("Ingrese la fecha de devolución de la Reserva.");
      $("#txtDevolutionDate").focus();
   } else if ($("#selClient").val() === "") {
      alert("Indique el cliente de la Reserva.");
      $("#selClient").focus();
   } else if ($("#selRoom").val() === "") {
      alert("Indique la habitación de la Reserva.");
      $("#selRoom").focus();
   } else if (opcion == "agregar") {
      registrarNuevo("Reservation");
   } else {
      actualizarRegistro(id, "Reservation");
   }
}

/**
 * Crear un nuevo registro
 * @param {*} modulo
 */
function registrarNuevo(modulo) {
   event.preventDefault();
   if (modulo === "Category") {
      $.ajax({
         url: urlConexion + moduloCategory + opcionSave,
         data: JSON.stringify({
            name: $("#txtName").val(),
            description: $("#txtDescription").val(),
         }),
         type: "POST",
         contentType: "application/json",
         dataType: "text",
         error: function (result) {
            alert("Error: Ver log para detalles.");
            console.log(result);
         },
         success: function () {
            alert("Categoría Agregada.");
            consultarCategorias();
         },
      });
   } else if (modulo === "Room") {
      $.ajax({
         url: urlConexion + moduloRoom + opcionSave,
         data: JSON.stringify({
            name: $("#txtName").val(),
            stars: $("#txtStars").val(),
            category: {
               id: $("#selCategory").val(),
            },
            hotel: $("#txtHotel").val(),
            description: $("#txtDescription").val(),
         }),
         type: "POST",
         contentType: "application/json",
         dataType: "text",
         error: function (result) {
            alert("Error: Ver log para detalles.");
            console.log(result);
         },
         success: function () {
            alert("Habitación Agregada.");
            consultarHabitaciones();
         },
      });
   } else if (modulo === "Client") {
      $.ajax({
         url: urlConexion + moduloClient + opcionSave,
         data: JSON.stringify({
            name: $("#txtName").val(),
            email: $("#txtEmail").val(),
            password: $("#txtPassword").val(),
            age: $("#txtAge").val(),
         }),
         type: "POST",
         contentType: "application/json",
         dataType: "text",
         error: function (result) {
            alert("Error: Ver log para detalles.");
            console.log(result);
         },
         success: function () {
            alert("Cliente Agregado.");
            consultarClientes();
         },
      });
   } else if (modulo === "Message") {
      $.ajax({
         url: urlConexion + moduloMessage + opcionSave,
         data: JSON.stringify({
            messageText: $("#txtMessageText").val(),
            client: {
               idClient: $("#selClient").val(),
            },
            room: {
               id: $("#selRoom").val(),
            },
         }),
         type: "POST",
         contentType: "application/json",
         dataType: "text",
         error: function (result) {
            alert("Error: Ver log para detalles.");
            console.log(result);
         },
         success: function () {
            alert("Mensaje Agregado.");
            consultarMensajes();
         },
      });
   } else if (modulo === "Reservation") {
      $.ajax({
         url: urlConexion + moduloReservation + opcionSave,
         data: JSON.stringify({
            startDate: $("#txtStartDate").val(),
            devolutionDate: $("#txtDevolutionDate").val(),
            client: {
               idClient: $("#selClient").val(),
            },
            room: {
               id: $("#selRoom").val(),
            },
         }),
         type: "POST",
         contentType: "application/json",
         dataType: "text",
         error: function (result) {
            alert("Error: Ver log para detalles.");
            console.log(result);
         },
         success: function () {
            alert("Reserva Agregada.");
            consultarReservas();
         },
      });
   }
}

/**
 * Actualizar un registro
 * @param {*} id1 
 * @param {*} opcion 
 */
function actualizarRegistro(id1, opcion) {
   let datos;
   if (opcion == "Category") {
      datos = {
         id: id1,
         name: $("#txtName").val(),
         description: $("#txtDescription").val()
      }
   } else if (opcion == "Room") {
      datos = {
         id: id1,
         name: $("#txtName").val(),
         stars: $("#txtStars").val(),
         category: {
            id: $("#selCategory").val(),
         },
         hotel: $("#txtHotel").val(),
         description: $("#txtDescription").val()
      }
   } else if (opcion == "Client") {
      datos = {
         idClient: id1,
         email: $("#txtEmail").val(),
         password: $("#txtPassword").val(),
         name: $("#txtName").val(),
         age: $("#txtAge").val()
      }
   } else if (opcion == "Message") {
      datos = {
         idMessage: id1,
         messageText: $("#txtMessageText").val(),
         client: {
            idClient: $("#selClient").val(),
         },
         room: {
            id: $("#selRoom").val(),
         }

      }
   } else {
      datos = {
         idReservation: id1,
         startDate: $("#txtStartDate").val(),
         devolutionDate: $("#txtDevolutionDate").val(),
         room: {
            id: $("#selRoom").val(),
         },
         client: {
            idClient: $("#selClient").val(),
         }
      }
   }
   $.ajax({
      url: urlConexion + opcion + opcionUpdate,
      data: JSON.stringify(datos),
      type: "PUT",
      contentType: "application/json",
      dataType: "text",
      error: function (result) {
         alert("Error: Ver log para detalles.");
         console.log(result);
      },
      success: function () {
         $("#btnAgregar").attr("style", "display: block !important");
         if (opcion == "Category") {
            alert("Categoría Actualizada.");
            consultarCategorias();
         } else if (opcion == "Room") {
            alert("Habitacion Actualizada.");
            consultarHabitaciones();
         } else if (opcion == "Client") {
            alert("Cliente Actualizado.");
            consultarClientes();
         } else if (opcion == "Message") {
            alert("Mensaje Actualizado.");
            consultarMensajes();
         } else if (opcion == "Reservation") {
            alert("Reserva Actualizada.");
            consultarReservas();
         }
      }
   });
}
