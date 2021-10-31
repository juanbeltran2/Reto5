$(function(){
    $('#alert-ok').hide();
    $('#alert-error').hide();
    listarMensajes();
    eliminarMessage();
    crearMessage();
    autoInicioClient();
    autoInicioFarm();
    mostarEditarMessageModal();
    editarMessage();
});

function listarMensajes(){
    let url = 'http://localhost:81/api/Message/all';
    $.getJSON(url).done(function(data){
        //console.log(data);
        tbody = $('#tabla-Mensajes tbody');        
        $.each(data,function(index,item){
            let row = `
            <tr data-id=${item.idMessage}>
                <td>${item.client.name}</td>
                <td>${item.messageText}</td>                
                <td>${item.farm.name}</td>
                <td> <button type="button" class="btn btn-success editar">Editar</button></td>
                <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
            </tr>`;
            tbody.append(row);
        });
    });
}

function eliminarMessage(){
    $('#tabla-Mensajes tbody').on('click','.eliminar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://localhost:81/api/Message/'+id;
        $.ajax({
            url:myurl,
            type:'DELETE',
            success:function(result){
                tr.remove();
            }
        });      
    });
}

function crearMessage(){
    $("#add-btn").on('click',function(ev){   
        let var2 = {
            messageText:$('#txtmensaje').val(),
            client:{idClient:+$('#select-client').val()},
            farm:{id:+$('#select-farm').val()},
        };
        
        data= JSON.stringify(var2)
        console.log(data)
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),            
        url:"http://localhost:81/api/Message/save",
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

function mostarEditarMessageModal(){
    $('#tabla-Mensajes tbody').on('click','.editar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://localhost:81/api/Message/'+id;
        $.getJSON(myurl)
        .done(function(data){
            $('#einputID').val(data.idMessage);
            $('#eMessage').val(data.messageText);             
            var myModal = new bootstrap.Modal(document.getElementById('editarMessageModal'));
            myModal.show()
        });
    });
}

function editarMessage(){
    $("#edit-btn").on('click',function(ev){
        let myurl = 'http://localhost:81/api/Message/update';
        let eID = $('#einputID').val();
        let eMessage= $('#eMessage').val();
        $.ajax({
            url:myurl,
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({idMessage:eID, messageText: eMessage}), 
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
        url:"http://localhost:81/api/Client/all",
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
        url:"http://localhost:81/api/Farm/all",
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