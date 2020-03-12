<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

    <%
       String jsonEstadoPartida = "";
       if (request.getAttribute("equipo") != null) {

       jsonEstadoPartida = (String) request.getAttribute("estadoPartida");
       }
       %>
        <!DOCTYPE html>
        <html lang="es">

            <head>
                <meta charset="UTF-8">
            </head>

            <body>
                <div class="container-fluid">
                    <div class="row align-items-start">
                        <div class="col">
                            <div class="card text-center text-white bg-dark">
                                <div class="card-header">Nueva Partida</div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <select class="form-control" id="selectBarcoNuevo">
                                            <option value="" selected="">Seleccione equipo</option>
                                            <option value="Patrullero">Patrullero</option>
                                            <option value="Pesquero">Pesquero</option>
                                        </select>
                                        <div id="loading" style="display:none;">LOADING...</div>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <button type="button" class="btn btn-outline-light" id="buttonNuevaPartida">Buscar oponente</button>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <button type="button" class="btn btn-outline-light" style="display: none;" id="unirseAPartida">Unirse a partida</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>

                    </div>
                    <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
                    <script type="text/javascript" src="index.js"></script>
                    </body>

                </html>