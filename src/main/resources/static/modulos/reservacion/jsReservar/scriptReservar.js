$(function(){
    $('#alert-ok').hide();
    $('#alert-error').hide();
    listarReservas();
    eliminarReserva();
    crearReserva();
    autoInicioClient();
    autoInicioFarm();
    mostarEditarReservaModal();
    editarReservation();
});

function listarReservas(){
    
    let url = 'http://152.67.45.211:81/api/Reservation/all';
    $.getJSON(url).done(function(data){
        //console.log(data);
        tbody = $('#tabla-Reservas tbody');        
        $.each(data,function(index,item){
            let row = `
            <tr data-id=${item.idReservation}>
                <td>${item.client.name}</td>                                
                <td>${item.farm.name}</td>
                <td> ${item.startDate}</td>
                <td>${item.devolutionDate}</td>
                <td> <button type="button" class="btn btn-success editar">Editar</button></td>
                <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
            </tr>`;
            tbody.append(row);
        });
    });
}

function eliminarReserva(){
    $('#tabla-Reservas tbody').on('click','.eliminar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://152.67.45.211:81/api/Reservation/'+id;
        $.ajax({
            url:myurl,
            type:'DELETE',
            success:function(result){
                tr.remove();
            }
        });      
    });
}

function crearReserva(){
    $("#add-btn").on('click',function(ev){   
        let var2 = {            
            client:{idClient:+$('#select-client').val()},
            farm:{id:+$('#select-farm').val()},
            startDate:$('#dateInicio').val(),
            devolutionDate:$('#dateFin').val(),
        };
        
        data= JSON.stringify(var2)
        //console.log(data)
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),            
        url:"http://152.67.45.211:81/api/Reservation/save",
        success:function(response) {
            
            alert("Se guardo correctamente");
            window.location.reload()        
        }, 
        error: function(jqXHR, textStatus, errorThrown) {                  
        alert("No se guardo correctamente");
        }
        }); 
    }); 
}

function mostarEditarReservaModal(){
    $('#tabla-Reservas tbody').on('click','.editar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://152.67.45.211:81/api/Reservation/'+id;
        $.getJSON(myurl)
        .done(function(data){
            console.log(data);
            $('#einputID').val(data.idReservation);
            $('#eStartDate').val(data.startDate);   
            $('#eDevolutionDate').val(data.devolutionDate);             
            var myModal = new bootstrap.Modal(document.getElementById('editarReservationModal'));
            myModal.show()
        });
    });
}

function editarReservation(){
    $("#edit-btn").on('click',function(ev){
        let myurl = 'http://152.67.45.211:81/api/Reservation/update';
        let eID = $('#einputID').val();
        let eStartDate= $('#eStartDate').val();
        let eDevolutionDate= $('#eDevolutionDate').val();
        $.ajax({
            url:myurl,
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({idReservation:eID, startDate: eStartDate, devolutionDate: eDevolutionDate}), 
            success:function(result){
                alert("Edicion realizada con exito!!!")
                window.location.reload() 
            }
        });
    });   
}

function autoInicioClient(){
    //console.log("se esta ejecutando")
    $.ajax({
        url:"http://152.67.45.211:81/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                //console.log("select "+name.idClient);
            }); 
        }   
    })
} 

function autoInicioFarm(){
    //console.log("se esta ejecutando")
    $.ajax({
        url:"http://152.67.45.211:81/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-farm");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                //console.log("select "+name.id);
            }); 
        }   
    })
} 