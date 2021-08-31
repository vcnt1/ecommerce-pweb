parasails.registerPage('basket', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    items: [{
        id: 0,
        nome: 'Maçã',
        valor: 2,
        imagem: "maca.jpg",
        qtd:2
      }, 
      {
        id: 1,
        nome: 'Pêra',
        valor: 3,
        imagem: "pera.jpg",
        qtd:1
      }, 
      {
        id: 2,
        nome: 'Banana',
        valor: 5,
        imagem: "banana.png",
        qtd:4
      }, 
      {
        id: 3,
        nome: 'Uva',
        valor: 8,
        imagem: "uva.jpg",
        qtd:5
      },
    ],
    total: 0,
    bought: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
      if(document.cookie === ''){
        document.cookie = '[]';
      }
      const arrProdutos = JSON.parse(document.cookie)
      arrProdutos.map(produto => {
        if(this.items.includes(produto)){
          this.items= [...this.items,{nome: produto}]
        }
      })
  },
  mounted: async function(){
    this.refreshValue();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    subQtd: function(id){
      this.items.map(item => {
        if(item.id === id) {
          item.qtd-=1;
        }
      });
      this.refreshValue();
    },

    addQtd: function(id){
      this.items.map(item => {
        if(item.id === id) {

          item.qtd+=1;
        }
      });
      this.refreshValue();
    },
    refreshValue: function(){
      totalValor=0
      this.items.map(item => totalValor+= item.qtd * item.valor)
      this.total =  totalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    },
    success: function() {
        this.bought=true;
    },
    fail: function() {
      this.goto("/login")
    }
    // Private methods not tied to a particular DOM event are prefixed with _

  }
});
