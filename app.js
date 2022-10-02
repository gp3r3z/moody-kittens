let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */



let  welcomeElem =  document.getElementById("welcome")

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
    img: kittenImg.neutralKitten

  }

  console.log("Creating new kitten: ", newKitten)

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

  
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  console.log("Loading kittens")

 
  console.log("Checking if array is empty: \n  ", kittens )

  if (kittens.length !== 0) { 
    
    console.log("Kitten data present saving to the array \n "  , "Array: \n", kittens,  "\n LocalStorage: \n", kittens,)

    if (document.getElementById("welcome")) {
      
      welcomeElem.style.display = "none"

    }

   console.log("Kittens array updated")
    drawKittens(kittens)

  } else {
    console.log("No data loaded")
    welcomeElem.removeAttribute('style')
    drawKittens(kittens)

  }


}



/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens(kittens) {

  console.log("drawing kittens...")

  let kittensElement = document.getElementById("kittens")
  let template = ""
  
// setKittenMood(kittens)


  console.log("Checking data" , kittens)


  kittens.forEach(kitten => {
    template += `
    
    <div id="kittenCard" class="container m-3">

    <div class="p-1 kitten ${kitten.mood}  " >
    <img  src="${kitten.img}" height="170px"  /> 
    </div>

    <div class="p-1">
    <h3 class="mt-1 mb-1">Name: ${kitten.name}</h3>
    <h3 class="mt-1 mb-1">Mood: ${kitten.mood}</h3>
    <h3 class="mt-1 mb-1">Affection: ${kitten.affection}</h3>
    </div>


    <div class="buttonLook">
      <button onclick=pet('${kitten.id}') class="pet_Button">
        Pet
      </button>
      <button onclick=catnip('${kitten.id}') class="catnip_button">
      CatNip
    </button>

    <audio id="meow-sound" src="catMeow.mp3"></audio>
    </div>

    </div>
    
    `
  })

  kittensElement.innerHTML = template

}




/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {

 const index = kittens.findIndex(kitten => kitten.id === id)

  console.log("Searching For kitten: \n ", kittens[index])

  return kittens[index]


  
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

     let foundKitten = findKittenById(id)


  // document.getElementById("meow-sound").play()


  // TODO working on edditing rando Number 



  console.log("Petting Cat", foundKitten.name)

  let randoNumber = Math.floor(Math.random())

  if (randoNumber > .5 ){
    console.log("Kitten affection increating")

 foundKitten.affection++ 
 console.log('Kitten mood changed', foundKitten);

   
  }else{
     

 foundKitten.affection--

    console.log('Kitten mood changed', foundKitten);

  }
  saveKittens()

}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  console.log("Giving a cat canip")

  document.getElementById("meow-sound").play()


}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {


  if (kitten.mood == 'happy') {
    kitten.img = kittenImg.happyKitten
  
  }
  if (kitten.mood == 'tolerant') {
    kitten.img = kittenImg.neutralKitten
  
  }
  if (kitten.mood == 'angry') {
    kitten.img = kittenImg.madKitten
  
  }




}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  console.log("Clearing kitten")
  kittens.splice(0)

  console.log(kittens , " Data successfully cleared")
  saveKittens()
 
}


/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {

  

  console.log('Good Luck, Take it away')


  loadKittens()

  welcomeElem.style.display = "none"

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
