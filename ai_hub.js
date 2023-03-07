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