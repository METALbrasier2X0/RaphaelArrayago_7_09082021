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
addtag(value, functioncalled);
input.value = '';

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
}

let source_result = {}

source_result = recipes

function final_list() {


if (tag_list.length == 0) {Recipe_set(recipes); return source_result}


 switch (tag_list[0].type) {

    case 'ingredient':
    search_ingredient(recipes, tag_list[0].name)
    source_result = search_ingredient(recipes, tag_list[0].name)
    break;

    case 'appareil':
    search_appareil(recipes, tag_list[0].name)
    source_result = search_appareil(recipes, tag_list[0].name)
    break;

     case 'ustensiles':
    search_ustensil(recipes, tag_list[0].name)
    source_result = search_ustensil(recipes, tag_list[0].name)
    break;
     } 

    for (let i = 1; i < tag_list.length; i++) {

       switch (tag_list[i].type) {

    case 'ingredient':
    search_ingredient(source_result, tag_list[i].name)
    source_result = search_ingredient(source_result, tag_list[i].name)
    
    break;

    case 'appareil':
    search_appareil(source_result, tag_list[i].name)
    source_result = search_appareil(source_result, tag_list[i].name)

    break;

     case 'ustensiles':
    search_ustensil(source_result, tag_list[i].name)
    source_result = search_ustensil(source_result, tag_list[i].name)

    break;
     }
  
} 
console.log(source_result)
return source_result

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
    list_item_ustensils.setAttribute("onclick", 'set_value("'+uniquelist[i]+'", '+'ustensiles_input'+', '+'"ustensiles"'+' )' ); 
    ustensiles.appendChild(list_item_ustensils);
  }
}

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

return source_result
}