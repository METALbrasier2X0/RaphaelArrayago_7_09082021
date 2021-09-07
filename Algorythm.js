// Valeurs du DOM
const recipe_list = document.getElementById("recipe_list");


// Fonctions pour isntantier les element html
function Recipe_set(content){

          recipe_list.innerHTML = "";

          for (var i = 0; i < content.length; i++){

          let recipe = content[i];
          let list_item = document.createElement("div"); list_item.classList.add ("col-12", "col-md-4", "recipe_list_item");
          let selection = document.createElement("div"); selection.classList.add ("recipe_list_item_selection");
          let caption = document.createElement("div"); caption.classList.add ("recipe_list_item_selection_caption");
          let caption_head = document.createElement("div"); caption_head.classList.add ("recipe_list_item_selection_caption_head");
          let caption_content = document.createElement("div"); caption_content.classList.add ("recipe_list_item_selection_caption_content");

          let title = document.createElement("h3"); title.innerHTML = recipe.name;
          let time = document.createElement("p");  time.innerHTML = '<i class="far fa-clock"></i> '+recipe.time+" min"; time.classList.add ("recipe_list_item_selection_caption_head_temps");
          caption_head.appendChild(title); caption_head.appendChild(time);

          let list = document.createElement("ul");
          let description = document.createElement("p"); description.innerHTML = recipe.description;
          caption_content.appendChild(list); caption_content.appendChild(description);
          let ingredients = recipe.ingredients;
          ingredients.forEach((ingredient, i) => {
            if (ingredient.quantity == undefined) {
              ingredient.quantity = " "
            }
            if (ingredient.unit == undefined) {
              ingredient.unit = " "
            }
            let ingredient_li = document.createElement("li"); ingredient_li.innerHTML = '<strong>'+ingredient.ingredient+'</strong> :'+ingredient.quantity+' '+ingredient.unit+''
            list.appendChild(ingredient_li);
          });
          caption.appendChild(caption_head); caption.appendChild(caption_content); selection.appendChild(caption); list_item.appendChild(selection);  recipe_list.appendChild(list_item);}


}

Recipe_set(recipes)

// Algorythm de recherche

function set_value(value, input, functioncalled){

input.value = value;
functioncalled(recipes, input.value); 

}  



function autocomplete(source_list, val, set_function_list, set_function){

var list = set_function_list(source_list)
let complete_list = []
 for (i = 0; i < list.length; i++) {
if (list[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

complete_list.push(list[i])

} }
console.log(complete_list);
 set_function(complete_list);

}


/*Set et Cherche ustensiles*/


const ustensiles_input = document.getElementById("ustensiles-input")
let ustensiles = document.getElementById("ustensiles")


set_ustensil_list()

function set_ustensil_list(){

  let source_result = [];

  for (var i = 0; i < recipes.length; i++){

    let current_item = recipes[i]


    for(let i = 0; i < current_item.ustensils.length; i++){
      source_result.push(current_item.ustensils[i])
    }
  }
  let uniquelist = [...new Set(source_result)];

  set_ustensil(uniquelist);

    return uniquelist;
}

function set_ustensil(uniquelist){
  ustensiles.innerHTML = "";
  for (i = 0; i < uniquelist.length; i++) {
    let list_item_ustensils = document.createElement("a"); list_item_ustensils.classList.add ("dropdown-item");
    list_item_ustensils.innerHTML = uniquelist[i];
    list_item_ustensils.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'ustensiles_input'+', '+'search_ustensil'+' )' ); 
    ustensiles.appendChild(list_item_ustensils);
  }
}

ustensiles_input.onchange = function() { search_ustensil(recipes, ustensiles_input.value); };
ustensiles_input.oninput = function() { autocomplete(recipes, ustensiles_input.value, set_ustensil_list, set_ustensil ); };

function search_ustensil(source_list, name){

  let source_result = [];

  for (var i = 0; i < source_list.length; i++){

    let current_item = source_list[i]

    for(let i = 0; i < current_item.ustensils.length; i++){
    if(current_item.ustensils[i] === name){
      source_result.push(current_item)
    }
  }
  Recipe_set(source_result)
}

}


/*Set et Cherche appareil*/


const appareil_input = document.getElementById("appareil-input")
let appareil = document.getElementById("appareil")

function set_appareil_list(){

  let source_result = [];

  for (var i = 0; i < recipes.length; i++){

    let current_item = recipes[i]

      source_result.push(current_item.appliance)
  }
  let uniquelist = [...new Set(source_result)];
  set_appareil(uniquelist);

    return uniquelist;
}

function set_appareil(uniquelist){
  appareil.innerHTML = "";
  for (i = 0; i < uniquelist.length; i++) {
    let list_item_appareil = document.createElement("a"); list_item_appareil.classList.add ("dropdown-item");
    list_item_appareil.innerHTML = uniquelist[i];
    list_item_appareil.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'appareil_input'+', '+'search_appareil'+' )' ); 
    appareil.appendChild(list_item_appareil);
  }
}

set_appareil_list()

appareil_input.onchange = function() { search_appareil(recipes, appareil_input.value); };
appareil_input.oninput = function() { autocomplete(recipes, appareil_input.value, set_appareil_list, set_appareil); };

function search_appareil(source_list, name){

  let source_result = [];

  for (var i = 0; i < source_list.length; i++){

    let current_item = source_list[i]

    if(current_item.appliance === name){
      source_result.push(current_item)
    }
  
  Recipe_set(source_result)
}

}


/*Set et Cherche ingredient*/


const ingredient_input = document.getElementById("ingredient-input")
let ingredient = document.getElementById("ingredient")

set_ingredient_list()

function set_ingredient_list(){

  let source_result = [];

  for (var i = 0; i < recipes.length; i++){

    let current_item = recipes[i]


    for(let i = 0; i < current_item.ingredients.length; i++){
      source_result.push(current_item.ingredients[i].ingredient)
    }
  }
  let uniquelist = [...new Set(source_result)];

  set_ingredient(uniquelist);

    return uniquelist;
}

function set_ingredient(uniquelist){
  ingredient.innerHTML = "";
  for (i = 0; i < uniquelist.length; i++) {
    let list_item_ingredient = document.createElement("a"); list_item_ingredient.classList.add ("dropdown-item");
    list_item_ingredient.innerHTML = uniquelist[i];
    list_item_ingredient.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'ingredient_input'+', '+'search_ingredient'+' )' ); 
    ingredient.appendChild(list_item_ingredient);
  }
}


ingredient_input.onchange = function() { search_ingredient(recipes, ingredient_input.value); };
ingredient_input.oninput = function() { autocomplete(recipes, ingredient_input.value, set_ingredient_list, set_ingredient); };

function search_ingredient(source_list, name){

  let source_result = [];

  for (var i = 0; i < source_list.length; i++){

    let current_item = source_list[i]

    for(let i = 0; i < current_item.ingredients.length; i++){
    if(current_item.ingredients[i].ingredient === name){
      source_result.push(current_item)
    }
  }
  Recipe_set(source_result)
}


}

/*Set et Cherche repas par la barre principal*/



const plat = document.getElementById("search")


plat.onchange = function() { autocomplete_name(recipes, plat.value); };
plat.oninput = function() { autocomplete_name(recipes, plat.value); };


function autocomplete_name(source_list, val){

let complete_list = []
 for (i = 0; i < source_list.length; i++) {
if (source_list[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {

complete_list.push(source_list[i])

} }

 Recipe_set(complete_list);

}
