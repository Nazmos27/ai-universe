const loadAi = async () => {
  const url = 'https://openapi.programming-hero.com/api/ai/tools'
  const res = await fetch(url)
  const data = await res.json()
  displayData(data.data.tools)

}

const displayData = (data) => {
  const cardContainer = document.getElementById('card-container')
  data.forEach(element => {
    const CardItem = document.createElement('div')
    CardItem.innerHTML = `
  <div id="card-item" class="h-[450px] w-80 mx-auto rounded-md border-black border-2">
      <img src="${element.image}" alt="" class="h-1/2 w-full px-2 py-2 rounded-lg mx-auto">
      <h3 class="pl-4 text-xl font-bold">Features</h3>
      <ul class="pl-8 list-decimal">
        <li>${element.features[0]}</li>
        <li>${element.features[1]}</li>
        <li>${element.features[2]}</li>
        
      </ul>
      <hr class="w-3/4 border-black mx-auto my-6">
      <div class="flex justify-between px-4 mb-6 items-center">
        <div class="space-y-2 ">
          <h3 class=" text-xl font-bold">${element.name}</h3>
          <div class="flex gap-2">
            <img src="./image/calendar.png" alt="" class="h-5 w-5"><p class="text-sm">1/11/2022</p>
          </div>
        </div>
        <img src="./image/arrow-circle.png" alt="" class="h-9 w-9">    
        
      </div>

    </div>
  `
    cardContainer.appendChild(CardItem)
  });

}

loadAi()
