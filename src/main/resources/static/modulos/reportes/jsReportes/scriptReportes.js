
function traerReporteStatus(){
    let url = 'http://localhost:81/api/Reservation/report-status';
    $.getJSON(url).done(function(data){
        console.log(data);
        tbody = $('#tabla-status tbody');                
            let row = `
            <tr>                
                <td>${data.completed}</td> 
                <td>${data.cancelled}</td>                 
            </tr>`;
            tbody.append(row);
        
    });
}

function traerReporteDate(){
    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;

    let url = 'http://localhost:81/api/Reservation/report-dates/'+fechaInicio+"/"+fechaCierre;
    $.getJSON(url).done(function(data){
        console.log(data);
        tbody = $('#tabla-Date tbody');                
        $.each(data,function(index,item){
            let row = `
            <tr data-id=${item.idReservation}>
                <td>${item.client.name}</td>
                <td>${item.farm.name}</td>
                <td>${item.startDate}</td>                
                <td>${item.devolutionDate}</td>
                <td>${item.status}</td>
                
            </tr>`;
            tbody.append(row);
        });
        
    });
}

function traerReporteClientes(){
    let url = 'http://localhost:81/api/Reservation/report-clients';
    $.getJSON(url).done(function(data){
        console.log(data);
        tbody = $('#tabla-Cliente tbody');                
        $.each(data,function(index,item){
            let row = `
            <tr>
                <td>${item.client.name}</td>
                <td>${item.client.email}</td>
                <td>${item.client.age}</td>              
                <td>${item.total}</td>                
            </tr>`;
            tbody.append(row);
        });
        
    });

}