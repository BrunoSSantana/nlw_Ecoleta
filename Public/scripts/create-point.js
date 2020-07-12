//Dados da Entidade - Implementação API IBGE - Estados/Cidades
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() } )
    .then( states => {

        for ( state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json() } )
    .then( cities => {

        for( city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Ítens de Coleta

//pegar todos os "<li>"

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


// este "event" está referenciando o evento "click" do "for" acima
function handleSelectedItem(event) {
    //adicionar o remover um classe com JS
    const itemLi = event.target
    
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //verificar se existem itens selecionados
    //se sim, pegr os itens selecionaods
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound
    })

    //evento aconteceu => se já estiver selecionado
    if(alreadySelected >= 0 ) {
        //tirar da seleção
        const filtereditems = selectedItems.filter( item => {
            const itemIsDifferet = item != itemId//false
            return itemIsDifferet
        })

        selectedItems = filtereditems
    } else {

        //evento aconteceu => se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)

    }

    //console.log('selectedItems: ', selectedItems)
    //atualizar os campos escondidos com os dados selecioandos
    collectedItems.value = selectedItems
}