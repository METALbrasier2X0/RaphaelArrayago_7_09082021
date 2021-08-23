// Valeurs du DOM
const recipe_list = document.getElementById("recipe_list");


// Fonctions pour isntantier les element html
function Recipe_set(content){

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
          console.log(ingredients);
          ingredients.forEach((ingredient, i) => {
            if (ingredient.quantity == undefined) {
              ingredient.quantity = " "
            }
            if (ingredient.unit == undefined) {
              ingredient.unit = " "
            }
            let ingredient_li = document.createElement("li"); ingredient_li.innerHTML = '<strong>'+ingredient.ingredient+'</strong> :'+ingredient.quantity+' '+ingredient.unit+''
            list.appendChild(ingredient_li);
            console.log(ingredient);
          });
          caption.appendChild(caption_head); caption.appendChild(caption_content); selection.appendChild(caption); list_item.appendChild(selection);  recipe_list.appendChild(list_item);}


}

Recipe_set(recipes)

// Algorythm
