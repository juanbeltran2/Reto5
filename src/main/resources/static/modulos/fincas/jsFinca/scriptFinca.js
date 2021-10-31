$(function(){
    $('#alert-ok').hide();
    $('#alert-error').hide();
    listarFincas();
    eliminarFarm();
    crearFinca();
    autoInicioCategoria()
    mostarEditarFarmModal();
    editarFarm();
});

function listarFincas(){
    let url = 'http://152.67.45.211:81/api/Farm/all';
    $.getJSON(url).done(function(data){
        //console.log(data);
        tbody = $('#tabla-Farm tbody');        
        $.each(data,function(index,item){
            let row = `
            <tr data-id=${item.id}>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.extension}</td>
                <td>${item.description}</td>
                <td>${item.category.name}</td> 
                <td> <button type="button" class="btn btn-success editar">Editar</button></td>
                <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
            </tr>`;
            tbody.append(row);
        });
    });
}

function eliminarFarm(){
    $('#tabla-Farm tbody').on('click','.eliminar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://152.67.45.211:81/api/Farm/'+id;
        $.ajax({
            url:myurl,
            type:'DELETE',
            success:function(result){
                tr.remove();
            }
        });      
    });
}

function crearFinca(){
    $("#add-btn").on('click',function(ev){   
        let var2 = {
            name:$('#txtname').val(),
            address:$('#txtDireccion').val(),   
            extension:$('#txtExtension').val(),
            description:$('#txtDescripcion').val(), 
            category:{id:+$('#select-category').val()},
        };
        
        data= JSON.stringify(var2)
        console.log(data)
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),            
        url:"http://152.67.45.211:81/api/Farm/save",
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()        
        }, 
        error: function(jqXHR, textStatus, errorThrown) {                  
        alert("No se guardo correctamente");
        }
        }); 
    }); 
}

function mostarEditarFarmModal(){
    $('#tabla-Farm tbody').on('click','.editar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://152.67.45.211:81/api/Farm/'+id;
        $.getJSON(myurl)
        .done(function(data){
            $('#einputID').val(data.id);
            $('#einputName').val(data.name);
            $('#einputdireccion').val(data.address);   
            $('#einputextension').val(data.extension);
            $('#einputdescription').val(data.description); 
            var myModal = new bootstrap.Modal(document.getElementById('editarFincaModal'));
            myModal.show()
        });
    });
}

function editarFarm(){
    $("#edit-btn").on('click',function(ev){
        let myurl = 'http://152.67.45.211:81/api/Farm/update';
        let eID = $('#einputID').val();
        let eName= $('#einputName').val();
        let eAddress= $('#einputdireccion').val();
        let eExtension= $('#einputextension').val();
        let edescription = $('#einputdescription').val();
        $.ajax({
            url:myurl,
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({id:eID, name: eName, address:eAddress, extension:eExtension, description: edescription}), 
            success:function(result){
                alert("Edicion realizada con exito!!!")
                window.location.reload() 
            }
        });
    });   
}

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://152.67.45.211:81/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }   
    })
}