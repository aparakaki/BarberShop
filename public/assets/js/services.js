var services = [
    {style: "fade",
    time: 20,
    price: 25,
    id: 1},
    {style: "buzz cut",
    time: 30,
    price: 35,
    id: 2},
]

for (var i=0; i<services.length; i++){
    $(".accordion").append(`
    <div class="card">
    <div class="card-header" id="headingOne">
        <h5 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${[i]}"
                aria-expanded="true" aria-controls="collapse${[i]}">
                ${services[i].style}
            </button>
        </h5>
    </div>

    <div id="collapse${[i]}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
          Estimated Time: ${services[i].time} <br>
          Price: $${services[i].price}
          
        </div>
    </div>
</div>
    
    
    `)
}