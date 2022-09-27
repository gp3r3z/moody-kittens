let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */


let possibleColors = ["happy","tolerant","angry", "gone"]

const kittenImg = {
      neutralKitten: './neutral.png',
      happyKitten: './happy_kitten.png',
      madKitten: './mad_kitten.png',
      sadKitten: './neutral.png'
    
}




function addKitten(event) {

  event.preventDefault()
let form = event.target 




  console.log("Adding Kitten")


    let newKitten = {
      id: generateId(),
      name: form.name.value,
      mood: 'tolerant',
      affection: 5,
      img: kittenImg.neutralKitten, 
      // color: getRandomColor()
      
    }

    console.log("Creating new kitten: " , newKitten)

    kittens.push(newKitten)

    console.log("Updating the array")
    saveKittens()



    form.reset()

    console.log("Sucessfully added kitten")
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {

  console.log("Saving Kitten")


  window.localStorage.setItem("kittens", JSON.stringify(kittens))


  loadKittens()
}



/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {

    console.log("Loading kittens")

      let kittenData = JSON.parse(window.localStorage.getItem("kittens"))


      console.log("Current kittens " , kittenData)
      
    if(kittenData){

      // document.getElementById("welcome").remove()
if(document.getElementById("welcome")){
  document.getElementById("welcome").remove()
}
       console.log("Kitten data present")
       drawKittens(kittenData)

    } else {
      console.log("No data loaded")
    }

    }

    function getRandomColor(){
      let i = Math.floor(Math.random() * possibleColors.length);
      currentColor = possibleColors[i];
  
   }

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens(kittenData) {

  console.log("drawing kittens...")
  // for( let i = 0 ; i < kittens.length ; i++){
  //   findKittenById(kittens[i])
   
  //   let kitty = findKittenById(kittens[i]); 


  // }

  let kittensElement = document.getElementById("kittens")


  // if(kittens.color == 'happy'){
  //   kittens.img = kittenImg.happyKitten
  //   kittens.mood = kittens.color
  // }
  // if(kittens.color == 'tolerant'){
  //   kittens.img = kittenImg.neutralKitten
  //   kittens.mood = currentColor
  // }
  // if(kittens.color == 'angry'){
  //   kittens.img = kittenImg.madKitten
  //   kittens.mood = kittens.color
  // }

  let template = "";
console.log(kittenData)

// TODO working on moood being affected by color

kittenData.forEach( kitten => {
    template += `
    
    <div id="kittenCard" class="container m-3">

    <div class="p-1 kitten   " >
    <img  src="${kitten.img}" height="170px"  /> 
    </div>

    <div class="p-1">
    <h3 class="mt-1 mb-1">Name: ${kitten.name}</h3>
    <h3 class="mt-1 mb-1">Mood: ${kitten.mood}</h3>
    <h3 class="mt-1 mb-1">Affection: ${kitten.affection}</h3>
    </div>


    <div class="buttonLook">
      <button onclick="petKitten()" class="pet_Button">
        Pet
      </button>
      <button onclick="catnip()" class="catnip_button">
      CatNip
    </button>
    </div>

    </div>
    
    `
  })

  kittensElement.innerHTML = template


//   <button onclick="clearKittens()" class="catnip_button"> 
//   Release All
// </button>


}




/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {

  console.log("Searching Kittens: " , id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {



}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {


  console.log("Feeding Catnip: ", id);
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {




}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  console.log("Clearing kitten")
  localStorage.clear();
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove()
  console.log('Good Luck, Take it away')


  loadKittens()

}

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()
