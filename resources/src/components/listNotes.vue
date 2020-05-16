<template>
    <div class="listNotes">
        <ul>
            <li v-for="(row, index) in notes" :key="index">
                <button @click="editNote(row.id)" class="btn-note">
                    <label>{{ row.title }}</label>
                    <span>{{ row.description }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'listNotes',
    data: function(){
        return {
             notes: []
        }
    },
    methods: {
        editNote(id){
            let dataform = this.notes.find(note => note.id === id);
            dataform.mode = 'update';
            this.$root.$emit('emitForm', dataform);
        },
        getData(){
            axios.get('http://localhost/notes-apps/note').then(response => this.notes = response.data);
        }
    },
    mounted(){
        this.getData();
        this.$root.$on('emitDeleteNote', data => {
            let noteIndex = this.notes.findIndex(note => note.id == data.id);
            this.notes.splice(noteIndex, 1);
        });
        this.$root.$on('emitUpdateNote', data => {
            let noteIndex = this.notes.findIndex(note => note.id == data.id);
            this.notes[noteIndex].title = data.title;
            this.notes[noteIndex].description = data.description;
        });
        this.$root.$on('emitSaveNote', data => {
            let newNote = {id: data.id,'title' : data.title, 'description' : data.description};
            this.notes.unshift(newNote);
            this.editNote(data.id);
            
        });
    }
  
}
</script>

<style>
ul{
    list-style-type: none;
    padding: 0;
    margin: 0px;
}

.btn-note{
    text-align: left;
    border: none;
    border-bottom: 1px solid gainsboro;
    padding: 0px 15px;
    cursor: pointer;
    outline: none;
    background: #f7f7f7;
    height: 150px;
    width: 100%;
}

.btn-note:hover{
    background: #eaeaea;
}

.btn-note label{
    display: block;
    color: #444444;
    font-size: 20px;
    margin-bottom: 15px;
}

.btn-note span{
    color: #545454;
}
</style>