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
    const classlist = ['h-[450px]', 'w-80', 'mx-auto', 'rounded-md', 'border-black', 'border-2']
    CardItem.classList.add(...classlist)
    CardItem.innerHTML = `
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
        <label for="my-modal${element.name}" class="">
          <img onclick ="loadModal('${element.id}')" src="./image/arrow-circle.png" alt="" class="h-9 w-9">
        </label>
            
          </div>
        </div>


        

  `
    
    const modalContainer = document.getElementById('modal-info')
    const cardModal = document.createElement('div')
    cardModal.classList.add('modal')
    cardModal.innerHTML = `
  <div class="modal-box space-y-4">
  <div class="modal-action">
    <label for="my-modal" class="">
      <svg class="w-7 h-7 p-1 bg-red-500 rounded-full relative -top-12 left-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
    </label>
  </div>
  <div class="h-64 rounded-lg w-full border-2 border-black bg-white">
    <h3 class="text-xm font-semibold px-2 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, accusamus!</h3>
    <div class="flex justify-center items-center gap-2 ">
      <div class="h-20 w-20 rounded-lg bg-blue-200">
        <p class="text-xs"></p>
        <p class="text-xs"></p>
      </div>
      <div class="h-20 w-20 rounded-lg bg-blue-200">
        <p class="text-xs">${element.name}</p>
        <p class="text-xs"></p>
      </div>
      <div class="h-20 w-20 rounded-lg bg-blue-200">
        <p class="text-xs"></p>
        <p class="text-xs"></p>
      </div>
    
      
    </div>
    <div class="flex justify-between px-4 pt-2">
      <div>
        <h4 class="font-semibold">Features</h4>
        <ul class="text-xs">
          <li>adfa</li>
          <li>adfas</li>
          <li>adsfa</li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold">Integrations</h4>
        <ul class="text-xs">
          <li>adfa</li>
          <li>adfas</li>
          <li>adsfa</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="h-60 rounded-lg w-full border-2 border-black bg-white">
    <img src="" alt="">
    <h3 class="text-center text-xm font-semibold px-2 py-1">Lorem ipsum dolor sit amet consectetur adipisicing</h3>
    <p class="text-sm text-center">Lorem ipsum dolor sit amet.</p>
  </div>
  
</div>
  `
    modalContainer.appendChild(cardModal)
    cardContainer.appendChild(CardItem)
    loadModal(`${element.id}`)



  });

}






loadAi()

const loadModal = async id => {
  const modalurl = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(modalurl)
  const data = await res.json()
  console.log(data.data.description)

}

const show = () => {
  console.log('hi')
}












