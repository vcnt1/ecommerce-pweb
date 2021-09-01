module.exports = {


  friendlyName: 'View basket shopping',


  description: 'Display "basket shopping" page.',


  exits: {

    success: {
      statusCode: 200,
      description: 'teste.',
      viewTemplatePath: 'pages/entrance/basket',
      teste: ''
    },
  },


  fn: async function () {
    arrProdutos = []
    if(this.req.headers.cookie){
      this.req.headers.cookie.split(";").map(async cookie => {
        if(cookie.endsWith("]")){
          arrayCookie = JSON.parse(cookie);
          arrayCookie.map(produto => arrProdutos.push(produto.id))
        }
      })
      if(arrProdutos){
        let produtos =  await Produto.find({
          where: {id: arrProdutos}
        })
        let produtosSanitized = []
        produtos.map(produto => {
          let quantidadeCarrinho = produto.quantidade > (arrayCookie.filter(({id})=> produto.id === id)[0]).quantidade ? (arrayCookie.filter(({id})=> produto.id === id)[0]).quantidade : produto.quantidade;
          produto = {...produto , estoque: produto.quantidade, quantidade: quantidadeCarrinho}
          produtosSanitized.push(produto)
        })
        return {
          produtos: produtosSanitized
        }
      }
    }
    return {}
  }


};
