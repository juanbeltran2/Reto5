$(function(){
    $('#alert-ok').hide();
    $('#alert-error').hide();
    listarCategorias();
    eliminarCategory();
    crearCategory();
    mostarEditarCategoriaModal();
    editarCategoria();
});

function listarCategorias(){
    let url = 'http://152.67.45.211:81/api/Category/all';
    $.getJSON(url).done(function(data){
        //console.log(data);
        tbody = $('#tabla-category tbody');        
        $.each(data,function(index,item){
            let row = `
            <tr data-id=${item.id}>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td> <button type="button" class="btn btn-success editar">Editar</button></td>
                <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
            </tr>`;

            tbody.append(row);
        });
    });
}

function eliminarCategory(){
    $('#tabla-category tbody').on('click','.eliminar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://152.67.45.211:81/api/Category/'+id;
        $.ajax({
            url:myurl,
            type:'DELETE',
            success:function(result){
                tr.remove();
            }
        });      
    });
}

function crearCategory(){
    $("#add-btn").on('click',function(ev){        
        ev.preventDefault();
        let inputname = $('#txtname').val();
        let inputdescripcion = $('#txtDescripcion').val();        
        let url = 'http://152.67.45.211:81/api/Category/save';
        $.ajaxSetup({
            contentType: "application/json; charset=utf-8"
        });

        $.post( url, JSON.stringify({ name: inputname, description: inputdescripcion}) )
        .done(function(item){                        
            alert("Categoria creada con exito!!!")
            window.location.reload() 
        })
        .fail(function(){
            alert("ERROR! No se pudo crear correctamente la Categoria")
            $('#alert-error').show(100);
            $('#alert-error').html();
        });
    });
}

function mostarEditarCategoriaModal(){
    $('#tabla-category tbody').on('click','.editar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://152.67.45.211:81/api/Category/'+id;
        $.getJSON(myurl)
        .done(function(data){
            $('#einputID').val(data.id);
            $('#einputName').val(data.name);
            $('#einputdescription').val(data.description);           
            var myModal = new bootstrap.Modal(document.getElementById('editarCategoriaModal'));
            myModal.show()
        });
    });
}

function editarCategoria(){
    $("#edit-btn").on('click',function(ev){
        let myurl = 'http://152.67.45.211:81/api/Category/update';
        let eID = $('#einputID').val();
        let eName= $('#einputName').val();
        let edescription = $('#einputdescription').val();
        $.ajax({
            url:myurl,
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({id:eID, name: eName, description: edescription}), 
            success:function(result){
                alert("Edicion realizada con exito!!!")
                window.location.reload() 
            }
        });
    });
    
    
}