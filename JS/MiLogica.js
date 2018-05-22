/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    var edificio = new Array();
    var persona = {
        cc: 1234573,
        nom: "persona 1",
        ape: "persona 1",
        correo: "123@123.com",
        tele: 1234124,
        ciudad: 1,
        genero: 1
    };
    edificio.push(persona);
    var persona = {
        cc: 1245673,
        nom: "persona 2",
        ape: "persona 2",
        correo: "13@123.com",
        tele: 12324,
        ciudad: 2,
        genero: 3
    };
    edificio.push(persona);
    var persona = {
        cc: 573,
        nom: "persona 3",
        ape: "persona 3",
        correo: "3@123.com",
        tele: 124,
        ciudad: 2,
        genero: 2
    };
    edificio.push(persona);
    var persona = {
        cc: 1234573,
        nom: "persona 4",
        ape: "persona 4",
        correo: "asd@888.com",
        tele: 5554124,
        ciudad: 3,
        genero: 2
    };
    edificio.push(persona);

    /**
     * esta es la función ajax que permite solicitar al servidor datos
     * @param {type} URL
     * @param {type} parametros
     * @param {type} metodo
     * @returns {undefined}
     */
    function fajax(URL, parametros, metodo) {
        $.ajax({
            url: URL,
            data: parametros,
            type: 'POST',
            cache: false,
            dataType: 'html',
            success: function (datos) {
                metodo(datos);
            },
            error: function (xhr, status) {
                alert("Existe un problema")
            }
        });
    }

    /**
     * Metodo que permite traer a la view de Mercurio
     * @returns {undefined}
     */
    function traerMercurio() {
        var url = "mercurio.php";
        var parametros = "acceso=true";
        var metodo = function (datos) {
            $("#contenido").html(datos);
        };
        fajax(url, parametros, metodo);
    }

    /**
     * Metodo que permite traer a la view de Venus
     * @returns {undefined}
     */
    function traerVenus() {
        var url = "venus.php";
        var parametros = "acceso=true";
        var metodo = function (datos) {
            $("#contenido").html(datos);
        };
        fajax(url, parametros, metodo);
    }

    /**
     * Metodo que permite traer a la view de Tierra
     * @returns {undefined}
     */
    function traerTierra() {
        var url = "tierra.php";
        var parametros = "acceso=true";
        var metodo = function (datos) {
            $("#contenido").html(datos);
        };
        fajax(url, parametros, metodo);
    }

    function itemTa(tmp, i) {
        var estr = $("<tr></tr>");
        estr.append("<td>" + tmp.cc + "</td>" +
                "<td>" + tmp.nom + "</td>" +
                "<td>" + tmp.ape + "</td>" +
                "<td>" + tmp.correo + "</td>" +
                "<td>" + tmp.tele + "</td>" +
                "<td>" + tmp.ciudad + "</td>" +
                "<td>" + tmp.genero + "</td>" +
                "<td class='eliminar' post='" + i + "'>Eliminar</td>");
        $("#ListaTabla").append(estr);
    }
    
    function asigEliminar(){
        $(".eliminar").click(function () {
                    if (confirm("esta seguro de eliminar")) {
                        edificio.splice($(this).attr("post"), 1);
                        $(this).parent().remove();
                        alert("El dato fue eliminado")
                    }
                });
    }

    function traerFormulario() {
        var url = "formulario.php";
        var parametros = "acceso=true";
        var metodo = function (datos) {
            $("#contenido").html(datos);
            $("#Filciudad").change(function () {
                $("#ListaTabla").html("");
                var IdCiudad = $(this).val();
                var limite = edificio.length;
                for (var i = 0; i < limite; i++) {
                    var tmp = edificio[i];
                    if (IdCiudad == tmp.ciudad) {
                        itemTa(tmp, i);
                    }
                }
                asigEliminar();
            });
            $("#listadoFull").click(function () {
                $("#ListaTabla").html("");
                var limite = edificio.length;
                for (var i = 0; i < limite; i++) {
                    var tmp = edificio[i];
                    itemTa(tmp, i);
                }
                asigEliminar();
            });

            $("#formRegistro").validate({
                rules: {
                    CC: {
                        required: true,
                        number: true,
                        digits: true
                    },
                    nom: {
                        required: true,
                        rangelength: [3, 70]
                    },
                    ape: {
                        required: true,
                        rangelength: [3, 70]
                    },
                    correo: {
                        required: true,
                        email: true
                    },
                    correo1: {
                        equalTo: "#correo"
                    },
                    tel: {
                        required: true,
                        number: true,
                        digits: true,
                        rangelength: [7, 10]
                    },
                    ciudad: {
                        required: true,
                        number: true
                    },
                    genero: {
                        required: true,
                        number: true
                    }
                },
                messages: {
                    CC: {
                        digits: "Uppppsssss, no puede tener ni comas, ni puntos",
                        number: "Pilas, debe ser su numero de Cedula"
                    }
                },
                submitHandler: function () {
                    var persona = {
                        cc: $("#CC").val(),
                        nom: $("#nom").val(),
                        ape: $("#ape").val(),
                        correo: $("#correo").val(),
                        tele: $("#tele").val(),
                        ciudad: $("#ciudad").val(),
                        genero: $("#genero").val()
                    };
                    edificio.push(persona);
                    $("#limpiar").trigger("click");
                    alert("El usuario fue registrado")
                }
            });
        };
        fajax(url, parametros, metodo);
    }

    $("#BTMercurio").click(function () {
        traerMercurio();
    });

    $("#BTVenus").click(function () {
        traerVenus();
    });

    $("#BTTierra").click(function () {
        traerTierra();

    });

    $("#formulario").click(function () {
        traerFormulario();
    });
});