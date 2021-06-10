<template>
  <v-app>
    <v-app-bar app dark color="blue">
      <v-spacer></v-spacer>
      <v-btn href="https://telacadastro.000webhostapp.com/#/" text rounded
        >Faça seu cadastro</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title> Veja suas informações </v-card-title>

        <template>
          <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ "Seus dados" }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              id="field_nome"
                              v-model="editedItem.nome"
                              label="Nome"
                              prepend-icon="mdi-account-circle"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              counter="14"
                              v-model="editedItem.cpf"
                              v-mask="['###.###.###-##']"
                              label="Cpf"
                              prepend-icon="mdi-badge-account-horizontal-outline"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.endereco"
                              label="Endereço"
                              prepend-icon="mdi-home"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              counter="13"
                              v-model="editedItem.telefone"
                              label="Telefone"
                              prepend-icon="mdi-cellphone-basic"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4"> </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Voltar
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Tem certeza que deseja excluir?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Voltar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm(item)"
                        >Sim</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="editItem(item)" small tile color="cyan">
                <v-icon left> mdi-pencil </v-icon>
                Alterar
              </v-btn>

              <v-btn @click="deleteItem(item)" small tile>
                <v-icon left> mdi-delete </v-icon>
                Deletar
              </v-btn>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary"> Reset </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-card>
      <v-card>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            href="https://telacadastro.000webhostapp.com/#/"
            depressed
            color="error"
          >
            Voltar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
    <v-card-title>Faça seu cadastro</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field
        type="text"
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
        required
      />
      <v-text-field
        v-model="endereco"
        label="Endereço completo"
        prepend-icon="mdi-home"
        id="field_endereco"
        required
      />

      <v-text-field
        v-mask="['(##)####-####']"
        counter="13"
        v-model="telefone"
        label="Telefone"
        prepend-icon="mdi-cellphone-basic"
        id="field_telefone"
        required
      />
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="create()" color="success">Registrar</v-btn>
    </v-card-actions>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.8/jquery.mask.js"></script>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  data: () => ({
    onLine: true,
    action: [],
    c: 0,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nome",
        value: "nome",
      },
      { text: "Cpf", value: "cpf" },
      { text: "Endereço", value: "endereco" },
      { text: "Telefone", value: "telefone" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    desserts: [],
    date: [],
    atualizada: [],
    tentativas: [],
    salvar: [],
    atualizar: [],
    adicionar: [],
    apagar: [],
    tentar: [],
    editedIndex: -1,

    id: "",
    nome: "",
    cpf: "",
    endereco: "",
    telefone: "",

    editedItem: {
      id: "",
      nome: "",
      cpf: 0,
      endereco: 0,
      telefone: 0,
    },
    defaultItem: {
      nome: "",
      cpf: 0,
      endereco: 0,
      telefone: 0,
    },
  }),

  watch: {
    onLine(v) {
      if (navigator.onLine) {
        JSON.parse(localStorage.getItem("atualizar")).forEach((v) => fetch(v));
        JSON.parse(localStorage.getItem("salvar")).forEach((v) => fetch(v));
        JSON.parse(localStorage.getItem("adicionar")).forEach((v) => fetch(v));
        JSON.parse(localStorage.getItem("apagar")).forEach((v) => fetch(v));
        JSON.parse(localStorage.getItem("tentar")).forEach((v) => fetch(v));

        fetch(`https://rest-my-app.herokuapp.com/read`)
          .then((response) => response.json())
          .then((json) => {
            this.desserts = json;
          });

        JSON.parse(localStorage.getItem("tentativas")).forEach((v) => fetch(v));

        if (v) {
          this.showBackOnline = true;
          setTimeout(() => {
            this.showBackOnline = false;
          }, 1000);
        }
      } else {
        let ver = JSON.parse(localStorage.getItem("date"));
        for (let i = 0; i <= ver.length; i++) {
          this.desserts.push({
            id: ver[i].id,
            nome: ver[i].nome,
            cpf: ver[i].cpf,
            endereco: ver[i].endereco,
            telefone: ver[i].telefone,
          });
        }

        JSON.parse(localStorage.getItem("date"));
        localStorage.setItem("date", JSON.stringify(this.desserts));
      }
    },

    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },

  created() {
    if (navigator.onLine) {
      fetch(`https://rest-my-app.herokuapp.com/read`)
        .then((response) => response.json())
        .then((json) => {
          this.desserts = json;
          localStorage.setItem("armazenado", JSON.stringify(this.desserts));
        });
      JSON.parse(localStorage.getItem("adicionar")).forEach((v) => fetch(v));
      JSON.parse(localStorage.getItem("atualizar")).forEach((v) => fetch(v));
      JSON.parse(localStorage.getItem("salvar")).forEach((v) => fetch(v));
      JSON.parse(localStorage.getItem("tentar")).forEach((v) => fetch(v));
      JSON.parse(localStorage.getItem("apagar")).forEach((v) => fetch(v));
    } else {
      let mostrar = JSON.parse(localStorage.getItem("armazenado"));
      for (let i = 0; i <= mostrar.length; i++) {
        this.desserts.push({
          id: mostrar[i].id,
          nome: mostrar[i].nome,
          cpf: mostrar[i].cpf,
          endereco: mostrar[i].endereco,
          telefone: mostrar[i].telefone,
        });
      }

      JSON.parse(localStorage.getItem("armazenado"));
      localStorage.setItem("armazenado", JSON.stringify(this.desserts));
    }
  },

  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
      if (navigator.onLine) {
         let ver = JSON.parse(localStorage.getItem("adicionar"));
         if(ver) {
        JSON.parse(localStorage.getItem("adicionar")).forEach((v) => fetch(v));
         }


          let mostrar = JSON.parse(localStorage.getItem("apagar"));
         if(mostrar) {
        JSON.parse(localStorage.getItem("apagar")).forEach((v) => fetch(v));
         }

           let apresentar = JSON.parse(localStorage.getItem("tentar"));
         if(apresentar) {
        JSON.parse(localStorage.getItem("tentar")).forEach((v) => fetch(v));
         }

        JSON.parse(localStorage.getItem("atualizar")).forEach((v) => fetch(v));
        JSON.parse(localStorage.getItem("salvar")).forEach((v) => fetch(v));
        // JSON.parse(localStorage.getItem("adicionar")).forEach((v) => fetch(v));
        // JSON.parse(localStorage.getItem("apagar")).forEach((v) => fetch(v));
        // JSON.parse(localStorage.getItem("tentar")).forEach((v) => fetch(v));
        localStorage.setItem("adicionar", []);
      }
    },

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

      if (navigator.onLine) {
        if (this.nome && this.cpf && this.endereco && this.telefone) {
          fetch(
            `https://rest-my-app.herokuapp.com/create?nome=${this.nome}&cpf=${this.cpf}&endereco=${this.endereco}&telefone=${this.telefone}`
          )
            .then((response) => response.json())
            .then((json) => {
              if (json.data.length !== 0) {
                bootbox.alert("Esse cpf já foi registrado!");
              }
              localStorage.setItem("lista", JSON.stringify(json.data));
            })

            .catch(() => {
              localStorage.getItem(
                "tentativas",
                JSON.stringify(this.tentativas)
              );
              this.c++;
              this.tentativas.push(
                `https://rest-my-app.herokuapp.com/create?nome=${this.nome}&cpf=${this.cpf}&endereco=${this.endereco}&telefone=${this.telefone}`
              );

              localStorage.setItem(
                "tentativas",
                JSON.stringify(this.tentativas)
              );
              localStorage.setItem("armazenado", JSON.stringify(this.desserts));
              localStorage.setItem("lista", JSON.stringify(this.desserts));
              JSON.parse(localStorage.getItem("tentativas")).forEach((v) =>
                fetch(v)
              );
            });

          this.desserts.push({
            id: this.id,
            nome: this.nome,
            cpf: this.cpf,
            endereco: this.endereco,
            telefone: this.telefone,
          });
          localStorage.setItem("armazenado", JSON.stringify(this.desserts));

          let mostrar = JSON.parse(localStorage.getItem("armazenado"));
          for (let i = 1; i <= mostrar.length; i++) {
            if (
              mostrar[i] &&
              mostrar[i].nome != undefined &&
              mostrar[i] != null &&
              mostrar[i] != ""
            ) {
              this.tentativas.push(
                `https://rest-my-app.herokuapp.com/add?nome=${mostrar[i].nome}&cpf=${mostrar[i].cpf}&endereco=${mostrar[i].endereco}&telefone=${mostrar[i].telefone}`
              );
            }
          }
          this.tentativas.forEach((v) => fetch(v));

          bootbox.alert("Cliente cadastrado.");
          location = "/";
        }
      } else {
        this.c++;

        this.desserts.push({
          id: "t" + this.c,
          nome: this.nome,
          cpf: this.cpf,
          endereco: this.endereco,
          telefone: this.telefone,
        });
        localStorage.setItem("lista", JSON.stringify(this.desserts));
        localStorage.setItem("armazenado", JSON.stringify(this.desserts));
        alert("Cliente adicionado com sucesso.");

        this.adicionar.push(
          `https://rest-my-app.herokuapp.com/create?nome=${this.nome}&cpf=${this.cpf}&endereco=${this.endereco}&telefone=${this.telefone}`
        );
        localStorage.setItem("adicionar", JSON.stringify(this.adicionar));

        if (this.nome && this.cpf && this.endereco && this.telefone) {
          this.tentativas.push(
            `https://rest-my-app.herokuapp.com/create?nome=${this.nome}&cpf=${this.cpf}&endereco=${this.endereco}&telefone=${this.telefone}`
          );
          localStorage.setItem("tentativas", JSON.stringify(this.tentativas));
          JSON.parse(localStorage.getItem("tentativas")).forEach((v) =>
            fetch(v)
          );
        }
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      if (navigator.onLine) {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
        fetch(
          `https://rest-my-app.herokuapp.com/delete?id=${this.editedItem.id}`
        );
        localStorage.setItem("lista", JSON.stringify(this.desserts));
        localStorage.setItem("armazenado", JSON.stringify(this.desserts));
        localStorage.setItem("date", JSON.stringify(this.date));
        localStorage.setItem("adicionar", JSON.stringify(this.desserts));
        localStorage.setItem("tentativas", JSON.stringify(this.desserts));
      } else {
        let lista = JSON.parse(localStorage.getItem("armazenado"));

        for (let i = 0; i < lista.length; i++) {
          if (lista[i].id == this.editedItem.id) {
            lista.splice(i, 1);
            this.desserts.splice(i, 1);

            this.closeDelete();
            localStorage.setItem("lista", JSON.stringify(this.desserts));
            localStorage.setItem("armazenado", JSON.stringify(this.desserts));
            localStorage.setItem("adicionar", JSON.stringify(this.desserts));
            localStorage.setItem("tentativas", JSON.stringify(this.desserts));
            break;
          }
        }

        // let armazenado = JSON.parse(localStorage.getItem("armazenado"));

        // senha: v0f3o3Gu62

        this.apagar.push(
          `https://rest-my-app.herokuapp.com/apagar?cpf=${this.editedItem.cpf}`
        );
        localStorage.setItem("apagar", JSON.stringify(this.apagar));

        this.tentar.push(
          `https://rest-my-app.herokuapp.com/delete?id=${this.editedItem.id}`
        );
        localStorage.setItem("tentar", JSON.stringify(this.tentar));
        localStorage.setItem("lista", JSON.stringify(this.tentar));
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (navigator.onLine) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
        } else {
          this.desserts.push(this.editedItem);
        }
        this.close();
        fetch(
          `https://rest-my-app.herokuapp.com/update?id=${this.editedItem.id}&nome=${this.editedItem.nome}&cpf=${this.editedItem.cpf}&endereco=${this.editedItem.endereco}&telefone=${this.editedItem.telefone}`,
          {
            method: "get",
          }
        );
        localStorage.setItem("armazenado", JSON.stringify(this.desserts));
      } else {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
        }

        let lista = JSON.parse(localStorage.getItem("armazenado"));
        for (let i = 0; i < lista.length; i++) {
          if (lista[i].id == this.editedItem.id) {
            this.desserts.splice(i, 1);
            this.c++;
            this.desserts.push({
              id: this.editedItem.id,
              nome: this.editedItem.nome,
              cpf: this.editedItem.cpf,
              endereco: this.editedItem.endereco,
              telefone: this.editedItem.telefone,
            });
            this.salvar.push(
              `https://rest-my-app.herokuapp.com/update?id=${this.editedItem.id}&nome=${this.editedItem.nome}&cpf=${this.editedItem.cpf}&endereco=${this.editedItem.endereco}&telefone=${this.editedItem.telefone}`
            );
            localStorage.setItem("salvar", JSON.stringify(this.salvar));
            localStorage.setItem("lista", JSON.stringify(this.desserts));
            localStorage.setItem("armazenado", JSON.stringify(this.desserts));
            
            this.atualizar.push(
              `https://rest-my-app.herokuapp.com/update?id=${this.editedItem.id}&nome=${this.editedItem.nome}&cpf=${this.editedItem.cpf}&endereco=${this.editedItem.endereco}&telefone=${this.editedItem.telefone}`
            );

            localStorage.setItem("atualizar", JSON.stringify(this.atualizar));
          }
        }
        this.close();
      }
    },
  },
};
</script>