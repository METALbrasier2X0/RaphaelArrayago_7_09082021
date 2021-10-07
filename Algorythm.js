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

let updated_result = {}

updated_result = recipes;

function set_value(value, input, functioncalled){

input.value = value;
addtag(value, functioncalled);
input.value = '';

}  



function autocomplete(source_list, val, set_function_list, set_function){

var list = set_function_list(source_list)
let complete_list = []
 for (i = 0; i < list.length; i++) {
if (list[i].toLowerCase().indexOf(val.toLowerCase())  > -1) {

complete_list.push(list[i])

} }
 set_function(complete_list);

}


/*Set et Cherche ustensiles*/


const ustensiles_input = document.getElementById("ustensiles-input")
let ustensiles = document.getElementById("ustensiles")


set_ustensil_list()

function set_ustensil_list(){

  let source_result = [];

  for (var i = 0; i < updated_result.length; i++){

    let current_item = updated_result[i]


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
    list_item_ustensils.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'ustensiles_input'+', '+'"ustensiles"'+' )' ); 
    ustensiles.appendChild(list_item_ustensils);
  }
}

ustensiles_input.oninput = function() { autocomplete(updated_result, ustensiles_input.value, set_ustensil_list, set_ustensil ); };

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

return source_result
}


/*Set et Cherche appareil*/


const appareil_input = document.getElementById("appareil-input")
let appareil = document.getElementById("appareil")

function set_appareil_list(){

  let source_result = [];

  for (var i = 0; i < updated_result.length; i++){

    let current_item = updated_result[i]

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
    list_item_appareil.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'appareil_input'+', '+'"appareil"'+' )' ); 
    appareil.appendChild(list_item_appareil);
  }
}

set_appareil_list()

appareil_input.oninput = function() { autocomplete(updated_result, appareil_input.value, set_appareil_list, set_appareil); };

function search_appareil(source_list, name){

  let source_result = [];

  for (var i = 0; i < source_list.length; i++){

    let current_item = source_list[i]

    if(current_item.appliance === name){
      source_result.push(current_item)
    }
  
  Recipe_set(source_result)
}
return source_result
}


/*Set et Cherche ingredient*/


const ingredient_input = document.getElementById("ingredient-input")
let ingredient = document.getElementById("ingredient")

set_ingredient_list()

function set_ingredient_list(){

  let source_result = [];

  for (var i = 0; i < updated_result.length; i++){

    let current_item = updated_result[i]


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
    list_item_ingredient.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'ingredient_input'+', '+'"ingredient"'+' )' ); 
    ingredient.appendChild(list_item_ingredient);
  }
}

ingredient_input.oninput = function() { autocomplete(updated_result, ingredient_input.value, set_ingredient_list, set_ingredient); };

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

return source_result
}

/*Set et Cherche repas par la barre principal*/



const plat = document.getElementById("search")


function autocomplete_name(source_list, val){

let complete_list = []
 for (i = 0; i < source_list.length; i++) {
if (source_list[i].name.toLowerCase().indexOf(val.toLowerCase())  > -1 || source_list[i].description.toLowerCase().indexOf(val.toLowerCase())  > -1) {

complete_list.push(source_list[i])

} }
  
  updated_result = complete_list;
  set_ingredient_list();
  set_ustensil_list();
  set_appareil_list();
 Recipe_set(complete_list);

return updated_result ;
}

 let tag_list =  []

function addtag(name, type){

  let tag_item = {
  name: name,
  type: type, };

  tag_list.push(tag_item)

  let tag = document.createElement("div"); tag.classList.add ("btn", type);
  tag.innerHTML = name
  let close_button = document.createElement("i"); close_button.classList.add ("far", "fa-times-circle"); close_button.id = "close_button"; close_button.value = name
  close_button.setAttribute("onclick", 'removetag(this)'); 
  document.getElementById("tags-list").appendChild(tag);


  tag.appendChild(close_button);

   final_list();
   return tag_list;
 

}

function removetag(e){

  let value = e.value;

  tag_list = tag_list.filter(b => b.name !== value);
  e.parentNode.parentNode.removeChild(e.parentNode);
  final_list();
  set_ingredient_list()
  set_ustensil_list()
  set_appareil_list()
}



function final_list() {


if (tag_list.length == 0) {Recipe_set(recipes); updated_result = recipes; return updated_result}


 switch (tag_list[0].type) {

    case 'ingredient':
    search_ingredient(recipes, tag_list[0].name)
    updated_result = search_ingredient(recipes, tag_list[0].name)
    break;

    case 'appareil':
    search_appareil(recipes, tag_list[0].name)
    updated_result = search_appareil(recipes, tag_list[0].name)
    break;

     case 'ustensiles':
    search_ustensil(recipes, tag_list[0].name)
    updated_result = search_ustensil(recipes, tag_list[0].name)
    break;
     } 

    for (let i = 1; i < tag_list.length; i++) {

       switch (tag_list[i].type) {

    case 'ingredient':
    search_ingredient(updated_result, tag_list[i].name)
    updated_result = search_ingredient(updated_result, tag_list[i].name)
    
    break;

    case 'appareil':
    search_appareil(updated_result, tag_list[i].name)
    updated_result = search_appareil(updated_result, tag_list[i].name)

    break;

     case 'ustensiles':
    search_ustensil(updated_result, tag_list[i].name)
    updated_result = search_ustensil(updated_result, tag_list[i].name)

    break;
     }
  
} 

set_ingredient_list()
set_ustensil_list()
set_appareil_list()
return updated_result

}

source_result = final_list();

plat.onchange = function() {source_result = final_list(); console.log(source_result); autocomplete_name(source_result, plat.value); };
plat.oninput = function() { source_result = final_list(); console.log(source_result);  autocomplete_name(source_result, plat.value); };