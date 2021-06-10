<template>
  <v-app>
    <v-app-bar app dark color="blue">
      <v-toolbar-title>Área de cadastro</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title> Faça seu cadastro</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="nome"
            label="Nome"
            prepend-icon="mdi-account-circle"
            id="field_nome"
            required
          />
          <v-text-field
            counter="14"
            v-model="cpf"
            v-mask="['###.###.###-##']"
            label="Cpf"
            prepend-icon="mdi-badge-account-horizontal-outline"
            id="field_cpf"
          />
          <v-text-field
            v-model="endereco"
            label="Endereço completo"
            prepend-icon="mdi-home"
            id="field_endereco"
          />


          <v-text-field
            v-mask="['(##)####-####']"
            counter="13"
            v-model="telefone"
            label="Telefone"
            prepend-icon="mdi-cellphone-basic"
            id="field_telefone"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="create()" color="success">Registrar</v-btn>
          <v-btn @click="logar()" color="info">Logar</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>

    <template>
      <v-footer dark padless>
        <v-card class="flex" flat tile>
          <v-card-title class="teal">
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-footer> </template
  ></v-app>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>

<script>
// Local Component
import { mask } from "vue-the-mask";
const url = "http://localhost:4001/login";
const axios = require("axios");
import api from "../service/api";

export default {
  directives: { mask },

  methods: {
    create() {
      let filter_nome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
      if (!filter_nome.test(document.getElementById("field_nome").value)) {
        document.getElementById("field_nome").value = "";
        document.getElementById("field_nome").placeholder = "Nome inválido";
        document.getElementById("field_nome").style.borderColor = "#ff0000";
        document.getElementById("field_nome").style.outline = "#ff0000";
        document.getElementById("field_nome").focus();
        document.getElementById("field_nome");
        return false;
      } else {
        document.getElementById("field_nome").placeholder = "Nome Válido";
      }

      if (navigator.onLine) {
        if (!this.nome) {
          bootbox.alert("O nome é obrigatório.");
        }
        if (!this.cpf) {
          bootbox.alert("O cpf é obrigatório.");
        }
        if (!this.endereco) {
          bootbox.alert("Envie seu endereço.");
        }
        if (!this.telefone) {
          bootbox.alert("Cadastre seu telefone.");
        }

        if (this.nome && this.cpf && this.endereco && this.telefone) {
          fetch(
            `https://rest-my-app.herokuapp.com/create?nome=${this.nome}&cpf=${this.cpf}&endereco=${this.endereco}&telefone=${this.telefone}`
          )
            .then((response) => response.json())
            .catch(function () {
              alert("Cpf já foi registrado.");
            })
            .then((json) => console.log(json));
          bootbox.alert("Cliente cadastrado!");

          let usuarios = JSON.parse(localStorage.getItem("armazenado"));
          usuarios.push({
               nome: this.nome,
            cpf: this.cpf,
            endereco: this.endereco,
            telefone: this.telefone,
          })

          localStorage.setItem("armazenado", JSON.stringify(usuarios));
      
        }
      } else {
        alert("Você está offline. Faça seu login.");
      }
    },

    async logar() {
      const { nome, cpf, endereco, telefone } = this;
      console.log({ nome, cpf, endereco, telefone });

      if (navigator.onLine) {
        if (!this.cpf) {
          bootbox.alert("O cpf é obrigatório.");
        }
        await api
          .get(
            `https://rest-my-app.herokuapp.com/login?nome=${this.nome}&cpf=${this.cpf}&endereco=${this.endereco}&telefone=${this.telefone}`
          )
          .then((json) => {
            if (json.data.length !== 0) {
              localStorage.setItem("dados", JSON.stringify(json.data));
              location = "https://telacadastro.000webhostapp.com/#/cadastrar";
            } else {
              bootbox.alert("Esse cpf não foi registrado!");
            }
            localStorage.setItem("lista", JSON.stringify(json.data));
          });
      } else {
        if (!this.cpf) {
          alert("O cpf é obrigatório.");
        }

        let mostrar = JSON.parse(localStorage.getItem("armazenado"));
        // let ver = JSON.parse(localStorage.getItem("date"));
        // let n = 0;

        if (mostrar[0].cpf == this.cpf) {
            location = "https://telacadastro.000webhostapp.com/#/cadastrar";
          }

        // while (n <= ver.length) {
        //   n++;
        //   if (ver[n].cpf == this.cpf) {
        //     location = "https://telacadastro.000webhostapp.com/#/cadastrar";
        //   }
        //   break;
        // }

        for (let i = 0; i <= mostrar.length; i++) {
          if (mostrar[i].cpf == this.cpf) {
            location = "https://telacadastro.000webhostapp.com/#/cadastrar";
          }
        }
      }
    },
  },

  data() {
    return {
      c: 0,
      desserts: [],
      tentativas: [],
      atualizada: [],
      showPassword: false,
      nome: "",
      cpf: "",
      endereco: "",
      telefone: "",
    };
  },
};
</script>


