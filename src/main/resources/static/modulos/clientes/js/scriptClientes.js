$(function(){
    $('#alert-ok').hide();
    $('#alert-error').hide();
    listarClientes();
    eliminarClient();
    crearClient();
    mostarEditarClienteModal();
    editarCategoria();
});

function listarClientes(){
    let url = 'http://localhost:81/api/Client/all';
    $.getJSON(url).done(function(data){
        //console.log(data);
        tbody = $('#tabla-client tbody');        
        $.each(data,function(index,item){
            let row = `
            <tr data-id=${item.idClient}>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.email}</td>
                <td>${item.password}</td>
                <td> <button type="button" class="btn btn-success editar">Editar</button></td>
                <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
            </tr>`;

            tbody.append(row);
        });
    });
}

function eliminarClient(){
    $('#tabla-client tbody').on('click','.eliminar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        console.log(id);
        let myurl = 'http://localhost:81/api/Client/'+id;
        $.ajax({
            url:myurl,
            type:'DELETE',
            success:function(result){
                tr.remove();
            }
        });      
    });
}

function crearClient(){
    $("#add-btn").on('click',function(ev){        
        ev.preventDefault();
        let inputname = $('#txtname').val();
        let inputage = $('#txtEdad').val();
        let inputemail = $('#txtEmail').val();
        let inputpass = $('#txtPass').val();         
        let url = 'http://localhost:81/api/Client/save';
        $.ajaxSetup({
            contentType: "application/json; charset=utf-8"
        });

        $.post( url, JSON.stringify({ name: inputname, age: inputage, email:inputemail, password:inputpass}) )
        .done(function(item){                        
            alert("Cliente creado con exito!!!")
            window.location.reload() 
        })
        .fail(function(){
            alert("ERROR! No se pudo crear correctamente el cliente")
            $('#alert-error').show(100);
            $('#alert-error').html();
        });
    });
}

function mostarEditarClienteModal(){
    $('#tabla-client tbody').on('click','.editar', function(ev){
        ev.preventDefault();
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        let myurl = 'http://localhost:81/api/Client/'+id;
        $.getJSON(myurl)
        .done(function(data){
            $('#einputID').val(data.idClient);
            $('#einputName').val(data.name);
            $('#einputage').val(data.age);     
            $('#einputemail').val(data.email);
            $('#einputpassword').val(data.password);        
            var myModal = new bootstrap.Modal(document.getElementById('editarclientesModal'));
            myModal.show()
        });
    });
}

function editarCategoria(){
    $("#edit-btn").on('click',function(ev){
        let myurl = 'http://localhost:81/api/Client/update';
        let eID = $('#einputID').val();
        let eName= $('#einputName').val();
        let eAge = $('#einputage').val();
        let eEmail = $('#einputemail').val();
        let ePass = $('#einputpassword').val();
        $.ajax({
            url:myurl,
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({idClient:eID, name: eName, age: eAge, email: eEmail, password: ePass}), 
            success:function(result){
                alert("Edicion realizada con exito!!!")
                window.location.reload() 
            }
        });
    });
    
    
}