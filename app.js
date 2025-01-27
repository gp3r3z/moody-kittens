let kittens = []

let welcomeElem = document.getElementById("welcome")

const kittenImg = {
  neutralKitten: './neutral_kitten.png',
  happyKitten: './happy_kitten.png',
  madKitten: './mad_kitten.png',

}
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */


function addKitten(event) {

  event.preventDefault()
  let form = event.target
  let isdup = false;
  console.log("Adding Kitten")


  let newKitten = {
    id: generateId(),
    name: form.name.value,
    mood: 'tolerant',
    affection: 5,
    img: kittenImg.neutralKitten

  }


  if (kittens.length) {
    let isdup = false
    console.log("Checking if value is duplicate")

    for (i in kittens) {
      console.log("Checking Array if duplicate is present", kittens[i])
      if (kittens[i].name === newKitten.name) {


        alert("Kitten already exists")
        isdup = true
        console.log("Duplicate Status: ", isdup)
        break

      }


    }

    if (!isdup) {
      console.log("Kitten added", isdup)
      kittens.push(newKitten)
      saveKittens()
    }
    else {
      alert("Please enter another name not used!")

    }

  }

  else {
    kittens.push(newKitten)
    console.log("First Kitten added")
    console.log("Sucessfully added kitten")
    saveKittens()
  }
  form.reset()


}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {

  console.log("Saving Kitten Changes")

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


  console.log("Checking if localstorage is empty: \n  ", kittenData)
  console.log("Checking type ", typeof (kittenData))

  if (!kittenData) {
    kittens = []
    console.log("No data loaded")

    drawKittens(kittens)

    welcomeElem.removeAttribute('style')

  } else {

    if (document.getElementById("welcome")) {

      welcomeElem.style.display = "none"

    }

    kittens = kittenData

    console.log("Data found in localStorage \n Loading to the array \n", "LocalStorage: \n", kittenData, "\n Array: \n", kittens,)

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

    </div>

    </div>
    
    `
  })

  kittensElement.innerHTML = template
  console.log("Kitten elements drawn")

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


  console.log("Petting Cat", foundKitten.name)

  let randoNumber = Math.random().toFixed(2)


  console.log(randoNumber)
  if (randoNumber > .5) {
    console.log("Kitten affection increasing")

    foundKitten.affection++
    console.log('Kitten affection changed', foundKitten.affection);


  } else {


    foundKitten.affection--

    console.log('Kitten affection changed', foundKitten);


  }

  setKittenMood(foundKitten)
  saveKittens()

}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {

  let foundKitten = findKittenById(id)
  document.getElementById("meow-sound").play()

  console.log("Giving ", foundKitten.name, " catnip ")
  foundKitten.mood = 'tolerant'
  foundKitten.affection = 5

  setKittenMood(foundKitten)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {


  console.log("Setting kittens mood ", kitten)

  if (kitten.affection >= 6) {
    kitten.img = kittenImg.happyKitten
    kitten.mood = 'happy'

  }
  if (kitten.affection == 5) {
    kitten.img = kittenImg.neutralKitten
    kitten.mood = 'tolerant'

  }
  if (kitten.affection <= 4) {
    kitten.img = kittenImg.madKitten
    kitten.mood = 'angry'

  }
  if (kitten.affection == 0) {
    kitten.mood = 'gone'

  }


  console.log("Kitten object updated", kitten)



}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  console.log("Clearing kitten")


  kittens = null


  console.log(kittens, " Data successfully cleared")
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
