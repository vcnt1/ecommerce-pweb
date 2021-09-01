module.exports = {


    friendlyName: 'Relatorios page',


    description: 'Pagina de relatorios do admnin.',

    inputs: {

        dataInicio: {
            type: 'ref',
        },
        dataFim: {
            type: 'ref',
        },

    },

    exits: {

        success: {
            viewTemplatePath: 'pages/dashboard/relatorios',
            description: 'Display the welcome page for authenticated users.'
        },

        redirect: {
            viewTemplatePath: 'pages/dashboard/relatorios',
            description: 'Display the shop.'
        },

    },

    fn: async function ({dataInicio, dataFim}) {
        if (this.req.session.userId) {
            if (!this.req.session.isAdmin) {
                throw {redirect: '/'}
            } else {
                let today = new Date()
                let dataDefault = (today.getFullYear() + "-" + ((today.getMonth() + 1)) + "-" + (today.getDate()))
                let dtIni = dataInicio == undefined ? dataDefault : dataInicio,
                    dtFim = dataFim == undefined ? dataDefault : dataFim

                return {
                    totalComprasPorCliente: await Relatorio.getTotalComprasPorCliente(dtIni, dtFim),
                    produtosIndisponiveis: await Relatorio.getProdutosIndisponiveis(),
                    totalApuradoPorData: await Relatorio.getTotalApuradoPorData(dtIni, dtFim),
                };
            }
        }
    }
};
