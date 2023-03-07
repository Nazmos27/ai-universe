// api call 
async function getData(dataLimit,click) {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    let data = await response.json();
    if(click){
     data = data.data.tools.sort((a,b) =>  new Date(b.published_in) - new Date(a.published_in));
      showAiUniverseData(data,dataLimit);
     
    }
    else{
      showAiUniverseData(data.data.tools,dataLimit);
    }
     
  
  } catch (error) {
    console.error(error);
  }
}
  // show data 
  const showAiUniverseData =(data, dataLimit)=>{
    const container = document.getElementById("ai-universe");
    const div = document.createElement("div");
    const showMore = document.getElementById("see-more-btn");
    container.textContent = '';
 
  if(data.length > 6 && dataLimit > 2 ){
    data = data.slice(0, 6);
    showMore.classList.remove('d-none');
  }
  else{
    showMore.classList.add('d-none')
  }

    data.forEach((data) => {
    
        let number=1;
        let features ="" ;
        for(let i=0; i<data.features.length ;i++){
          features += `${number++}. ${data.features[i]}<br>`;
        }
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card  p-3 h-100 ">
        <div class=" rounded card-img-top overflow-hidden ">
        <img style=' height: 200px;' src="${data.image}" class="card-img-top rounded-xl img-fluid" alt="...">
        </div>
        <div class="card-body h-25">
            <h5 class="card-title">Features</h5>
            <h6 class="align-right fw-lighter lh-base fs-6 color-primary text-truncate">${features}</h6>
        </div>
        <hr>
        <div class="card-body d-flex justify-content-between align-items-center">
        <div>
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text color-primary "><i class="fas fa-calendar-alt"></i> &nbsp${data.published_in}</p>
        </div>
        <div > <a class="btn btn-danger rounded-circle border-0 p-3" style="background-color: rgb(235, 87, 87,0.07);" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails('${data.id}')"> <i class="fas fa-long-arrow-right"style="color: rgb(235, 87, 87);"></i></a></div>
    </div>
        
        </div>   
      `;
        container.appendChild(div);
      });
      toggleSpinner(false);
    };