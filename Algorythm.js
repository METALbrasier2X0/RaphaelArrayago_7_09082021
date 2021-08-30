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

function set_value(value){

ustensiles_input.value = value;
search_ustensil(recipes, ustensiles_input.value); 

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
    list_item_ustensils.setAttribute("onclick", 'set_value("'+uniquelist[i]+'" )' ); 
    ustensiles.appendChild(list_item_ustensils);
  }
}

ustensiles_input.onchange = function() { search_ustensil(recipes, ustensiles_input.value); };
ustensiles_input.oninput = function() { autocomplete(recipes, ustensiles_input.value); };

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
function autocomplete(source_list, val){

var list = set_ustensil_list(source_list)
let complete_list = []
 for (i = 0; i < list.length; i++) {
if (list[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

complete_list.push(list[i])

} }
console.log(complete_list);
 set_ustensil(complete_list);

}
