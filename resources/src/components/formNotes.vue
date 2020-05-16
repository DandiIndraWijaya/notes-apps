<template>
    <div class="formnote">
        <form>
            <div class="menu">
                <button @click="deleteNote" type="button" class="bg-danger btn btn-delete">Delete</button>
                <button @click="submitSave" type="button" class="bg-success btn" v-if="mode == 'save'">Save</button>
                <button @click="submitUpdate" type="button" class="bg-success btn" v-if="mode == 'update'">Update</button>
            </div>

            <div class="content">
                <input type="text" class="text" placeholder="id" v-model="id">
                <input type="text" placeholder="Title" class="text" v-model="title">
                <textarea class="text textarea" placeholder="Tuliskan rencana kamu..." v-model="description"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'FormNotes',
    props: {
        propSaveNote : {
            type: Function
        },
        propUpdateNote : {
            type: Function
        },
        propDataForm : {
            type: Object
        },
        propDeleteNote : {
            type: Function
        }
    },
    data: function(){
        return{
            id: 0,
            title: '',
            description: '',
            mode: 'save'
        }
    },
    methods: {
        submitSave(){
            let params = new URLSearchParams;
            params.append('title', this.title);
            params.append('description', this.description);

            axios.post('http://localhost/notes-apps/note/create/', params).then(response => {
                let data = {id: response.data.id, title: this.title, description: this.description};
                this.$root.$emit('emitSaveNote', data);
            })
        },
        submitUpdate(){
            let params = new URLSearchParams;
            params.append('id', this.id);
            params.append('title', this.title);
            params.append('description', this.description);

            axios.post('http://localhost/notes-apps/note/update/', params).then(response => {
                let data = {id: response.data.id, title: this.title, description: this.description}
                this.$root.$emit('emitUpdateNote', data);
            })        
        },
        deleteNote(){
            if(this.id != 0){
            let params = new URLSearchParams;
            params.append('id', this.id);

                axios.post('http://localhost/notes-apps/note/delete/', params).then(response => {
                    let data = {id: response.data.id}
                    this.$root.$emit('emitDeleteNote', data);
                    this.resetInput();
                })
            }   
        },
        resetInput(){
            this.id = 0;
            this.title = '';
            this.description = '';
        }
    },

    mounted(){
        this.$root.$on('emitForm', data => {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.mode = data.mode;
        });
        this.$root.$on('emitNewNote', data => {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.mode = 'save';
        });
       

    }
}
</script>
<!--fssfs -->
<style>
.menu{
     background: #f7f7f7;
     padding:10px 25px;
     margin-bottom: 25px;
     text-align:right;
     border-bottom: 1px solid #e8e6e6;
}
.btn-delete{ margin-right:10px; }
.content{
     padding: 0px 25px;
}
.text{
     display: block;
     width: 100%;
     padding: 0px;
     font-size: 20px;
     font-weight: bold;
     color: #2c3e50;
     border: none;
     margin-bottom: 10px;
     box-sizing: border-box;
     outline: none;
}
.textarea{
     min-height: 350px;
     font-size: 15px;
     font-weight: lighter;
     line-height: 30px;
}
.loader{
     vertical-align: middle;
}
</style>