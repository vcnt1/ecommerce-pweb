parasails.registerPage('basket', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    items: [],
    total: 0,
    bought: false,
    naoAdiciona: ''
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
      if(document.cookie === ''){
        document.cookie = '[]';
      }

      this.produtos.map(produto => {
        if(!this.items.includes(produto)){
          this.items.push(produto)
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
          item.quantidade-=1;
        }
      });
      this.atualizaCookie()
      this.refreshValue();
    },

    addQtd: function(id){
      this.items.map(item => {
        if(item.id === id && item.quantidade< item.estoque) {
          item.quantidade+=1;
        }
      });
      this.atualizaCookie()
      this.refreshValue();
    },
    refreshValue: function(){
      totalValor=0
      this.items.map(item => totalValor+= item.quantidade * item.preco)
      this.total =  totalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    },
    success: function() {
      this.atualizaCookie()
      this.bought=true;
    },
    fail: function() {
      this.atualizaCookie()
      this.goto("/login")
    },
    atualizaCookie: function(){
      document.cookie = "x; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      let arrayCompra = []
      this.items.map(item => {
        if(item.quantidade > 0){
          arrayCompra.push({id: item.id, quantidade: item.quantidade})
        }
      })
      document.cookie = JSON.stringify(arrayCompra)
    }
    // Private methods not tied to a particular DOM event are prefixed with _

  }
});
