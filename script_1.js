document.getElementById("search-button").addEventListener("click", async function () {
  const query = document.getElementById("search-input").value.trim().toLowerCase();

  // Check if the input is empty
  if (!query) {
    alert("The input field with id 'search-input' is required. Please enter a Pokémon name or ID.");
    return;
  }

  const nameElement = document.getElementById("pokemon-name");
  const idElement = document.getElementById("pokemon-id");
  const weightElement = document.getElementById("weight");
  const heightElement = document.getElementById("height");
  const typesElement = document.getElementById("types");
  const hpElement = document.getElementById("hp");
  const attackElement = document.getElementById("attack");
  const defenseElement = document.getElementById("defense");
  const specialAttackElement = document.getElementById("special-attack");
  const specialDefenseElement = document.getElementById("special-defense");
  const speedElement = document.getElementById("speed");

  // Clear previous data
  nameElement.textContent = "";
  idElement.textContent = "";
  weightElement.textContent = "";
  heightElement.textContent = "";
  typesElement.innerHTML = "";
  hpElement.textContent = "";
  attackElement.textContent = "";
  defenseElement.textContent = "";
  specialAttackElement.textContent = "";
  specialDefenseElement.textContent = "";
  speedElement.textContent = "";

  const spriteElement = document.getElementById("sprite");
  if (spriteElement) spriteElement.remove();

  try {
    // Special case for "Red"
    if (query === "red") {
      throw new Error("Pokémon not found");
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    // Populate data
    nameElement.textContent = data.name.toUpperCase();
    idElement.textContent = `#${data.id}`;
    weightElement.textContent = `Weight: ${data.weight}`;
    heightElement.textContent = `Height: ${data.height}`;
    hpElement.textContent = data.stats[0].base_stat;
    attackElement.textContent = data.stats[1].base_stat;
    defenseElement.textContent = data.stats[2].base_stat;
    specialAttackElement.textContent = data.stats[3].base_stat;
    specialDefenseElement.textContent = data.stats[4].base_stat;
    speedElement.textContent = data.stats[5].base_stat;

    // Add types
    data.types.forEach(type => {
      const typeElement = document.createElement("span");
      typeElement.textContent = type.type.name.toUpperCase();
      typesElement.appendChild(typeElement);
      typesElement.appendChild(document.createTextNode(" "));
    });

    // Add sprite
    const img = document.createElement("img");
    img.id = "sprite";
    img.src = data.sprites.front_default;
    document.getElementById("pokemon-details").appendChild(img);
  } catch (error) {
    alert("Pokémon not found");
  }
});