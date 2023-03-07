// api call 
async function getData(dataLimit, click) {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    let data = await response.json();
    if (click) {
      data = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
      showAiUniverseData(data, dataLimit);

    }
    else {
      showAiUniverseData(data.data.tools, dataLimit);
    }


  } catch (error) {
    console.error(error);
  }
}
// show data 
const showAiUniverseData = (data, dataLimit) => {
  const container = document.getElementById("ai-universe");
  const div = document.createElement("div");
  const showMore = document.getElementById("see-more-btn");
  container.textContent = '';

  if (data.length > 6 && dataLimit > 2) {
    data = data.slice(0, 6);
    showMore.classList.remove('d-none');
  }
  else {
    showMore.classList.add('d-none')
  }

  data.forEach((data) => {

    let number = 1;
    let features = "";
    for (let i = 0; i < data.features.length; i++) {
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
let flag = false;
// show all data 
document.getElementById('see-more-btn').addEventListener('click', function () {

  toggleSpinner(true);

  if (flag == true) {
    // async function for lazy load 
    setTimeout(function () {
      getData(0, true)
    }, 200);

  }
  else {
    // async function for lazy load 
    setTimeout(function () {
      getData(0, false)
    }, 200);

  }

})


    // sort data here 
    document.getElementById('sort-btn').addEventListener('click', function(e){
      flag=true;
       getData(6,true); 
      })
 
     //  show details in modal 
     const loadDetails = async id =>{
       const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
       const res = await fetch(url);
       const data = await res.json();
       displayDetails(data)
       // console.log(data);
   }
   











const displayDetails = data =>{
  let features ="" ;
  let array = Object.values(data.data.features);
  if(data.data.features != null){
  for(let i=0; i<array.length;i++){
    features += `<li style="font-size:10px" class="fw-7 color-primary">${array[i].feature_name}</li>`;
  }
}
else{
  features="No data Found";
}
  let Integrations ="" ;
  if(data.data.integrations != null){
    for(let i=0; i<data.data.integrations.length;i++){
      Integrations += `<li style="font-size:10px" class="align-right p-0 color-primary">${data.data.integrations[i]}</li>`;
    }
  }
  else{
    Integrations='No data Found';
  }
 
   
 
  // for card 1 select
  const card1Title = document.getElementById('card1-title');
  const pricing = document.getElementById('pricing');
  const cardFooter = document.getElementById('card-footer');
 

  // for card 2  select

  const modalImage = document.getElementById('modalImage');
  const card2Title = document.getElementById('card-title');
  const cardText = document.getElementById('card-text');
  // for card 1 
  card1Title.innerText=`${data.data.description}`;
  pricing.innerHTML=`
  <div  class=" d-flex flex-column flex-sm-row align-center priceParent  mt-3 align-items-stretch text-center  align-items-center justify-content-center gap-4">
  <div style="font-size:10px;" class="price bg-body p-3 rounded  w-100  text-success">${data.data.pricing!=null ? data.data.pricing[0].price : 'Free Of'}<br>${data.data.pricing!=null ? data.data.pricing[0].plan :''}</div>
  <div style="font-size:10px;" class="price bg-body p-3 rounded   w-100 text-warning"> ${data.data.pricing!=null  ? data.data.pricing[1].price:'Free Of'}<br>${data.data.pricing!=null ?data.data.pricing[1].plan: ''}</div>
  <div style="font-size:10px;" class="price bg-body p-3 rounded w-100 text-danger ">${data.data.pricing!=null ? data.data.pricing[2].price.slice(0,10) :'Free Of'}<br>${data.data.pricing!=null ? data.data.pricing[2].plan :''}</div>
</div>
  `;
  // data.data.
  cardFooter.innerHTML=`
  <div  class="d-flex mt-2 justify-content-between">
  <div  <p>Features</p>
  <ul class="px-3 " >${features}</ul>
  </div>
  <div  class="mx-6"><p>Integrations</p>
  <ul class="px-3" >${Integrations }</ul>
  
  </div>
</div>
  `

  // for card 2 
  modalImage.innerHTML=`
  <img class="card-img-top rounded-xl img-fluid" src="${data.data.image_link[0]}" class="card-img-top" alt="...">
  <div class="position-absolute top-0 end-0">
  ${data.data.accuracy.score ?`<div id="priceScore" class="bg-danger rounded p-1 m-2 border-0 text-white fs-6">${data.data.accuracy.score ? data.data.accuracy.score * 100 : '' }% accuracy</div>`:''}
</div>
  `;
  card2Title.innerText=`${data.data.input_output_examples != null ? data.data.input_output_examples[0].input: 'Can you give any example?'}`;
  cardText.innerText=`${data.data.input_output_examples != null ? data.data.input_output_examples[0].output : 'No!Not Yet!Take a break!!!' }`
 
}










const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none');
  }
}
getData(6);