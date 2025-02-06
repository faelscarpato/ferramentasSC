// bloco-notas.js

const noteText = document.getElementById('noteText');
const newNoteButton = document.getElementById('newNote');
const saveNoteButton = document.getElementById('saveNote');
const deleteNoteButton = document.getElementById('deleteNote');
const noteList = document.getElementById('noteList');

let notes = JSON.parse(localStorage.getItem('notes')) || []; //Carrega as notas do armazenamento local

let selectedNoteIndex = -1; // Não tem nota selecionada

renderNotes();

// Função para criar uma nova nota
function createNewNote() {
    noteText.value = '';  //Limpar o campo de texto
    selectedNoteIndex = -1;
     noteText.focus();  //Colocar o foco
}

//Evento do botao nova nota
newNoteButton.addEventListener('click', createNewNote)
// Função salvar a nota
function saveNote(){
    const text = noteText.value;

      if (!text.trim()) {
        alert('Por favor, escreva algo na nova nota.');
        return;
     }

    if(selectedNoteIndex >= 0){
        notes[selectedNoteIndex] = text;
    } else {
        notes.push(text);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
     selectedNoteIndex = -1; //Limpa a selecao
    renderNotes();
}

saveNoteButton.addEventListener('click', saveNote);
// Funcao para apagar
function deleteNote() {

    if (selectedNoteIndex === -1 && noteText.value.trim().length === 0) { // Sem nota selecionada
        alert("Selecione uma nota para excluir ou escreva na área de texto para apagar o conteúdo!");
        return;
    }



    if (selectedNoteIndex >= 0 && confirm("Tem certeza que deseja excluir esta nota?")) {
        notes.splice(selectedNoteIndex, 1);  //Remove no array
        selectedNoteIndex = -1; // nao tem mais nota selecionada
    } else {
        noteText.value = ""; // SE nao tiver nota selecionada, apenas apaga a tela
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(); //Atualiza a lista
}

//Ativa funcao para apagar a nota ao clicar
deleteNoteButton.addEventListener('click', deleteNote);

// Função para exibir as notas na lista
function renderNotes() {
    noteList.innerHTML = ''; //Limpa a lista
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = note;
        listItem.addEventListener('click', () => {
             noteText.value = note;
                selectedNoteIndex = index;
        });
        noteList.appendChild(listItem);
    });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})